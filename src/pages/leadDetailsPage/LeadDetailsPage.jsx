import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetAllUsersQuery, useGetLeadQuery, useUpdateLeadMutation } from '../../redux/storeApis';
import { useForm } from 'react-hook-form';
import CustomInput from '../../components/customInput/CustomInput';
import CustomMultiSelect from '../../components/customMultiSelect/CustomMultiSelect';
import FilesView from '../../components/views/FilesView';
import NotesView from '../../components/views/NotesView';
import { LEAD_STATUS, ROLE, SOURCE_TYPE } from '../../constants/Index';
import CustomSelect from '../../components/customSelect/CustomSelect';
import CustomButton from '../../components/customButton/CustomButton';
import { useUserDataManager } from '../../hooks/useUserDataManager';

const LeadDetailsPage = () => {

  const { id } = useParams();

  const source = SOURCE_TYPE.lead;

  const { data: usersData } = useGetAllUsersQuery();
  const { data: leadData, isLoading: isLoadingLeadData } = useGetLeadQuery(id, { skip: !id });

  const { currentUser } = useUserDataManager();

  const [updateLead, { isLoading: isLoadingUpdateLead }] = useUpdateLeadMutation();

  const leadDetail = leadData?.data;
  const allRepresentatives = usersData?.data?.filter((user) => user?.role === ROLE.representative);

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

  const fnOnUpdate = async (data) => {
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
          <CustomSelect name={"status"} control={control} errors={errors} label={"Status"} options={LEAD_STATUS} isRequired />
        </div>

        { currentUser?.role !== ROLE.representative && <CustomMultiSelect
          name="assigned_to"
          control={control}
          errors={errors}
          label="Assign To"
          options={allRepresentatives || []}
        />}

        <CustomButton style={{ marginTop: 12 }} onClick={handleSubmit(fnOnUpdate)} className="w-full">
          {isLoadingUpdateLead ? "Loading..." : "Update"}
        </CustomButton>

      </div>

      <NotesView source={source} source_id={id} />
      <FilesView source={source} source_id={id} />

    </div>
  )
}

export default LeadDetailsPage