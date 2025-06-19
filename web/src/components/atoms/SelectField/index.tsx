import React, { useId } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Visual label shown above the select */
  label: string;
  /** Array of `{ value, label }` to render */
  options: SelectOption[];
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  id,
  options,
  className = '',
  children, // still allow custom <option> children
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

      <select
        id={uid}
        className={`
          w-full px-4 py-2  bg-gray-200 rounded-none shadow-none text-sm
          focus:outline-none
          ${className}
        `}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
        {children}
      </select>
    </div>
  );
};

export default SelectField;