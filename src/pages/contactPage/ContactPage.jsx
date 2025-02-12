import React, { useEffect, useState } from 'react'
import { useCreateContactMutation, useDeleteContactMutation, useGetAllContactsQuery, useGetAllUsersQuery } from '../../redux/storeApis'
import CustomTable from '../../components/customTable/CustomTable';
import CustomPopover from '../../components/customPopover/CustomPopover';
import { ROLE } from '../../constants/Index';
import { useUserDataManager } from '../../hooks/useUserDataManager';
import { DeleteForever as DeleteIcon } from '@mui/icons-material';
import { useSnackbarManager } from '../../hooks/useSnackbarManager';
import { ROUTES } from '../../routes/RouteConstants';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/customButton/CustomButton';
import { useForm } from 'react-hook-form';
import CustomTagInput from '../../components/customTagInput/CustomTagInput';
import CustomMultiSelect from '../../components/customMultiSelect/CustomMultiSelect';
import CustomInput from '../../components/customInput/CustomInput';
import CustomModal from '../../components/customModal/CustomModal';

const ContactPage = () => {

  const navigate = useNavigate();

  const { currentUser } = useUserDataManager();
  const { fnShowSuccessSnackbar, fnShowErrorSnackbar } = useSnackbarManager();

  const { data: usersData } = useGetAllUsersQuery();
  const { data: contactsData, isLoading: isLoadingContactsData } = useGetAllContactsQuery();
  const [createContact, { isLoading: isLoadingCreateContact }] = useCreateContactMutation();
  const [deleteContact, { isLoading: isLoadingDeleteContact }] = useDeleteContactMutation();

  const allContacts = contactsData?.data;

  const [createModal, setCreateModal] = useState(false);

  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      company: "",
      tags: [],
      assigned_to: [],
    },
  });

  const allRepresentatives = usersData?.data?.filter((user) => user?.role === "representative");

  const contactColumns = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 0.5, minWidth: 150 },
    { field: 'phone', headerName: 'Phone', flex: 0.5, minWidth: 150 },
    { field: 'company', headerName: 'Company', flex: 0.5, minWidth: 150 },
    { field: 'created_by', headerName: 'Created By', flex: 1, minWidth: 150, renderCell: (params) => <h1>{params?.row?.created_by?.name}</h1> },
    { field: 'last_updated_by', headerName: 'Updated By', flex: 1, minWidth: 150 },
    { field: 'assigned_to', headerName: 'Assigned To', flex: 1, minWidth: 150, renderCell: (params) => <CustomPopover list={params?.value} /> },
    {
      field: 'actions', headerName: 'Actions', flex: 0.5, minWidth: 150,
      renderCell: (params) => {
        const isShowDeleteIcon = params?.row?.created_by?._id === currentUser?.user_id ||
          currentUser?.role === ROLE.admin ||
          currentUser?.role === ROLE.manager;
        return (
          isShowDeleteIcon && <div onClick={(e) => { e.stopPropagation(); fnDeleteContact(params?.row?.id) }}>
            <DeleteIcon />
          </div>
        )
      }
    }
  ];

  const contactRows = allContacts?.map((contact) => ({
    id: contact?._id,
    name: contact?.name,
    created_by: contact?.created_by,
    last_updated_by: contact?.last_updated_by?.name,
    email: contact?.email,
    phone: contact?.phone,
    company: contact?.company,
    assigned_to: contact?.assigned_to
  }));

  const fnNavigateToContactPage = (params) => {
    navigate(`${ROUTES.contactDetailsPage}/${params.row.id}`);
  };

  const fnDeleteContact = async (id) => {
    try {
      const response = await deleteContact(id).unwrap();
      if (response?.response === "OK") {
        fnShowSuccessSnackbar("Contact deleted successfully!");
      }
    } catch (error) {
      fnShowErrorSnackbar(error?.data?.message);
    }
  };

  const fnCreateContact = async (data) => {
    try {
      const response = await createContact(data).unwrap();
      if (response?.response === "OK") {
        setCreateModal(false);
        reset();
        fnShowSuccessSnackbar("Contact created successfully!");
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

      <CustomTable
        rows={contactRows}
        columns={contactColumns}
        onRowClick={fnNavigateToContactPage}
      />

      <CustomModal open={createModal} title={"Add Contact"} onClose={() => setCreateModal(false)}>

        <div className='w-full flex flex-col gap-4'>
          <div className='w-full flex items-center justify-between gap-4'>
            <CustomInput name={'name'} control={control} errors={errors} label={'Name'} isRequired />
            <CustomInput name={'email'} control={control} errors={errors} label={'Email'} isRequired />
          </div>

          <CustomInput name={'address'} control={control} errors={errors} label={'Address'} isRequired />

          <CustomTagInput name="tags" control={control} errors={errors} label="Tags" />

          <div className='w-full flex items-center justify-between gap-4'>
            <CustomInput name={'phone'} control={control} errors={errors} label={'Phone'} isRequired />
            <CustomInput name={'company'} control={control} errors={errors} label={'Company'} isRequired />
          </div>

          {currentUser?.role !== ROLE.representative && <CustomMultiSelect
            name="assigned_to"
            control={control}
            errors={errors}
            label="Assign To"
            options={allRepresentatives || []}
          />}

          <CustomButton style={{ marginTop: 12 }} onClick={handleSubmit(fnCreateContact)} className="w-full">
            {isLoadingCreateContact ? "Loading..." : "Add"}
          </CustomButton>
        </div>

      </CustomModal>
    </div>
  )
}

export default ContactPage