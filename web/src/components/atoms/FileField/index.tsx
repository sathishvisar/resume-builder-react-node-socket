import React, { useId } from 'react';

export interface FileFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FileField: React.FC<FileFieldProps> = ({
  label,
  id,
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
        type="file"
        id={uid}
        className={`
          w-full text-gray-700
          file:mr-4 file:py-2 file:px-4
          file:rounded file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
          ${className}
        `}
        {...rest}
      />
    </div>
  );
};

export default FileField;
