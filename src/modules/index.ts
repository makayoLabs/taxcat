// Personal Tax Modules
export * from './personal/T1General';
export * from './personal/TP1Quebec';
export * from './personal/components';

// Corporate Tax Modules
export * from './corporate/T2Corporate';
export * from './corporate/components';

// Trust Tax Modules
export * from './trust/T3Trust';
export * from './trust/T3010Charity';
export * from './trust/components';

// Partnership Modules
export * from './partnership/T5013Partnership';
export * from './partnership/components';

// Income Slips Modules
export * from './slips/T4Employment';
export * from './slips/T4AOther';
export * from './slips/T5Investment';
export * from './slips/T5018Contractor';
export * from './slips/NR4NonResident';
export * from './slips/T2202Education';
export * from './slips/RLQuebec';

// Tools and Integrations
export * from './tools/CatFolder'; // Replaces TaxFolder
export * from './tools/DocsCat'; // Replaces DoxCycle
export * from './tools/CatMining'; // Data Mining
export * from './tools/ClientManager';
export * from './tools/TemplateEditor';
export * from './tools/SlipSync';
export * from './tools/EFile';
export * from './tools/AutoFill';
export * from './tools/XeroIntegration';

// Common Components
export * from './common/forms';
export * from './common/validation';
export * from './common/calculations';
export * from './common/pdf';
export * from './common/efile';
