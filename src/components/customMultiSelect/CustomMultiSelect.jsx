import { Controller } from 'react-hook-form';
import { FormControl, Select, MenuItem, Checkbox, ListItemText, InputLabel } from '@mui/material';

const CustomMultiSelect = ({
  name,
  control,
  errors,
  rules = {},
  label,
  options = [],
  isRequired = false
}) => {
  return (
    <div className="w-full">

      {label && <label className="block font-semibold mb-1">{label}</label>}

      <Controller
        name={name}
        control={control}
        rules={{ required: (isRequired && "field is required!"), ...rules }}
        render={({ field: { value, onChange, ...field } }) => {
          const selectedIds = Array.isArray(value) ? value?.map(item => typeof item === 'object' ? item?._id : item): [];
          return (
            <FormControl className="w-full">
              <Select
                {...field}
                multiple
                value={selectedIds}
                onChange={(e) => { onChange(e.target.value) }}
                renderValue={(selected) => {
                  return selected?.map(id => options?.find(user => user._id === id)?.name)?.filter(Boolean)?.join(', ');
                }}
                className="w-full border rounded"
              >
                {options?.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    <Checkbox 
                      checked={selectedIds?.includes(user?._id)}
                    />
                    <ListItemText primary={user?.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }}
      />

      {errors?.[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
      
    </div>
  );
};

export default CustomMultiSelect;