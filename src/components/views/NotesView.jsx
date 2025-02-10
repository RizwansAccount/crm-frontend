import React from 'react'
import CustomTable from '../customTable/CustomTable'
import { useGetAllNotesQuery } from '../../redux/storeApis';

const NotesView = ({source, source_id}) => {
    const { data: notesData, isLoading: isLoadingNotesData } = useGetAllNotesQuery({ source, source_id }, { skip: (!source_id && !source) });

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
    
    return (
        <div className='w-full max-h-[65vh] p-8 rounded-lg border overflow-y-auto flex flex-col gap-3 mt-6'>
            <h3 className='font-semibold text-xl'>Notes</h3>
            <CustomTable rows={noteRows} columns={noteColumns} style={{ height: 350 }} />
        </div>
    )
}

export default NotesView