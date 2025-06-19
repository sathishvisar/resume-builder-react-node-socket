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
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>

      <input
        type="date"
        id={uid}
        className={`
          w-full px-4 py-2 bg-gray-200 rounded-none shadow-none text-sm
          focus:outline-none
          ${className}
        `}
        {...rest}
      />
    </div>
  );
};

export default DateField;
