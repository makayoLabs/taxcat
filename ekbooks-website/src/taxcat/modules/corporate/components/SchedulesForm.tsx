import React, { useState } from 'react';
import { T2CorporateData } from '../T2Corporate';

interface SchedulesFormProps {
  schedules: T2CorporateData['schedules'];
  onChange: (schedules: T2CorporateData['schedules']) => void;
  errors: Record<string, string>;
}

interface Schedule {
  id: string;
  name: string;
  description: string;
  required: boolean;
}

const T2_SCHEDULES: Schedule[] = [
  {
    id: 'schedule1',
    name: 'Schedule 1',
    description: 'Net Income (Loss) for Income Tax Purposes',
    required: true,
  },
  {
    id: 'schedule2',
    name: 'Schedule 2',
    description: 'Charitable Donations and Gifts',
    required: false,
  },
  {
    id: 'schedule3',
    name: 'Schedule 3',
    description: 'Dividends Received, Taxable Dividends Paid, and Part IV Tax Calculation',
    required: false,
  },
  {
    id: 'schedule4',
    name: 'Schedule 4',
    description: 'Corporation Loss Continuity and Application',
    required: false,
  },
  {
    id: 'schedule5',
    name: 'Schedule 5',
    description: 'Tax Calculation Supplementary - Corporations',
    required: false,
  },
  {
    id: 'schedule6',
    name: 'Schedule 6',
    description: 'Summary of Dispositions of Capital Property',
    required: false,
  },
  {
    id: 'schedule7',
    name: 'Schedule 7',
    description: 'Aggregate Investment Income and Income Eligible for the Small Business Deduction',
    required: false,
  },
  {
    id: 'schedule8',
    name: 'Schedule 8',
    description: 'Capital Cost Allowance (CCA)',
    required: false,
  },
  {
    id: 'schedule9',
    name: 'Schedule 9',
    description: 'Related and Associated Corporations',
    required: false,
  },
  {
    id: 'schedule23',
    name: 'Schedule 23',
    description: 'Agreement Among Associated Canadian-Controlled Private Corporations',
    required: false,
  },
  {
    id: 'schedule31',
    name: 'Schedule 31',
    description: 'Investment Tax Credit - Corporations',
    required: false,
  },
  {
    id: 'schedule50',
    name: 'Schedule 50',
    description: 'Shareholder Information',
    required: true,
  },
  {
    id: 'schedule88',
    name: 'Schedule 88',
    description: 'Internet Business Activities',
    required: false,
  },
  {
    id: 'schedule100',
    name: 'Schedule 100',
    description: 'Balance Sheet Information',
    required: true,
  },
  {
    id: 'schedule125',
    name: 'Schedule 125',
    description: 'Income Statement Information',
    required: true,
  },
  {
    id: 'schedule141',
    name: 'Schedule 141',
    description: 'Notes Checklist',
    required: true,
  },
];

export const SchedulesForm: React.FC<SchedulesFormProps> = ({ schedules, onChange, errors }) => {
  const [activeSchedule, setActiveSchedule] = useState<string | null>(null);

  const handleScheduleChange = (scheduleId: string, data: any): void => {
    onChange({
      ...schedules,
      [scheduleId]: data,
    });
  };

  const getScheduleStatus = (scheduleId: string): 'not_started' | 'in_progress' | 'completed' => {
    if (!schedules[scheduleId]) {
      return 'not_started';
    }
    if (schedules[scheduleId].completed) {
      return 'completed';
    }
    return 'in_progress';
  };

  const renderScheduleStatus = (status: 'not_started' | 'in_progress' | 'completed'): void => {
    switch (___status) =>
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success text-white">
            Completed
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning text-white">
            In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Not Started
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      <div className="cat-card">
        <h3 className="text-xl font-semibold mb-4">Required Schedules</h3>
        <div className="space-y-4">
          {T2_SCHEDULES.filter((___schedule) => schedule.required).map((___schedule) => (
            <div
              key={schedule.id}
              className={`p-4 rounded-lg border ${
                activeSchedule === schedule.id ? 'border-primary-blue' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{schedule.name}</h4>
                  <p className="text-sm text-gray-600">{schedule.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  {renderScheduleStatus(getScheduleStatus(schedule.id))}
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSchedule(activeSchedule === schedule.id ? null : schedule.id)
                    }
                    className="cat-button"
                  >
                    {activeSchedule === schedule.id ? 'Close' : 'Open'}
                  </button>
                </div>
              </div>
              {activeSchedule === schedule.id && (
                <div className="mt-4 pt-4 border-t">
                  {/* Schedule-specific form would go here */}
                  <p className="text-gray-600">
                    Schedule form content will be implemented based on specific requirements
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="cat-card">
        <h3 className="text-xl font-semibold mb-4">Optional Schedules</h3>
        <div className="space-y-4">
          {T2_SCHEDULES.filter((___schedule) => !schedule.required).map((___schedule) => (
            <div
              key={schedule.id}
              className={`p-4 rounded-lg border ${
                activeSchedule === schedule.id ? 'border-primary-blue' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{schedule.name}</h4>
                  <p className="text-sm text-gray-600">{schedule.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  {renderScheduleStatus(getScheduleStatus(schedule.id))}
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSchedule(activeSchedule === schedule.id ? null : schedule.id)
                    }
                    className="cat-button"
                  >
                    {activeSchedule === schedule.id ? 'Close' : 'Open'}
                  </button>
                </div>
              </div>
              {activeSchedule === schedule.id && (
                <div className="mt-4 pt-4 border-t">
                  {/* Schedule-specific form would go here */}
                  <p className="text-gray-600">
                    Schedule form content will be implemented based on specific requirements
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {errors.schedules && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-error">{errors.schedules}</p>
        </div>
      )}
    </div>
  );
};
