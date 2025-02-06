import { Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

const CustomTable = ({rows, columns}) => {

    const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ 
            border: 0,
            '& .MuiDataGrid-row': { cursor: 'default' },
            '& .MuiDataGrid-cell': { cursor: 'default' },
            '& .MuiDataGrid-row.Mui-selected': { backgroundColor: 'transparent !important' },
            '& .MuiDataGrid-row.Mui-selected:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04) !important' },
            '& .MuiDataGrid-cell:focus': { outline: 'none !important' },
            '& .MuiDataGrid-cell:focus-within': { outline: 'none !important' }
          }}
          onRowClick={(params, event) => { event.defaultMuiPrevented = true }}
        />
      </Paper>
  )
}

export default CustomTable