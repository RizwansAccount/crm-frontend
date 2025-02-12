import React, { useState } from 'react';
import { useCreateLeadMutation, useDeleteLeadMutation, useGetAllLeadsQuery, useGetAllUsersQuery } from '../../redux/storeApis';
import CustomTable from '../../components/customTable/CustomTable';
import CustomPopover from '../../components/customPopover/CustomPopover';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/RouteConstants';
import { LEAD_STATUS, ROLE } from '../../constants/Index';
import CustomButton from '../../components/customButton/CustomButton';
import CustomModal from '../../components/customModal/CustomModal';
import CustomInput from '../../components/customInput/CustomInput';
import { useForm } from 'react-hook-form';
import CustomMultiSelect from '../../components/customMultiSelect/CustomMultiSelect';
import CustomSelect from '../../components/customSelect/CustomSelect';
import { useUserDataManager } from '../../hooks/useUserDataManager';
import { DeleteForever as DeleteIcon } from '@mui/icons-material';
import { useSnackbarManager } from '../../hooks/useSnackbarManager';

const LeadPage = () => {

  const navigate = useNavigate();

  const { currentUser } = useUserDataManager();
  const { fnShowSuccessSnackbar, fnShowErrorSnackbar } = useSnackbarManager();

  const { data: usersData } = useGetAllUsersQuery();
  const { data: leadsData, isLoading: isLoadingLeadsData } = useGetAllLeadsQuery();
  const [createLead, { isLoading: isLoadingCreateLead }] = useCreateLeadMutation();
  const [deleteLead, { isLoading: isLoadingDeleteLead }] = useDeleteLeadMutation();

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
    { field: 'created_by', headerName: 'Created By', flex: 1, minWidth: 150, renderCell: (params) => <h1>{params?.row?.created_by?.name}</h1> },
    { field: 'last_updated_by', headerName: 'Updated By', flex: 1, minWidth: 150 },
    { field: 'assigned_to', headerName: 'Assigned To', flex: 1, minWidth: 150, renderCell: (params) => <CustomPopover list={params?.value} /> },
    { field: 'status', headerName: 'Status', flex: 0.5, minWidth: 150 },
    {
      field: 'actions', headerName: 'Actions', flex: 0.5, minWidth: 150,
      renderCell: (params) => {
        const isShowDeleteIcon = params?.row?.created_by?._id === currentUser?.user_id ||
          currentUser?.role === ROLE.admin ||
          currentUser?.role === ROLE.manager;
        return (
          isShowDeleteIcon && <div onClick={(e) => { e.stopPropagation(); fnDeleteLead(params?.row?.id) }}>
            <DeleteIcon />
          </div>
        )
      }
    }
  ];

  const leadRows = allLeads?.map((lead) => ({
    id: lead?._id,
    name: lead?.name,
    created_by: lead?.created_by,
    last_updated_by: lead?.last_updated_by?.name,
    status: lead?.status,
    assigned_to: lead?.assigned_to
  }));

  const fnNavigateToLeadDetailsPage = (params) => {
    navigate(`${ROUTES.leadDetailsPage}/${params.row.id}`);
  };

  const fnCreateLead = async (data) => {
    try {
      const response = await createLead(data).unwrap();
      if (response?.response === "OK") {
        setCreateModal(false);
        reset(undefined, { keepValues: true });
        fnShowSuccessSnackbar("Lead created successfully!");
      }
    } catch (error) {
      fnShowErrorSnackbar(error?.data?.message);
    }
  };

  const fnDeleteLead = async (id) => {
    try {
      const response = await deleteLead(id).unwrap();
      if (response?.response === "OK") {
        fnShowSuccessSnackbar("Lead deleted successfully!");
      }
    } catch (error) {
      fnShowErrorSnackbar(error?.data?.message);
    }
  };

  return (
    <div className='h-full w-full'>

      <div className='flex justify-end mb-4'>
        <CustomButton onClick={() => setCreateModal(true)}>
          <span>Create</span>
        </CustomButton>
      </div>

      {isLoadingLeadsData ? <span>Loading...</span> : <CustomTable
        rows={leadRows}
        columns={leadColumns}
        onRowClick={fnNavigateToLeadDetailsPage}
      />}

      <CustomModal open={createModal} title={"Add Lead"} onClose={() => setCreateModal(false)}>
        <div className='w-full flex flex-col gap-4'>
          <div className='flex gap-4'>
            <CustomInput name={"name"} control={control} errors={errors} label={"Name"} isRequired />
            <CustomInput name={"contact"} control={control} errors={errors} label={"Contact"} isRequired />
          </div>
          <div className='flex gap-4'>
            <CustomInput name={"lead_source"} control={control} errors={errors} label={"Source"} isRequired />
            <CustomSelect name={"status"} control={control} errors={errors} label={"Status"} options={LEAD_STATUS} isRequired />
          </div>

          {currentUser?.role !== ROLE.representative && <CustomMultiSelect name={"assigned_to"} control={control} errors={errors} label={"Assigned To"} options={allRepresentatives} />}

          <CustomButton onClick={handleSubmit(fnCreateLead)} >
            <span>{isLoadingCreateLead ? "Loading..." : "Add"}</span>
          </CustomButton>
        </div>
      </CustomModal>
    </div>
  )
}

export default LeadPage