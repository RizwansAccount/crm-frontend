import React from 'react';
import { Controller } from 'react-hook-form';

const CustomSelect = ({
  name,
  control,
  errors,
  rules = {},
  label,
  options,
  isRequired = false
}) => {

  return (
    <div className="w-full">
      {label && <label className="block text-[14px] mb-1">{label}</label>}

      <div className="relative w-full">
        <Controller
          name={name}
          control={control}
          rules={{ required: (isRequired && "field is required!"), ...rules }}
          render={({ field }) => (
            <select
              {...field}
              className="w-full p-2 border rounded appearance-none bg-white"
            >
              <option hidden value="">Select {label}</option>
              {Object?.values(options)?.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          )}
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 fill-current text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>

      {errors?.[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  );
};

export default CustomSelect;