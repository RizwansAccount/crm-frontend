import React, { useState } from 'react';
import { Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {DeleteForever as DeleteIcon} from '@mui/icons-material';

const CustomTable = ({ rows, columns, onRowClick = false, onDelete, style }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const paginationModel = { page: 0, pageSize: 5 };

  const fnOnRowClick = (params, event) => {
    event.defaultMuiPrevented = true;
    if (onRowClick) {
      onRowClick(params);
    }
  };

  // Add delete action column
  const deleteColumn = {
    field: 'actions',
    headerName: '',
    width: 70,
    sortable: false,
    renderCell: (params) => {
      const isSelected = selectedRows?.includes(params?.row?.id);
      return isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(params.row.id);
          }}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <DeleteIcon />
        </button>
      );
    }
  };

  const enhancedColumns = [...columns, deleteColumn];

  return (
    <Paper sx={{ height: 450, width: '100%', ...style }}>
      <DataGrid
        rows={rows}
        columns={enhancedColumns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection);
        }}
        sx={{
          border: 0,
          '& .MuiDataGrid-row': { cursor: 'default' },
          '& .MuiDataGrid-cell': { cursor: 'pointer' },
          '& .MuiDataGrid-row.Mui-selected': { backgroundColor: 'transparent !important' },
          '& .MuiDataGrid-row.Mui-selected:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04) !important' },
          '& .MuiDataGrid-cell:focus': { outline: 'none !important' },
          '& .MuiDataGrid-cell:focus-within': { outline: 'none !important' }
        }}
        onRowClick={fnOnRowClick}
      />
    </Paper>
  );
};

export default CustomTable;

// import { Paper } from '@mui/material'
// import { DataGrid } from '@mui/x-data-grid'
// import React from 'react'

// const CustomTable = ({ rows, columns, onRowClick = false, style }) => {

//     const paginationModel = { page: 0, pageSize: 5 };

//     const fnOnRowClick = (params, event)=>{
//         event.defaultMuiPrevented = true;
//         if(onRowClick) {
//             onRowClick(params);
//         }
//     }

//     return (
//         <Paper sx={{ height: 450, width: '100%', ...style }}>
//             <DataGrid
//                 rows={rows}
//                 columns={columns}
//                 initialState={{ pagination: { paginationModel } }}
//                 pageSizeOptions={[5, 10]}
//                 checkboxSelection
//                 sx={{
//                     border: 0,
//                     '& .MuiDataGrid-row': { cursor: 'default' },
//                     '& .MuiDataGrid-cell': { cursor: 'default' },
//                     '& .MuiDataGrid-row.Mui-selected': { backgroundColor: 'transparent !important' },
//                     '& .MuiDataGrid-row.Mui-selected:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04) !important' },
//                     '& .MuiDataGrid-cell:focus': { outline: 'none !important' },
//                     '& .MuiDataGrid-cell:focus-within': { outline: 'none !important' }
//                 }}
//                 onRowClick={fnOnRowClick}
//             />
//         </Paper>
//     )
// }

// export default CustomTable