import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetAllUsersQuery, useGetContactQuery, useRemoveAssignmentMutation, useUpdateContactMutation } from '../../redux/storeApis';
import { useForm } from 'react-hook-form';
import CustomInput from '../../components/customInput/CustomInput';
import CustomMultiSelect from '../../components/customMultiSelect/CustomMultiSelect';
import FilesView from '../../components/views/FilesView';
import NotesView from '../../components/views/NotesView';
import { ROLE, SOURCE_TYPE } from '../../constants/Index';
import CustomButton from '../../components/customButton/CustomButton';
import { useUserDataManager } from '../../hooks/useUserDataManager';
import { useSnackbarManager } from '../../hooks/useSnackbarManager';
import CustomTagInput from '../../components/customTagInput/CustomTagInput';
import PageHeaderView from '../../components/views/PageHeaderView';

const ContactDetailsPage = () => {

    const { id } = useParams();

    const source = SOURCE_TYPE.contact;

    const { data: usersData } = useGetAllUsersQuery();
    const { data: contactData, refetch: refetchContactData, isLoading: isLoadingContactData } = useGetContactQuery(id, { skip: !id });

    const { currentUser } = useUserDataManager();
    const { fnShowSuccessSnackbar, fnShowErrorSnackbar } = useSnackbarManager();

    const [updateContact, { isLoading: isLoadingUpdateLead }] = useUpdateContactMutation();
    const [removeAssign, { isLoading: isLoadingRemoveAssign }] = useRemoveAssignmentMutation();

    const contactDetail = contactData?.data;
    const allRepresentatives = usersData?.data?.filter((user) => user?.role === ROLE.representative);

    const { handleSubmit, control, setValue, formState: { errors } } = useForm({
        defaultValues: {
            name: contactDetail?.name || "",
            email: contactDetail?.email || "",
            phone: contactDetail?.phone || "",
            company: contactDetail?.company || "",
            address: contactDetail?.address || "",
            tags: contactDetail?.tags || [],
            assigned_to: contactDetail?.assigned_to?.map(user => user?._id) || [],
        },
    });

    useEffect(() => {
        if (contactDetail) {
            setValue('name', contactDetail?.name);
            setValue('email', contactDetail?.email);
            setValue('phone', contactDetail?.phone);
            setValue('company', contactDetail?.company);
            setValue('address', contactDetail?.address);
            setValue('tags', contactDetail?.tags);
            setValue('assigned_to', contactDetail?.assigned_to?.map(user => user?._id));
        }
    }, [contactDetail]);

    const fnOnUpdate = async (data) => {
        try {
            const { name, email, phone, company, address, tags } = data;
            const modifiedData = currentUser?.role === ROLE.representative ? { name, email, phone, company, address, tags } : data;
            const response = await updateContact({ id, ...modifiedData }).unwrap();
            if (response?.response === "OK") {
                fnShowSuccessSnackbar("Contact updated successfully!");
            };
        } catch (error) {
            fnShowErrorSnackbar(error?.data?.message);
        }
    };

    const fnRemoveAssignment = async (data) => {
        try {
            const response = await removeAssign({ source, source_id: id, ...data }).unwrap();
            if (response?.response === "OK") {
                console.log("okay here bro hahahahaha")
                refetchContactData();
                fnShowSuccessSnackbar("Assignment removed successfully!");
            }
        } catch (error) {
            fnShowErrorSnackbar(error?.data?.mesage)
        }
    };

    return (
        <div className='w-full min-h-screen flex flex-col pb-8 px-10'>

            <PageHeaderView source={source} />

            <div className='flex flex-col gap-3 w-full border p-8 rounded-lg mt-6'>
                <div className='w-full flex items-center justify-between gap-4'>
                    <CustomInput name={'name'} control={control} errors={errors} label={'Name'} isRequired />
                    <CustomInput name={'email'} control={control} errors={errors} label={'Email'} isRequired />
                </div>

                <CustomInput name={'address'} control={control} errors={errors} label={'Address'} isRequired />

                <div className='w-full flex items-center justify-between gap-4'>
                    <CustomInput name={'phone'} control={control} errors={errors} label={'Phone'} isRequired />
                    <CustomInput name={'company'} control={control} errors={errors} label={'Company'} isRequired />
                </div>

                <CustomTagInput name="tags" control={control} errors={errors} label="Tags" />

                {currentUser?.role !== ROLE.representative && <CustomMultiSelect
                    name="assigned_to"
                    control={control}
                    errors={errors}
                    label="Assign To"
                    options={allRepresentatives || []}
                    onRemoveAssignment={fnRemoveAssignment}
                />}

                <CustomButton style={{ marginTop: 12 }} onClick={handleSubmit(fnOnUpdate)} className="w-full">
                    {isLoadingUpdateLead ? "Loading..." : "Update"}
                </CustomButton>

            </div>

            <NotesView source={source} source_id={id} />
            <FilesView source={source} source_id={id} />

        </div>
    )
}

export default ContactDetailsPage