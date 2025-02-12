import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

const CustomTagInput = ({ control, name, label, errors }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e, value, onChange) => {
    const inputTrimmedValue = inputValue.trim();

    if (e.key === 'Enter' && inputTrimmedValue) {
      e.preventDefault();

      if (!value.includes(inputTrimmedValue)) {
        const newTags = [...value, inputTrimmedValue];
        onChange(newTags);
      }
      setInputValue('');

    } else
      if (e.key === 'Backspace' && !inputValue && value.length > 0) {
        const newTags = value?.slice(0, -1);
        onChange(newTags);
      }
  };

  const removeTag = (tagToRemove, value, onChange) => {
    const newTags = value?.filter(tag => tag !== tagToRemove);
    onChange(newTags);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-col gap-1 w-full">
          {label && (
            <label className="text-sm font-medium text-gray-700">
              {label} {errors?.[name] && <span className="text-red-500">*</span>}
            </label>
          )}
          <div className="min-h-[42px] p-2 border rounded-md flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            {value?.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md flex items-center gap-1 text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag, value, onChange)}
                  className="text-blue-600 hover:text-blue-800 font-bold ml-1"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, value, onChange)}
              className="flex-1 outline-none min-w-[120px]"
              placeholder="Type and press Enter to add tags"
            />
          </div>
          {errors?.[name] && (
            <span className="text-sm text-red-500">{errors[name].message}</span>
          )}
        </div>
      )}
    />
  );
};

export default CustomTagInput;
// import React, { useState } from 'react';

// const CustomTagInput = ({ value = [], onChange, label, name, error }) => {
//   const [inputValue, setInputValue] = useState('');

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && inputValue.trim()) {
//       e.preventDefault();
//       if (!value.includes(inputValue.trim())) {
//         const newTags = [...value, inputValue.trim()];
//         onChange(newTags);
//       }
//       setInputValue('');
//     } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
//       const newTags = value.slice(0, -1);
//       onChange(newTags);
//     }
//   };

//   const removeTag = (tagToRemove) => {
//     const newTags = value.filter(tag => tag !== tagToRemove);
//     onChange(newTags);
//   };

//   return (
//     <div className="flex flex-col gap-1 w-full">
//       {label && (
//         <label className="text-sm font-medium text-gray-700">
//           {label} {error && <span className="text-red-500">*</span>}
//         </label>
//       )}
//       <div className="min-h-[42px] p-2 border rounded-md flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
//         {value.map((tag, index) => (
//           <span
//             key={index}
//             className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md flex items-center gap-1 text-sm"
//           >
//             {tag}
//             <button
//               type="button"
//               onClick={() => removeTag(tag)}
//               className="text-blue-600 hover:text-blue-800 font-bold"
//             >
//               ×
//             </button>
//           </span>
//         ))}
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={handleKeyDown}
//           className="flex-1 outline-none min-w-[120px]"
//           placeholder="Type and press Enter to add tags"
//         />
//       </div>
//       {error && <span className="text-sm text-red-500">{error.message}</span>}
//     </div>
//   );
// };

// export default CustomTagInput;