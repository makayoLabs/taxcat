'use client';

import { motion } from 'framer-motion';
import { Shield, Clock, Bot, DollarSign, FileText, Headphones } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Professional Security',
    description:
      'Bank-level encryption and CRA compliance, because your data deserves the best protection.',
    color: 'bg-blue-50 text-taxcat-blue',
  },
  {
    icon: Bot,
    title: 'Smart AI Assistant',
    description: 'Our AI helps find every eligible deduction without the corporate overhead costs.',
    color: 'bg-blue-50 text-taxcat-blue',
  },
  {
    icon: Clock,
    title: 'Quick & Efficient',
    description: 'File in minutes, not hours. Modern technology with professional expertise.',
    color: 'bg-blue-50 text-taxcat-blue',
  },
  {
    icon: DollarSign,
    title: 'Maximum Refund',
    description: 'Our smart system ensures you get every dollar you deserve, guaranteed.',
    color: 'bg-green-50 text-taxcat-success',
  },
  {
    icon: FileText,
    title: 'Smart Document Scan',
    description: 'Just snap a photo. Our AI handles the rest, with expert verification.',
    color: 'bg-blue-50 text-taxcat-blue',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description:
      'Real tax experts available 24/7. Professional help without the corporate wait times.',
    color: 'bg-blue-50 text-taxcat-blue',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Professional Tax Filing,{' '}
            <span className="text-taxcat-blue">Without the Corporate Hassle</span>
          </h2>
          <p className="text-xl text-taxcat-gray">
            Modern technology and expert support that puts your needs first
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={___index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ___index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg ${feature.color} transition-colors duration-300`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-taxcat-gray group-hover:text-gray-900 transition-colors duration-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <button className="bg-taxcat-blue text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2">
            Start Filing Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
