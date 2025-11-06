import React from 'react';
import { TaxPayer, ProvinceCode, MaritalStatus, ResidencyStatus } from '../../../core/tax/types';

interface PersonalInfoFormProps {
  taxpayer: TaxPayer;
  onChange: (___taxpayer: TaxPayer) => void;
  errors: Record<string, string>;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  taxpayer,
  onChange,
  errors,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');

    if (section === 'address') {
      onChange({
        ...taxpayer,
        address: {
          ...taxpayer.address,
          [field]: value,
        },
      });
    } else {
      onChange({
        ...taxpayer,
        [name]: value,
      });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange({
      ...taxpayer,
      dateOfBirth: new Date(e.target.value),
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <label htmlFor="sin" className="block text-sm font-medium text-gray-700">
              Social Insurance Number (SIN)
            </label>
            <input
              type="text"
              id="sin"
              name="sin"
              value={taxpayer.sin}
              onChange={handleChange}
              pattern="\\d{9}"
              maxLength={9}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.sin
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {errors.sin && <p className="mt-1 text-sm text-red-600">{errors.sin}</p>}
          </div>

          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={taxpayer.firstName}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.firstName
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={taxpayer.lastName}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.lastName
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={taxpayer.dateOfBirth.toISOString().split('T')[0]}
              onChange={handleDateChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-4">
          <div>
            <label htmlFor="address.street" className="block text-sm font-medium text-gray-700">
              Street Address
            </label>
            <input
              type="text"
              id="address.street"
              name="address.street"
              value={taxpayer.address.street}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.street
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {errors.street && <p className="mt-1 text-sm text-red-600">{errors.street}</p>}
          </div>

          <div>
            <label htmlFor="address.city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="address.city"
              name="address.city"
              value={taxpayer.address.city}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.city
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
          </div>

          <div>
            <label htmlFor="address.province" className="block text-sm font-medium text-gray-700">
              Province
            </label>
            <select
              id="address.province"
              name="address.province"
              value={taxpayer.address.province}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="AB">Alberta</option>
              <option value="BC">British Columbia</option>
              <option value="MB">Manitoba</option>
              <option value="NB">New Brunswick</option>
              <option value="NL">Newfoundland and Labrador</option>
              <option value="NS">Nova Scotia</option>
              <option value="NT">Northwest Territories</option>
              <option value="NU">Nunavut</option>
              <option value="ON">Ontario</option>
              <option value="PE">Prince Edward Island</option>
              <option value="QC">Quebec</option>
              <option value="SK">Saskatchewan</option>
              <option value="YT">Yukon</option>
            </select>
          </div>

          <div>
            <label htmlFor="address.postalCode" className="block text-sm font-medium text-gray-700">
              Postal Code
            </label>
            <input
              type="text"
              id="address.postalCode"
              name="address.postalCode"
              value={taxpayer.address.postalCode}
              onChange={handleChange}
              placeholder="A1A 1A1"
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.postalCode
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
          </div>
        </div>
      </div>

      {/* Status Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700">
            Marital Status
          </label>
          <select
            id="maritalStatus"
            name="maritalStatus"
            value={taxpayer.maritalStatus}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="SINGLE">Single</option>
            <option value="MARRIED">Married</option>
            <option value="COMMON_LAW">Common Law</option>
            <option value="SEPARATED">Separated</option>
            <option value="DIVORCED">Divorced</option>
            <option value="WIDOWED">Widowed</option>
          </select>
        </div>

        <div>
          <label htmlFor="residencyStatus" className="block text-sm font-medium text-gray-700">
            Residency Status
          </label>
          <select
            id="residencyStatus"
            name="residencyStatus"
            value={taxpayer.residencyStatus}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="RESIDENT">Resident</option>
            <option value="NON_RESIDENT">Non-Resident</option>
            <option value="DEEMED_RESIDENT">Deemed Resident</option>
            <option value="FACTUAL_RESIDENT">Factual Resident</option>
          </select>
        </div>
      </div>

      {/* Indigenous Status */}
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isIndigenous"
            name="isIndigenous"
            checked={taxpayer.isIndigenous}
            onChange={(e) => {
              onChange({
                ...taxpayer,
                isIndigenous: e.target.checked,
                indigenousNumber: e.target.checked ? taxpayer.indigenousNumber : undefined,
              });
            }}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="isIndigenous" className="ml-2 block text-sm text-gray-700">
            I am a Status Indian under the Indian Act
          </label>
        </div>

        {taxpayer.isIndigenous && (
          <div>
            <label htmlFor="indigenousNumber" className="block text-sm font-medium text-gray-700">
              Indian Status Card Number
            </label>
            <input
              type="text"
              id="indigenousNumber"
              name="indigenousNumber"
              value={taxpayer.indigenousNumber || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};
