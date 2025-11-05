const os = require('os');
const { register, Gauge } = require('prom-client');
const cron = require('node-cron');
const { captureMessage } = require('../src/core/monitoring/sentry');

// System metrics
const systemMemoryUsage = new Gauge({
  name: 'system_memory_usage_bytes',
  help: 'System memory usage in bytes',
  labelNames: ['type'],
});

const systemCpuUsage = new Gauge({
  name: 'system_cpu_usage_percent',
  help: 'System CPU usage percentage',
});

const systemDiskUsage = new Gauge({
  name: 'system_disk_usage_bytes',
  help: 'System disk usage in bytes',
  labelNames: ['mount'],
});

const nodeProcessMetrics = new Gauge({
  name: 'node_process_metrics',
  help: 'Node.js process metrics',
  labelNames: ['metric'],
});

// Monitor system resources
const monitorSystem = async () => {
  try {
    // Memory metrics
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;

    systemMemoryUsage.labels('total').set(totalMemory);
    systemMemoryUsage.labels('used').set(usedMemory);
    systemMemoryUsage.labels('free').set(freeMemory);

    // CPU metrics
    const cpus = os.cpus();
    const cpuUsage = cpus.reduce((acc, cpu) => {
      const total = Object.values(cpu.times).reduce((a, b) => a + b);
      const idle = cpu.times.idle;
      return acc + ((total - idle) / total);
    }, 0) / cpus.length * 100;

    systemCpuUsage.set(cpuUsage);

    // Process metrics
    const processMemory = process.memoryUsage();
    nodeProcessMetrics.labels('heap_used').set(processMemory.heapUsed);
    nodeProcessMetrics.labels('heap_total').set(processMemory.heapTotal);
    nodeProcessMetrics.labels('rss').set(processMemory.rss);
    nodeProcessMetrics.labels('external').set(processMemory.external);

    // Alert on high resource usage
    if (cpuUsage > 80) {
      captureMessage(`High CPU usage detected: ${cpuUsage.toFixed(2)}%`, 'warning');
    }

    if ((usedMemory / totalMemory) > 0.9) {
      captureMessage(`High memory usage detected: ${((usedMemory / totalMemory) * 100).toFixed(2)}%`, 'warning');
    }

  } catch (error) {
    captureMessage(`Error monitoring system: ${error.message}`, 'error');
  }
};

// Schedule monitoring every minute
cron.schedule('* * * * *', monitorSystem);

// Export metrics for Prometheus
const getMetrics = async () => {
  return register.metrics();
};

// Export functions for external use
module.exports = {
  monitorSystem,
  getMetrics,
};

// If running directly, start monitoring
if (require.main === module) {
  monitorSystem();
} 