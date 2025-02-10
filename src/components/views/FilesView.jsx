import React, { useState } from 'react';
import CustomTable from '../customTable/CustomTable';
import { FileIcon } from '../../assets/icons';
import { useCreateFileMutation, useDeleteFileMutation, useGetAllFilesQuery } from '../../redux/storeApis';
import CustomButton from '../customButton/CustomButton';
import CustomModal from '../customModal/CustomModal';
import { useForm } from 'react-hook-form';
import CustomInput from '../customInput/CustomInput';

const FilesView = ({ source, source_id }) => {

    const { data: filesData, isLoading: isLoadingFilesData } = useGetAllFilesQuery({ source, source_id }, { skip: (!source_id && !source) });
    const [createFile, { isLoading: isLoadingCreateFile }] = useCreateFileMutation();
    const [deleteFile, { isLoading: isLoadingDeleteFile }] = useDeleteFileMutation();

    const [createModal, setCreateModal] = useState(false);

    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            files: [],
            source,
            source_id
        }
    });

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

    const fnCreateFile = async (data) => {
        try {
            console.log(data?.files);
            const formData = new FormData();
            if (data?.files?.length > 0) {
                data?.files?.forEach((file) => {
                    formData.append('files', file);
                });

                formData.append('source', source);
                formData.append('source_id', source_id);

                const response = await createFile(formData).unwrap();
                if (response?.data?.response === "OK") {
                    console.log("Files Created Successfully");
                    setCreateModal(false);
                    reset();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fnOnClickRow = (params) => {
        const link = params?.row?.link;
        if (link) { window.open(link, "_blank"); };
    };

    const fnDeleteFile = async (id) => {
        try {
            const response = await deleteFile(id).unwrap();
            if (response?.data?.response === "OK") {
                console.log("File Deleted Successfully");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='w-full max-h-[65vh] p-8 rounded-lg border overflow-y-auto flex flex-col gap-3 mt-6'>
            <div className='flex justify-between items-center'>
                <h3 className='font-semibold text-xl'>Files</h3>
                <CustomButton onClick={() => setCreateModal(true)}>
                    <span>Upload</span>
                </CustomButton>
            </div>
            <CustomTable onRowClick={fnOnClickRow} onDelete={fnDeleteFile} rows={fileRows} columns={fileColumns} style={{ height: 350 }} />

            <CustomModal className={"w-[40vw]"} open={createModal} onClose={() => setCreateModal(false)}>

                <div className='w-full flex flex-col gap-6 items-end'>

                    <CustomInput
                        name={'files'}
                        type='file'
                        control={control}
                        label='Select File'
                        isRequired
                        errors={errors}
                        multiple
                    />

                    <CustomButton className={"w-fit"} onClick={handleSubmit(fnCreateFile)}>
                        <span>{isLoadingCreateFile ? "Loading..." : "Submit"}</span>
                    </CustomButton>
                </div>

            </CustomModal>
        </div>
    )
}

export default FilesView