import React, { useState } from 'react'
import CustomTable from '../customTable/CustomTable'
import { useCreateNoteMutation, useDeleteNoteMutation, useGetAllNotesQuery, useUpdateNoteMutation } from '../../redux/storeApis';
import CustomButton from '../customButton/CustomButton';
import CustomModal from '../customModal/CustomModal';
import CustomInput from '../customInput/CustomInput';
import { useForm } from 'react-hook-form';
import { DeleteForever as DeleteIcon } from '@mui/icons-material';
import { useUserDataManager } from '../../hooks/useUserDataManager';
import { ROLE } from '../../constants/Index';
import { useSnackbarManager } from '../../hooks/useSnackbarManager';

const NotesView = ({ source, source_id }) => {

    const { currentUser } = useUserDataManager();
    const { fnShowSuccessSnackbar, fnShowErrorSnackbar } = useSnackbarManager();

    const { data: notesData, isLoading: isLoadingNotesData } = useGetAllNotesQuery({ source, source_id }, { skip: (!source_id && !source) });
    const [createNote, { isLoading: isLoadingCreateNote }] = useCreateNoteMutation();
    const [deleteNote, { isLoading: isLoadingDeleteNote }] = useDeleteNoteMutation();
    const [updateNote, { isLoading: isLoadingUpdateNote }] = useUpdateNoteMutation();

    const { handleSubmit, control, setValue, reset, formState: { errors } } = useForm({
        defaultValues: {
            note: "",
            source,
            source_id
        }
    });

    const [createModal, setCreateModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    const noteColumns = [
        { field: 'note', headerName: 'Note', flex: 1, minWidth: 80 },
        { field: 'created_by', headerName: 'Created By', flex: 1, minWidth: 80, renderCell: (params) => <span>{params?.row?.created_by?.name}</span> },
        { field: 'updated_by', headerName: 'Updated By', flex: 1, minWidth: 80 },
        {
            field: 'actions', headerName: 'Actions', flex: 1, minWidth: 80,
            renderCell: (params) => {
                const isShowDeleteIcon = params?.row?.created_by?._id === currentUser?.user_id ||
                    currentUser?.role === ROLE.admin ||
                    currentUser?.role === ROLE.manager;
                return (
                    isShowDeleteIcon && <div onClick={(e) => { e.stopPropagation(); fnDeleteNote(params?.row?.id) }}>
                        <DeleteIcon />
                    </div>
                )
            }
        }
    ];

    const noteRows = notesData?.data?.map((note) => ({
        id: note?._id,
        note: note?.note,
        created_by: note?.create_by,
        updated_by: note?.last_update_by?.name
    }));

    const fnCreateNote = async (data) => {
        try {
            const response = await createNote({ note: data?.note, source, source_id }).unwrap();
            if (response?.response === "OK") {
                setCreateModal(false);
                reset();
                fnShowSuccessSnackbar("Note created successfully");
            }
        } catch (error) {
            fnShowErrorSnackbar(error?.data?.message);
        }
    };

    const fnDeleteNote = async (id) => {
        try {
            const response = await deleteNote(id).unwrap();
            if (response?.response === "OK") {
                fnShowSuccessSnackbar("Note deleted successfully");
            }
        } catch (error) {
            fnShowErrorSnackbar(error?.data?.message);
        }
    };

    const fnOnUpdateNote = async (data) => {
        try {
            const updateData = { id: selectedNote?.id, note: data?.note, source: data?.source, source_id: data?.source_id };
            const response = await updateNote(updateData).unwrap();
            if (response?.response === "OK") {
                fnOnUpdateModalClose();
                fnShowSuccessSnackbar("Note updated successfully");
            }
        } catch (error) {
            fnShowErrorSnackbar(error?.data?.message);
        }
    };

    const fnOnClickNoteRow = (params) => {
        setSelectedNote(params?.row);
        setValue('note', params?.row?.note);
        setUpdateModal(true);
    };

    const fnOnUpdateModalClose = () => {
        setUpdateModal(false);
        setValue("note", "");
        setSelectedNote(null);
    };

    return (
        <div className='w-full max-h-[65vh] p-8 rounded-lg border overflow-y-auto flex flex-col gap-3 mt-6'>
            <div className='flex justify-between items-center'>
                <h3 className='font-semibold text-xl'>Notes</h3>
                <CustomButton onClick={() => setCreateModal(true)}>
                    <span>Create</span>
                </CustomButton>
            </div>
            <CustomTable onRowClick={fnOnClickNoteRow} rows={noteRows} columns={noteColumns} style={{ height: 350 }} />

            <CustomModal className={"w-[40vw]"} open={createModal} onClose={() => setCreateModal(false)} >

                <div className='w-full flex flex-col gap-6 items-end'>

                    <CustomInput name={'note'} label={'Note'} isRequired errors={errors} control={control} />

                    <CustomButton className={"w-fit"} onClick={handleSubmit(fnCreateNote)}>
                        <span>{isLoadingCreateNote ? "Loading..." : "Create"}</span>
                    </CustomButton>

                </div>

            </CustomModal>

            <CustomModal className={"w-[40vw]"} open={updateModal} onClose={fnOnUpdateModalClose} >

                <div className='w-full flex flex-col gap-6 items-end'>

                    <CustomInput name={'note'} label={'Note'} isRequired errors={errors} control={control} />

                    <CustomButton className={"w-fit"} onClick={handleSubmit(fnOnUpdateNote)}>
                        <span>{isLoadingUpdateNote ? "Loading..." : "Update"}</span>
                    </CustomButton>

                </div>

            </CustomModal>
        </div>
    )
}

export default NotesView