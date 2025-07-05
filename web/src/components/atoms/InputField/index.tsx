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
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>

      <input
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


// <div class="mb-6">
//     <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Large input</label>
//     <input type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
// </div>
// <div class="mb-6">
//     <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Default input</label>
//     <input type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
// </div>
// <div>
//     <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small input</label>
//     <input type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
// </div>