import React, { useId } from 'react';

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  className = '',
  ...rest
}) => {

  const uid = useId();
  return (
    <div className="mb-4">
      <label
        htmlFor={uid}
        className="block text-sm font-small text-gray-700 mb-1"
      >
        {label}
      </label>

      <input
        id={uid}
        className={`
          w-full px-2 py-2 bg-gray-200 rounded-none shadow-none text-sm
          focus:outline-none
          ${className}
        `}
        {...rest}
      />
    </div>
  );
};

export default InputField;





// import React, { useId, forwardRef } from 'react';

// export interface InputFieldProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {
//   label: string;
// }

// const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
//   ({ label, className = '', ...rest }, ref) => {
//     const uid = useId();

//     return (
//       <div className="mb-4">
//         <label htmlFor={uid} className="block text-sm font-medium text-gray-700 mb-1">
//           {label}
//         </label>
//         <input
//           id={uid}
//           ref={ref}
//           className={`
//             w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
//             focus:outline-none focus:ring-2 focus:ring-blue-500
//             ${className}
//           `}
//           {...rest}
//         />
//       </div>
//     );
//   }
// );

// export default InputField;
