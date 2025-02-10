import React, { useState } from 'react'
import CustomTable from '../customTable/CustomTable'
import { useCreateNoteMutation, useDeleteNoteMutation, useGetAllNotesQuery } from '../../redux/storeApis';
import CustomButton from '../customButton/CustomButton';
import CustomModal from '../customModal/CustomModal';
import CustomInput from '../customInput/CustomInput';
import { useForm } from 'react-hook-form';

const NotesView = ({ source, source_id }) => {

    const { data: notesData, isLoading: isLoadingNotesData } = useGetAllNotesQuery({ source, source_id }, { skip: (!source_id && !source) });
    const [createNote, { isLoading: isLoadingCreateNote }] = useCreateNoteMutation();
    const [deleteNote, { isLoading: isLoadingDeleteNote }] = useDeleteNoteMutation();

    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            note: "",
            source,
            source_id
        }
    });

    const [createModal, setCreateModal] = useState(false);

    const noteColumns = [
        { field: 'note', headerName: 'Note', flex: 1, minWidth: 80 },
        { field: 'created_by', headerName: 'Created By', flex: 1, minWidth: 80 },
        { field: 'updated_by', headerName: 'Updated By', flex: 1, minWidth: 80 },
    ];

    const noteRows = notesData?.data?.map((note) => ({
        id: note?._id,
        note: note?.note,
        created_by: note?.create_by?.name,
        updated_by: note?.last_update_by?.name
    }));

    const fnCreateNote = async (data) => {
        try {
            const response = await createNote({ note: data?.note, source, source_id }).unwrap();
            if (response?.response === "OK") {
                setCreateModal(false);
                reset();
                console.log("Note created successfully");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fnDeleteNote = async (id) => {
        try {
            const response = await deleteNote(id).unwrap();
            if (response?.response === "OK") {
                console.log("Note deleted successfully");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='w-full max-h-[65vh] p-8 rounded-lg border overflow-y-auto flex flex-col gap-3 mt-6'>
            <div className='flex justify-between items-center'>
                <h3 className='font-semibold text-xl'>Notes</h3>
                <CustomButton onClick={() => setCreateModal(true)}>
                    <span>Create</span>
                </CustomButton>
            </div>
            <CustomTable onDelete={fnDeleteNote} rows={noteRows} columns={noteColumns} style={{ height: 350 }} />

            <CustomModal className={"w-[40vw]"} open={createModal} onClose={() => setCreateModal(false)} >

                <div className='w-full flex flex-col gap-6 items-end'>
                    <CustomInput
                        name={'note'}
                        label={'Note'}
                        isRequired
                        errors={errors}
                        control={control}
                    />

                    <CustomButton className={"w-fit"} onClick={handleSubmit(fnCreateNote)}>
                        <span>{isLoadingCreateNote ? "Loading..." : "Create"}</span>
                    </CustomButton>
                </div>

            </CustomModal>
        </div>
    )
}

export default NotesView