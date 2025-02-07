import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useGetAllFilesQuery, useGetAllNotesQuery, useGetLeadQuery } from '../../redux/storeApis';
import CustomTable from '../../components/customTable/CustomTable';
import { FileIcon } from '../../assets/icons';

const ModuleDetailsPage = () => {

  const { id } = useParams();
  const location = useLocation();

  const source = location?.state?.source;

  const { data: leadData, isLoading: isLoadingLeadData } = useGetLeadQuery(id, { skip: !id });
  const { data: filesData, isLoading: isLoadingFilesData } = useGetAllFilesQuery({ source, source_id: id }, { skip: (!id && !source) });
  const { data: notesData, isLoading: isLoadingNotesData } = useGetAllNotesQuery({ source, source_id: id }, { skip: (!id && !source) });

  const leadDetail = leadData?.data;

  const leadInfoData = [
    { label: 'Name', value: leadDetail?.name },
    { label: 'Contact', value: leadDetail?.contact },
    { label: 'Source', value: leadDetail?.lead_source },
    { label: 'Status', value: leadDetail?.status },
    { label: 'Created by', value: leadDetail?.created_by?.name },
    { label: 'Updated by', value: leadDetail?.last_updated_by?.name }
  ];

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

  const fileRows = filesData?.data?.map((file) => ({
    id: file?._id,
    type: file?.type,
    link: file?.link,
    original_name: file?.original_name,
    created_by: file?.create_by?.name,
    updated_by: file?.last_update_by?.name
  }));

  return (
    <div className='h-full w-full flex items-center justify-around px-10'>

      <div className='flex flex-col gap-3 w-full'>
        <h3 className='font-bold text-[18px]'>Lead Details</h3>
        
      </div>

      <div className='w-full h-[65vh] overflow-y-auto px-4 flex flex-col gap-1'>
        <h3>Files</h3>
        <CustomTable rows={fileRows} columns={fileColumns} style={{height  : 350}} />
      </div>

    </div>
  )
}

export default ModuleDetailsPage