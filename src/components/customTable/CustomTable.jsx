import React from 'react';
import { Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const CustomTable = ({ rows, columns, onRowClick = false, style }) => {
  const paginationModel = { page: 0, pageSize: 5 };

  const fnOnRowClick = (params, event) => {
    event.defaultMuiPrevented = true;
    if (onRowClick) {
      onRowClick(params);
    }
  };

  return (
    <Paper sx={{ height: 450, width: '100%', ...style }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
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