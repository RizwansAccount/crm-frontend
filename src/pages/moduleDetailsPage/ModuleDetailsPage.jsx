import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useGetAllUsersQuery, useGetLeadQuery, useUpdateLeadMutation } from '../../redux/storeApis';
import { useForm } from 'react-hook-form';
import CustomInput from '../../components/customInput/CustomInput';
import CustomMultiSelect from '../../components/customMultiSelect/CustomMultiSelect';
import FilesView from '../../components/views/FilesView';
import NotesView from '../../components/views/NotesView';

const ModuleDetailsPage = () => {

  const { id } = useParams();
  const location = useLocation();

  const source = location?.state?.source;

  const { data: usersData } = useGetAllUsersQuery();
  const { data: leadData, isLoading: isLoadingLeadData } = useGetLeadQuery(id, { skip: !id });

  const [updateLead, { isLoading: isLoadingUpdateLead }] = useUpdateLeadMutation();

  const leadDetail = leadData?.data;
  const allRepresentatives = usersData?.data?.filter((user) => user?.role === "representative");

  const { handleSubmit, control, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: leadDetail?.name || "",
      contact: leadDetail?.contact || "",
      lead_source: leadDetail?.lead_source || "",
      status: leadDetail?.status || "",
      assigned_to: leadDetail?.assigned_to?.map(user => user?._id) || [],
    },
  });

  useEffect(() => {
    if (leadDetail) {
      setValue('name', leadDetail?.name);
      setValue('contact', leadDetail?.contact);
      setValue('lead_source', leadDetail?.lead_source);
      setValue('status', leadDetail?.status);
      setValue('assigned_to', leadDetail?.assigned_to?.map(user => user?._id));
    }
  }, [leadDetail]);

  const fnOnUpdate = async(data) => {
    try {
      const response = await updateLead({ id, ...data }).unwrap();
      if (response?.data?.response === "OK") {
        console.log("Updated Successfully");
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full min-h-screen flex flex-col pb-8 px-10'>

      <h1 className='text-xl font-semibold mt-6'>
        {`${source} Details`}
      </h1>

      <div className='flex flex-col gap-3 w-full border p-8 rounded-lg mt-6'>
        <div className='w-full flex items-center justify-between gap-4'>
          <CustomInput name={'name'} control={control} errors={errors} label={'Name'} isRequired />
          <CustomInput name={'contact'} control={control} errors={errors} label={'Contact'} isRequired />
        </div>

        <div className='w-full flex items-center justify-between gap-4'>
          <CustomInput name={'lead_source'} control={control} errors={errors} label={'Lead Source'} isRequired />
          <CustomInput name={'status'} control={control} errors={errors} label={'Status'} isRequired />
        </div>

        <CustomMultiSelect
          name="assigned_to"
          control={control}
          errors={errors}
          label="Assign To"
          options={allRepresentatives || []}
          isRequired
        />

        <button onClick={handleSubmit(fnOnUpdate)} className="w-full bg-blue-500 mt-4 text-white p-2 rounded hover:bg-blue-600">
          {isLoadingUpdateLead ? "Loading..." : "Update"}
        </button>

      </div>

      <NotesView source={source} source_id={id} />
      <FilesView source={source} source_id={id} />

    </div>
  )
}

export default ModuleDetailsPage