// DynamicField.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData, FormFieldPath, FormFieldConfig } from './types';

interface DynamicFieldProps<T extends FormFieldPath> {
  field: FormFieldConfig<T>;
}

const DynamicField = <T extends FormFieldPath>({ field }: DynamicFieldProps<T>) => {
  const { 
    register, 
    formState: { errors },
    setValue,
    watch
  } = useFormContext<FormData>();

  const error = errors[field.name as keyof FormData];

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <input
            type={field.type}
            {...register(field.name, { required: field.required })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        );
      case 'date':
        return (
          <input
            type="date"
            {...register(field.name, { 
              required: field.required, 
              valueAsDate: true 
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        );
      case 'select':
        return (
          <select
            {...register(field.name, { required: field.required })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select...</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'file':
        return (
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setValue(field.name as any, file, { shouldValidate: true });
            }}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        );
      case 'rich-text':
        return (
          <textarea
            {...register(field.name)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-[150px]"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500">*</span>}
      </label>
      {renderField()}
      {error && (
        <span className="text-red-500 text-sm">
          {error.message?.toString() || 'This field is required'}
        </span>
      )}
    </div>
  );
};

export default DynamicField;