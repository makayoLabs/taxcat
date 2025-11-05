'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, User, Save } from 'lucide-react';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  sin: string;
  dateOfBirth: string;
}

export default function PersonalInfoPage(): JSX.Element {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    sin: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    // Load existing data if available
    const loadData = async () => {
      try {
        const response = await fetch(`/api/tax-returns/${params.id}`);
        if (response.ok) {
          const taxReturn = await response.json();
          if (taxReturn.formData?.personalInfo) {
            setFormData(taxReturn.formData.personalInfo);
          }
        }
      } catch (error) {
        console.error('Error loading personal info:', error);
      }
    };

    if (params.id) {
      loadData();
    }
  }, [params.id]);

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/tax-returns/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: {
            personalInfo: formData,
          },
        }),
      });

      if (response.ok) {
        router.push(`/tax-return/${params.id}/income`);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save personal information');
      }
    } catch (error) {
      console.error('Error saving personal info:', error);
      alert('Failed to save personal information. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-primary-blue hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>

          <div className="flex items-center">
            <div className="h-12 w-12 bg-primary-blue rounded-lg flex items-center justify-center mr-4">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Personal Information</h1>
              <p className="text-gray-600 mt-2">
                Please provide your personal details for your tax return
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              />
            </div>

            {/* SIN */}
            <div>
              <label htmlFor="sin" className="block text-sm font-medium text-gray-700 mb-2">
                Social Insurance Number *
              </label>
              <input
                type="text"
                id="sin"
                value={formData.sin}
                onChange={(e) => handleInputChange('sin', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                placeholder="XXX-XXX-XXX"
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>

            {/* Street Address */}
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  required
                />
              </div>

              {/* Province */}
              <div>
                <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-2">
                  Province *
                </label>
                <select
                  id="province"
                  value={formData.province}
                  onChange={(e) => handleInputChange('province', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  required
                >
                  <option value="">Select Province</option>
                  <option value="AB">Alberta</option>
                  <option value="BC">British Columbia</option>
                  <option value="MB">Manitoba</option>
                  <option value="NB">New Brunswick</option>
                  <option value="NL">Newfoundland and Labrador</option>
                  <option value="NS">Nova Scotia</option>
                  <option value="ON">Ontario</option>
                  <option value="PE">Prince Edward Island</option>
                  <option value="QC">Quebec</option>
                  <option value="SK">Saskatchewan</option>
                  <option value="NT">Northwest Territories</option>
                  <option value="NU">Nunavut</option>
                  <option value="YT">Yukon</option>
                </select>
              </div>

              {/* Postal Code */}
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Postal Code *
                </label>
                <input
                  type="text"
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  placeholder="A1A 1A1"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200 mt-8">
            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center px-4 py-3 bg-primary-blue text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Save & Continue
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}