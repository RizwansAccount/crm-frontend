import { Controller } from 'react-hook-form';
import { FormControl, Select, MenuItem, Checkbox, ListItemText, InputLabel } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const CustomMultiSelect = ({
  name,
  control,
  errors,
  rules = {},
  label,
  options = [],
  isRequired = false,
  onRemoveAssignment
}) => {
  return (
    <div className="w-full">
      {label && <label className="block text-[14px] mb-1">{label}</label>}
      
      <Controller
        name={name}
        control={control}
        rules={{ required: (isRequired && "field is required!"), ...rules }}
        render={({ field: { value, onChange, ...field } }) => {
          const selectedIds = Array.isArray(value) ? value?.map(item => typeof item === 'object' ? item?._id : item) : [];
          return (
            <div className="space-y-2">

              <div className="flex flex-wrap gap-2 mb-2">
                {selectedIds?.map((id) => {
                  const user = options?.find(user => user?._id === id);
                  if (!user) return null;
                  
                  return (
                    <div  key={id} className="flex items-center gap-1 bg-gray-100 pr-3 pl-4 py-1 rounded-full">
                      <span className='text-[14px]'>{user?.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          onRemoveAssignment?.({ user_id: id });
                          onChange(selectedIds?.filter(selectedId => selectedId !== id));
                        }}
                        className="hover:bg-gray-200 rounded-full p-1"
                      >
                        <ClearIcon fontSize='small'/>
                      </button>
                    </div>
                  );
                })}
              </div>

              <FormControl className="w-full">
                <Select
                  {...field}
                  multiple
                  value={selectedIds}
                  onChange={(e) => { onChange(e.target.value) }}
                  renderValue={(selected) => {
                    return selected?.map(id => options?.find(user => user?._id === id)?.name)?.filter(Boolean)?.join(', ');
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
            </div>
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