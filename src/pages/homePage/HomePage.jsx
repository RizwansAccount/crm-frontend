import React, { useState } from 'react';
import { useCreateLeadMutation, useGetAllLeadsQuery, useGetAllUsersQuery } from '../../redux/storeApis';
import CustomTable from '../../components/customTable/CustomTable';
import CustomPopover from '../../components/customPopover/CustomPopover';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/RouteConstants';
import { SOURCE_TYPE } from '../../constants/Index';
import CustomButton from '../../components/customButton/CustomButton';
import CustomModal from '../../components/customModal/CustomModal';
import CustomInput from '../../components/customInput/CustomInput';
import { useForm } from 'react-hook-form';
import CustomMultiSelect from '../../components/customMultiSelect/CustomMultiSelect';

const HomePage = () => {

  const navigate = useNavigate();
  const { data: usersData } = useGetAllUsersQuery();
  const { data: leadsData, isLoading: isLoadingLeadsData } = useGetAllLeadsQuery();
  const [createLead, { isLoading: isLoadingCreateLead }] = useCreateLeadMutation();

  const [createModal, setCreateModal] = useState(false);

  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      contact: "",
      lead_source: "",
      status: "",
      assigned_to: [],
    },
  });

  const allLeads = leadsData?.data;
  const allRepresentatives = usersData?.data?.filter((user) => user?.role === "representative");

  const leadColumns = [
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

  const fnOnSubmit = async (data) => {
    try {
      const response = await createLead(data);
      if (response?.data?.response === "OK") {
        setCreateModal(false);
        reset(undefined, { keepValues: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='h-full w-full'>
      <div className='flex justify-end mb-4'>
        <CustomButton onClick={() => setCreateModal(true)}>
          <span>Create</span>
        </CustomButton>
      </div>
      <CustomTable
        rows={leadRows}
        columns={leadColumns}
        onRowClick={fnNavigateToModuleDetailsPage}
      />
      <CustomModal open={createModal} title={"Add Lead"} onClose={() => setCreateModal(false)}>
        <div className='w-full flex flex-col gap-4'>
          <div className='flex gap-4'>
            <CustomInput name={"name"} control={control} errors={errors} label={"Name"} isRequired />
            <CustomInput name={"contact"} control={control} errors={errors} label={"Contact"} isRequired />
          </div>
          <div className='flex gap-4'>
            <CustomInput name={"lead_source"} control={control} errors={errors} label={"Source"} isRequired />
            <CustomInput name={"status"} control={control} errors={errors} label={"Status"} isRequired />
          </div>

          <CustomMultiSelect name={"assigned_to"} control={control} errors={errors} label={"Assigned To"} options={allRepresentatives} />

          <CustomButton onClick={handleSubmit(fnOnSubmit)} >
            <span>{isLoadingCreateLead ? "Loading..." : "Add"}</span>
          </CustomButton>
        </div>
      </CustomModal>
    </div>
  )
}

export default HomePage