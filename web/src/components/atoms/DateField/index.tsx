import React, { useId } from 'react';

export interface DateFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const DateField: React.FC<DateFieldProps> = ({
  label,
  className = '',
  ...rest
}) => {
  const uid = useId();
  return (
    <div className="mb-4">
      <label
        htmlFor={uid}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>

      <input
        type="date"
        id={uid}
        className={`
          block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
          ${className}
        `}
        {...rest}
      />
    </div>
  );
};

export default DateField;
