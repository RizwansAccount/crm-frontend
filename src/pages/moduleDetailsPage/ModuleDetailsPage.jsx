import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useGetAllFilesQuery, useGetAllNotesQuery, useGetAllUsersQuery, useGetLeadQuery } from '../../redux/storeApis';
import CustomTable from '../../components/customTable/CustomTable';
import { FileIcon } from '../../assets/icons';
import { useForm } from 'react-hook-form';
import CustomInput from '../../components/customInput/CustomInput';
import CustomMultiSelect from '../../components/customMultiSelect/CustomMultiSelect';

const ModuleDetailsPage = () => {

  const { id } = useParams();
  const location = useLocation();

  const source = location?.state?.source;

  const { data: usersData } = useGetAllUsersQuery();
  const { data: leadData, isLoading: isLoadingLeadData } = useGetLeadQuery(id, { skip: !id });
  const { data: filesData, isLoading: isLoadingFilesData } = useGetAllFilesQuery({ source, source_id: id }, { skip: (!id && !source) });
  const { data: notesData, isLoading: isLoadingNotesData } = useGetAllNotesQuery({ source, source_id: id }, { skip: (!id && !source) });

  const leadDetail = leadData?.data;

  const { handleSubmit, control, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: leadDetail?.name || "",
      contact: leadDetail?.contact || "",
      lead_source: leadDetail?.lead_source || "",
      status: leadDetail?.status || "",
      assigned_to: leadDetail?.assigned_to || [],
    },
  });

  useEffect(() => {
    if (leadDetail) {
      setValue('name', leadDetail?.name);
      setValue('contact', leadDetail?.contact);
      setValue('lead_source', leadDetail?.lead_source);
      setValue('status', leadDetail?.status);
      setValue('assigned_to', leadDetail?.assigned_to);
    }
  }, [leadDetail]);

  const fileColumns = [
    {
      field: "file_type",
      headerName: "File",
      flex: 0.5,
      minWidth: 60,
      renderCell: (params) => <FileIcon type={params.row.type} link={params.row.link} />
    },
    { field: 'original_name', headerName: 'Name', flex: 1, minWidth: 80 },
    { field: 'created_by', headerName: 'Created By', flex: 1, minWidth: 80 },
    { field: 'updated_by', headerName: 'Updated By', flex: 1, minWidth: 80 },
  ];

  const noteColumns = [
    { field: 'note', headerName: 'Note', flex: 1, minWidth: 80 },
    { field: 'created_by', headerName: 'Created By', flex: 1, minWidth: 80 },
    { field: 'updated_by', headerName: 'Updated By', flex: 1, minWidth: 80 },
  ];

  const fileRows = filesData?.data?.map((file) => ({
    id: file?._id,
    type: file?.type,
    link: file?.link,
    original_name: file?.original_name,
    created_by: file?.create_by?.name,
    updated_by: file?.last_update_by?.name
  }));

  const noteRows = notesData?.data?.map((note) => ({
    id: note?._id,
    note: note?.note,
    created_by: note?.create_by?.name,
    updated_by: note?.last_update_by?.name
  }));

  return (
    <div className='w-full min-h-screen flex flex-col pb-8 px-10'>

      <h1 className='text-2xl font-semibold mt-6'>
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
          options={usersData?.data || []}
          isRequired
        />

        <button onClick={handleSubmit((data) => console.log(data))} className="w-full bg-blue-500 mt-4 text-white p-2 rounded hover:bg-blue-600">
          Update
        </button>

      </div>

      <div className='w-full max-h-[65vh] p-8 rounded-lg border overflow-y-auto flex flex-col gap-3 mt-6'>
        <h3 className='font-semibold text-xl'>Files</h3>
        <CustomTable rows={fileRows} columns={fileColumns} style={{ height: 350 }} />
      </div>

      <div className='w-full max-h-[65vh] p-8 rounded-lg border overflow-y-auto flex flex-col gap-3 mt-6'>
        <h3 className='font-semibold text-xl'>Notes</h3>
        <CustomTable rows={noteRows} columns={noteColumns} style={{ height: 350 }} />
      </div>

    </div>
  )
}

export default ModuleDetailsPage