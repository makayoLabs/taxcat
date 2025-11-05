export type UserRole = 'ADMIN' | 'ACCOUNTANT' | 'CLIENT';
export type TaxModule = 'T1_PERSONAL' | 'T2_CORPORATE' | 'T3_TRUST' | 'T5013_PARTNERSHIP';
export type TaxTool = 'EFILE' | 'NETFILE' | 'ANALYTICS' | 'DOCUMENT_MANAGEMENT';
export type TaxProduct = 'BASIC' | 'PROFESSIONAL' | 'COMPLETE_SUITE';
export type Province =
  | 'AB'
  | 'BC'
  | 'MB'
  | 'NB'
  | 'NL'
  | 'NS'
  | 'NT'
  | 'NU'
  | 'ON'
  | 'PE'
  | 'QC'
  | 'SK'
  | 'YT';
export type Theme = 'LIGHT' | 'DARK' | 'SYSTEM';
export type Language = 'EN' | 'FR';

export interface UserNotificationSettings {
  email: boolean;
  desktop: boolean;
  deadlineReminders: boolean;
  clientUpdates: boolean;
  systemUpdates: boolean;
}

export interface UserSettings {
  defaultProvince: Province;
  defaultYear: number;
  theme: Theme;
  language: Language;
  notifications: UserNotificationSettings;
}

export interface TaxCatUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  modules: TaxModule[];
  tools: TaxTool[];
  product: TaxProduct;
  settings: UserSettings;
}
