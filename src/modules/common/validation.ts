import { TaxDocument } from '../types';

export const validateSIN = (sin: string): boolean => {
  if (!sin) {
    return false;
  }
  if (!/^\d{9}$/.test(sin)) {
    return false;
  }

  // Luhn algorithm for SIN validation
  const digits = sin.split('').map(Number);
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

export const validatePostalCode = (postalCode: string): boolean => {
  return /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(postalCode);
};

export const validateBusinessNumber = (bn: string): boolean => {
  return /^\d{9}[A-Z]{2}\d{4}$/.test(bn);
};

export const validateTaxYear = (year: number): boolean => {
  const currentYear = new Date().getFullYear();
  return year >= 1970 && year <= currentYear + 1;
};

export const validateDocument = (doc: TaxDocument): string[] => {
  const errors: string[] = [];

  if (!doc.id) {
    errors.push('Document ID is required');
  }
  if (!doc.type) {
    errors.push('Document type is required');
  }
  if (!validateTaxYear(doc.year)) {
    errors.push('Invalid tax year');
  }
  if (
    !['DRAFT', 'PENDING_REVIEW', 'REVIEWED', 'SIGNED', 'FILED', 'ASSESSED', 'ARCHIVED'].includes(
      doc.status
    )
  ) {
    errors.push('Invalid document status');
  }

  return errors;
};

export const validateCurrency = (amount: string): boolean => {
  return /^\d+(\.\d{2})?$/.test(amount);
};

export const validateDate = (date: string): boolean => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
};
