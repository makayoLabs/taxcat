import React from 'react';
import { T2CorporateData } from '../T2Corporate';

interface CorporateInfoFormProps {
  corporation: T2CorporateData['corporation'];
  onChange: (corporation: T2CorporateData['corporation']) => void;
  errors: Record<string, string>;
}

export const CorporateInfoForm: React.FC<CorporateInfoFormProps> = ({
  corporation,
  onChange,
  errors,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    onChange({
      ...corporation,
      [name]: value,
    });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    onChange({
      ...corporation,
      address: {
        ...corporation.address,
        [name]: value,
      },
    });
  };

  const handleDirectorAdd = (): void => {
    onChange({
      ...corporation,
      directors: [
        ...corporation.directors,
        {
          name: '',
          address: '',
          startDate: new Date(),
        },
      ],
    });
  };

  const handleDirectorChange = (index: number, field: string, value: string | Date): void => {
    const updatedDirectors = [...corporation.directors];
    updatedDirectors[index] = {
      ...updatedDirectors[index],
      [field]: value,
    };
    onChange({
      ...corporation,
      directors: updatedDirectors,
    });
  };

  const handleDirectorRemove = (index: number): void => {
    const updatedDirectors = [...corporation.directors];
    updatedDirectors.splice(index, 1);
    onChange({
      ...corporation,
      directors: updatedDirectors,
    });
  };

  const handleShareholderAdd = (): void => {
    onChange({
      ...corporation,
      shareholders: [
        ...corporation.shareholders,
        {
          name: '',
          shares: [],
        },
      ],
    });
  };

  const handleShareholderChange = (index: number, field: string, value: string): void => {
    const updatedShareholders = [...corporation.shareholders];
    updatedShareholders[index] = {
      ...updatedShareholders[index],
      [field]: value,
    };
    onChange({
      ...corporation,
      shareholders: updatedShareholders,
    });
  };

  const handleSharesChange = (
    shareholderIndex: number,
    shareIndex: number,
    field: string,
    value: string | number
  ) => {
    const updatedShareholders = [...corporation.shareholders];
    const updatedShares = [...updatedShareholders[shareholderIndex].shares];

    updatedShares[shareIndex] = {
      ...updatedShares[shareIndex],
      [field]: field === 'class' ? value : Number(value),
    };

    updatedShareholders[shareholderIndex] = {
      ...updatedShareholders[shareholderIndex],
      shares: updatedShares,
    };

    onChange({
      ...corporation,
      shareholders: updatedShareholders,
    });
  };

  const handleShareholderRemove = (index: number): void => {
    const updatedShareholders = [...corporation.shareholders];
    updatedShareholders.splice(index, 1);
    onChange({
      ...corporation,
      shareholders: updatedShareholders,
    });
  };

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="cat-card">
        <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="businessNumber" className="block text-sm font-medium text-gray-700">
              Business Number
            </label>
            <input
              type="text"
              id="businessNumber"
              name="businessNumber"
              value={corporation.businessNumber}
              onChange={handleChange}
              className={`cat-input ${errors.businessNumber ? 'border-error' : ''}`}
            />
            {errors.businessNumber && (
              <p className="mt-1 text-sm text-error">{errors.businessNumber}</p>
            )}
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Corporation Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={corporation.name}
              onChange={handleChange}
              className={`cat-input ${errors.name ? 'border-error' : ''}`}
            />
            {errors.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Corporation Type
            </label>
            <select
              id="type"
              name="type"
              value={corporation.type}
              onChange={handleChange}
              className="cat-input"
            >
              <option value="CCPC">Canadian-Controlled Private Corporation</option>
              <option value="OTHER_PRIVATE">Other Private Corporation</option>
              <option value="PUBLIC">Public Corporation</option>
              <option value="OTHER">Other Corporation Type</option>
            </select>
          </div>

          <div>
            <label htmlFor="fiscalPeriod.start" className="block text-sm font-medium text-gray-700">
              Fiscal Year Start
            </label>
            <input
              type="date"
              id="fiscalPeriod.start"
              name="fiscalPeriod.start"
              value={corporation.fiscalPeriod.start.toISOString().split('T')[0]}
              onChange={(___e) => {
                onChange({
                  ...corporation,
                  fiscalPeriod: {
                    ...corporation.fiscalPeriod,
                    start: new Date(e.target.value),
                  },
                });
              }}
              className="cat-input"
            />
          </div>

          <div>
            <label htmlFor="fiscalPeriod.end" className="block text-sm font-medium text-gray-700">
              Fiscal Year End
            </label>
            <input
              type="date"
              id="fiscalPeriod.end"
              name="fiscalPeriod.end"
              value={corporation.fiscalPeriod.end.toISOString().split('T')[0]}
              onChange={(___e) => {
                onChange({
                  ...corporation,
                  fiscalPeriod: {
                    ...corporation.fiscalPeriod,
                    end: new Date(e.target.value),
                  },
                });
              }}
              className="cat-input"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="cat-card">
        <h3 className="text-xl font-semibold mb-4">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="street" className="block text-sm font-medium text-gray-700">
              Street Address
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={corporation.address.street}
              onChange={handleAddressChange}
              className={`cat-input ${errors.street ? 'border-error' : ''}`}
            />
            {errors.street && <p className="mt-1 text-sm text-error">{errors.street}</p>}
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={corporation.address.city}
              onChange={handleAddressChange}
              className={`cat-input ${errors.city ? 'border-error' : ''}`}
            />
            {errors.city && <p className="mt-1 text-sm text-error">{errors.city}</p>}
          </div>

          <div>
            <label htmlFor="province" className="block text-sm font-medium text-gray-700">
              Province
            </label>
            <select
              id="province"
              name="province"
              value={corporation.address.province}
              onChange={handleAddressChange}
              className={`cat-input ${errors.province ? 'border-error' : ''}`}
            >
              <option value="">Select Province</option>
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
            {errors.province && <p className="mt-1 text-sm text-error">{errors.province}</p>}
          </div>

          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={corporation.address.postalCode}
              onChange={handleAddressChange}
              placeholder="A1A 1A1"
              className={`cat-input ${errors.postalCode ? 'border-error' : ''}`}
            />
            {errors.postalCode && <p className="mt-1 text-sm text-error">{errors.postalCode}</p>}
          </div>
        </div>
      </div>

      {/* Directors */}
      <div className="cat-card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Directors</h3>
          <button type="button" onClick={handleDirectorAdd} className="cat-button">
            Add Director
          </button>
        </div>

        {errors.directors && <p className="mb-4 text-sm text-error">{errors.directors}</p>}

        <div className="space-y-4">
          {corporation.directors.map((director, ___index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={director.name}
                    onChange={(___e) => handleDirectorChange(index, 'name', e.target.value)}
                    className="cat-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">SIN (Optional)</label>
                  <input
                    type="text"
                    value={director.sin || ''}
                    onChange={(___e) => handleDirectorChange(index, 'sin', e.target.value)}
                    className="cat-input"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    value={director.address}
                    onChange={(___e) => handleDirectorChange(index, 'address', e.target.value)}
                    className="cat-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={director.startDate.toISOString().split('T')[0]}
                    onChange={(___e) =>
                      handleDirectorChange(index, 'startDate', new Date(e.target.value))
                    }
                    className="cat-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={director.endDate?.toISOString().split('T')[0] || ''}
                    onChange={(___e) =>
                      handleDirectorChange(index, 'endDate', new Date(e.target.value))
                    }
                    className="cat-input"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleDirectorRemove(index)}
                  className="text-error hover:text-error-dark"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shareholders */}
      <div className="cat-card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Shareholders</h3>
          <button type="button" onClick={handleShareholderAdd} className="cat-button">
            Add Shareholder
          </button>
        </div>

        {errors.shareholders && <p className="mb-4 text-sm text-error">{errors.shareholders}</p>}

        <div className="space-y-4">
          {corporation.shareholders.map((shareholder, ___index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={shareholder.name}
                    onChange={(___e) => handleShareholderChange(index, 'name', e.target.value)}
                    className="cat-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">SIN (Optional)</label>
                  <input
                    type="text"
                    value={shareholder.sin || ''}
                    onChange={(___e) => handleShareholderChange(index, 'sin', e.target.value)}
                    className="cat-input"
                  />
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2">Share Classes</h4>
                {shareholder.shares.map((share, ___shareIndex) => (
                  <div key={shareIndex} className="grid grid-cols-3 gap-4 mb-2">
                    <div>
                      <input
                        type="text"
                        placeholder="Class"
                        value={share.class}
                        onChange={(___e) =>
                          handleSharesChange(index, shareIndex, 'class', e.target.value)
                        }
                        className="cat-input"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="Number"
                        value={share.number}
                        onChange={(___e) =>
                          handleSharesChange(index, shareIndex, 'number', e.target.value)
                        }
                        className="cat-input"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="Percentage"
                        value={share.percentage}
                        onChange={(___e) =>
                          handleSharesChange(index, shareIndex, 'percentage', e.target.value)
                        }
                        className="cat-input"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const updatedShareholders = [...corporation.shareholders];
                    updatedShareholders[index].shares.push({
                      class: '',
                      number: 0,
                      percentage: 0,
                    });
                    onChange({
                      ...corporation,
                      shareholders: updatedShareholders,
                    });
                  }}
                  className="mt-2 text-sm text-primary-blue hover:text-primary-navy"
                >
                  Add Share Class
                </button>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleShareholderRemove(index)}
                  className="text-error hover:text-error-dark"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
