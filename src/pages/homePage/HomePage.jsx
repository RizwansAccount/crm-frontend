import React from 'react';
import { useGetAllLeadsQuery } from '../../redux/storeApis';
import CustomTable from '../../components/customTable/CustomTable';
import CustomPopover from '../../components/customPopover/CustomPopover';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/RouteConstants';
import { SOURCE_TYPE } from '../../constants/Index';

const HomePage = () => {
  const navigate = useNavigate();
  const { data: leadsData, isLoading: isLoadingLeadsData } = useGetAllLeadsQuery();

  const allLeads = leadsData?.data;

  const leadColumns = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 150 },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'created_by', headerName: 'Created By', flex: 1, minWidth: 150 },
    { field: 'last_updated_by', headerName: 'Updated By', flex: 1, minWidth: 150 },
    {
      field: 'assigned_to',
      headerName: 'Assigned To',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <CustomPopover list={params.value} />
    },
    { field: 'status', headerName: 'Status', flex: 0.5, minWidth: 150 },
  ];

  const leadRows = allLeads?.map((lead) => ({
    id: lead?._id,
    name: lead?.name,
    created_by: lead?.created_by?.name,
    last_updated_by: lead?.last_updated_by?.name,
    status: lead?.status,
    assigned_to: lead?.assigned_to
  }));

  const fnNavigateToModuleDetailsPage = (params) => {
    navigate(`${ROUTES.moduleDetailsPage}/${params.row.id}`, { state: { source: SOURCE_TYPE.lead } });
  };

  return (
    <div className='h-full w-full'>
      <CustomTable
        rows={leadRows}
        columns={leadColumns}
        onRowClick={fnNavigateToModuleDetailsPage}
      />
    </div>
  )
}

export default HomePage