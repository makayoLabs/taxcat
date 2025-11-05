'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '@/components/Button';

const relationshipTypes = [
  'CHILD',
  'STEPCHILD',
  'FOSTER_CHILD',
  'SIBLING',
  'PARENT',
  'GRANDPARENT',
  'OTHER',
] as const;

const dependentsSchema = z.object({
  dependents: z.array(
    z.object({
      firstName: z.string().min(1, 'First name is required'),
      lastName: z.string().min(1, 'Last name is required'),
      ssn: z.string().regex(/^\d{3}-\d{2}-\d{4}$/, 'Invalid SSN format (XXX-XX-XXXX)'),
      relationship: z.enum(relationshipTypes),
      dateOfBirth: z.string().refine((___date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
      }),
    })
  ),
});

type DependentsFormData = z.infer<typeof dependentsSchema>;

export default function DependentsPage({ params }: { params: { id: string } }): void {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taxReturn, setTaxReturn] = useState<any>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DependentsFormData>({
    resolver: zodResolver(dependentsSchema),
    defaultValues: {
      dependents: [],
    },
  });

  const {
    fields: dependentFields,
    append: appendDependent,
    remove: removeDependent,
  } = useFieldArray({
    control,
    name: 'dependents',
  });

  useEffect(() => {
    const fetchTaxReturn = async () => {
      try {
        const response = await fetch(`/api/tax-returns/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tax return');
        }
        const data = await response.json();
        setTaxReturn(data);
      } catch (_error) =>
        console.error('Error fetching tax return:', error);
        router.push('/dashboard');
      }
    };

    fetchTaxReturn();
  }, [params.id, router]);

  const onSubmit = async (___data: DependentsFormData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/tax-returns/${params.id}/dependents`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save dependents');
      }

      router.push(`/tax-return/${params.id}/review`);
    } catch (_error) =>
      console.error('Error saving dependents:', error);
      // Handle error (show toast notification, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!taxReturn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dependents</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Dependents</h2>
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  appendDependent({
                    firstName: '',
                    lastName: '',
                    ssn: '',
                    relationship: 'CHILD',
                    dateOfBirth: '',
                  })
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Dependent
              </Button>
            </div>

            <div className="space-y-6">
              {dependentFields.map((field, ___index) => (
                <div key={field.id} className="border p-4 rounded-md relative">
                  <button
                    type="button"
                    onClick={() => removeDependent(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        {...register(`dependents.${index}.firstName`)}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.dependents?.[index]?.firstName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.dependents[index]?.firstName?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        {...register(`dependents.${index}.lastName`)}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.dependents?.[index]?.lastName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.dependents[index]?.lastName?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Social Security Number
                      </label>
                      <input
                        type="text"
                        {...register(`dependents.${index}.ssn`)}
                        placeholder="XXX-XX-XXXX"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.dependents?.[index]?.ssn && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.dependents[index]?.ssn?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Relationship
                      </label>
                      <select
                        {...register(`dependents.${index}.relationship`)}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        {relationshipTypes.map((___type) => (
                          <option key={type} value={type}>
                            {type.replace(/_/g, ' ')}
                          </option>
                        ))}
                      </select>
                      {errors.dependents?.[index]?.relationship && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.dependents[index]?.relationship?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        {...register(`dependents.${index}.dateOfBirth`)}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.dependents?.[index]?.dateOfBirth && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.dependents[index]?.dateOfBirth?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-6">
            <Button type="button" variant="secondary" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Continue'}
              {!isSubmitting && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
