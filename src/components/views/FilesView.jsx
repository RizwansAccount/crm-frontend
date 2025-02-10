import React from 'react';
import CustomTable from '../customTable/CustomTable';
import { FileIcon } from '../../assets/icons';
import { useGetAllFilesQuery } from '../../redux/storeApis';

const FilesView = ({source, source_id}) => {

    const { data: filesData, isLoading: isLoadingFilesData } = useGetAllFilesQuery({ source, source_id }, { skip: (!source_id && !source) });

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
        <div className='w-full max-h-[65vh] p-8 rounded-lg border overflow-y-auto flex flex-col gap-3 mt-6'>
            <h3 className='font-semibold text-xl'>Files</h3>
            <CustomTable rows={fileRows} columns={fileColumns} style={{ height: 350 }} />
        </div>
    )
}

export default FilesView