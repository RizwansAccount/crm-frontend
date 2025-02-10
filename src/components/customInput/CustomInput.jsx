import { useState } from "react";
import { Controller } from "react-hook-form";
import { Visibility, VisibilityOff } from '@mui/icons-material';

const CustomInput = ({
  name,
  type = "text",
  control,
  errors,
  rules = {},
  label,
  placeholder = "",
  isRequired = false,
  multiple = false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="w-full">
      {label && <label className="block text-[14px] mb-1">{label}</label>}
      <div className="relative w-full">
        <Controller
          name={name}
          control={control}
          rules={{ required: (isRequired && "field is required!"), ...rules }}
          render={({ field: { onChange, value, ...field } }) => (
            <input
              {...field}
              type={inputType}
              placeholder={placeholder}
              multiple={type === 'file' ? multiple : undefined}
              className="w-full p-2 border rounded pr-10"
              onChange={(e) => {
                if (type === 'file') {
                  const files = Array.from(e.target.files);
                  onChange(files);
                } else {
                  onChange(e);
                }
              }}
              value={type === 'file' ? undefined : value}
            />
          )}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </button>
        )}
      </div>
      {errors?.[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  );
};

export default CustomInput;
// import { useState } from "react";
// import { Controller } from "react-hook-form";
// import { Visibility, VisibilityOff } from '@mui/icons-material';

// const CustomInput = ({
//   name,
//   type = "text",
//   control,
//   errors,
//   rules = {},
//   label,
//   placeholder = "",
//   isRequired = false
// }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const inputType = type === "password" && showPassword ? "text" : type;

//   return (
//     <div className="w-full">
//       {label && <label className="block text-[14px] mb-1">{label}</label>}

//       <div className="relative w-full">
//         <Controller
//           name={name}
//           control={control}
//           rules={{ required: (isRequired && "field is required!"), ...rules }}
//           render={({ field }) => (
//             <input
//               {...field}
//               type={inputType}
//               placeholder={placeholder}
//               className="w-full p-2 border rounded pr-10"
//             />
//           )}
//         />

//         {type === "password" && (
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-2 top-1/2 transform -translate-y-1/2"
//           >
//             {showPassword ? <VisibilityOff /> : <Visibility />}
//           </button>
//         )}
//       </div>

//       {errors?.[name] && (
//         <p className="text-red-500 text-sm">{errors[name].message}</p>
//       )}
//     </div>
//   );
// };

// export default CustomInput;