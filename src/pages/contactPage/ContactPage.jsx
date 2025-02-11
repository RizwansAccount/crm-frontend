import React from 'react'
import { useDeleteContactMutation, useGetAllContactsQuery } from '../../redux/storeApis'
import CustomTable from '../../components/customTable/CustomTable';
import CustomPopover from '../../components/customPopover/CustomPopover';
import { ROLE } from '../../constants/Index';
import { useUserDataManager } from '../../hooks/useUserDataManager';
import { DeleteForever as DeleteIcon } from '@mui/icons-material';
import { useSnackbarManager } from '../../hooks/useSnackbarManager';
import { ROUTES } from '../../routes/RouteConstants';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {

  const navigate = useNavigate();

  const { data: contactsData, isLoading: isLoadingContactsData } = useGetAllContactsQuery();
  const [deleteContact, { isLoading: isLoadingDeleteContact }] = useDeleteContactMutation();

  const allContacts = contactsData?.data;

  const { currentUser } = useUserDataManager();
  const { fnShowSuccessSnackbar, fnShowErrorSnackbar } = useSnackbarManager();

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
      if (response?.data?.response === "OK") {
        fnShowSuccessSnackbar("Contact deleted successfully!");
      }
    } catch (error) {
      fnShowErrorSnackbar(error?.data?.message);
    }
  };


  return (
    <div>
      <CustomTable
        rows={contactRows}
        columns={contactColumns}
        onRowClick={fnNavigateToContactPage}
      />
    </div>
  )
}

export default ContactPage