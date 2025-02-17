import React, { useState } from 'react';
import ChevronRight from '@mui/icons-material/KeyboardArrowRight';
import Plus from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useCreateOpportunityMutation, useDeleteOpportunityMutation, useGetAllOpportunitiesQuery, useGetAllPipelinesQuery, useUpdateOpportunityMutation } from '../../redux/storeApis';
import CustomButton from '../customButton/CustomButton';
import { convertDateIntoFormat, formattedDate_yyyy_mm_dd, ROLE } from '../../constants/Index';
import CustomModal from '../customModal/CustomModal';
import { Controller, useForm } from 'react-hook-form';
import CustomInput from '../customInput/CustomInput';
import { useSnackbarManager } from '../../hooks/useSnackbarManager';
import CustomSelect from '../customSelect/CustomSelect';
import { useUserDataManager } from '../../hooks/useUserDataManager';

const OpportunityView = ({ source, source_id }) => {

    const { fnShowSuccessSnackbar, fnShowErrorSnackbar } = useSnackbarManager();
    const { currentUser } = useUserDataManager();

    const { data: opportunitiesData, isLoading: isLoadingOpportunitiesData } = useGetAllOpportunitiesQuery({ source, source_id }, {
        skip: (!source && !source_id)
    });

    const { data: pipelinesData, isLoading: isLoadingPipelinesData } = useGetAllPipelinesQuery();

    const [createOpportunity, { isLoading: isLoadingCreateOpportunity }] = useCreateOpportunityMutation();
    const [updateOpportunity, { isLoading: isLoadingUpdateOpportunity }] = useUpdateOpportunityMutation();
    const [deleteOpportunity, { isLoading: isLoadingDeleteOpportunity }] = useDeleteOpportunityMutation();

    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            pipeline_id: "",
            source,
            source_id,
            expected_revenue: "",
            close_date: "",
        }
    });

    const { handleSubmit: handleSubmitUpdate, control: controlUpdate, setValue: setValueUpdate, reset: resetUpdate, formState: { errors: errorsUpdate } } = useForm({
        defaultValues: {
            stage_id: "",
            expected_revenue: "",
            close_date: ""
        }
    });

    const allOpportunities = opportunitiesData?.data;
    const allPipelines = pipelinesData?.data;

    const [createModal, setCreateModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [selectedOpportunity, setSelectedOpportunity] = useState(null);

    const fnCreateOpportunity = async (data) => {
        try {
            const response = await createOpportunity({ ...data, close_date: formattedDate_yyyy_mm_dd(data?.close_date) })?.unwrap();
            if (response?.response === "OK") {
                fnShowSuccessSnackbar("opportunity created successfully!");
                setCreateModal(false);
                reset();
            }
        } catch (error) {
            fnShowErrorSnackbar(error?.data?.message)
        }
    };

    const fnUpdateOpportunity = async (data) => {
        try {
            const updateData = { id: selectedOpportunity?._id, ...data, close_date: formattedDate_yyyy_mm_dd(data?.close_date) };
            const response = await updateOpportunity(updateData).unwrap();
            if (response?.response === "OK") {
                fnShowSuccessSnackbar("opportunity updated successfully!");
                setUpdateModal(false);
                resetUpdate();
                setSelectedOpportunity(null);
            };
        } catch (error) {
            fnShowErrorSnackbar(error?.data?.message);
        }
    };

    const fnDeleteOpportunity = async (id) => {
        try {
            const response = await deleteOpportunity(id).unwrap();
            if (response?.response === "OK") {
                fnShowSuccessSnackbar("opportunity deleted successfully!");
            };
        } catch (error) {
            fnShowErrorSnackbar(error?.data?.message);
        }
    };

    const fnOpenUpdateModal = (opportunity) => {
        setSelectedOpportunity(opportunity);
        setValueUpdate('stage_id', opportunity?.current_stage?._id);
        const selectedCloseDate = formattedDate_yyyy_mm_dd(opportunity?.close_date);
        setValueUpdate('close_date', selectedCloseDate);
        setValueUpdate('expected_revenue', opportunity?.expected_revenue);
        setUpdateModal(true);
    };

    return (
        <div className="w-full max-h-[65vh] p-8 rounded-lg border overflow-y-auto flex flex-col gap-3 mt-6">

            <div className='flex justify-between items-center'>
                <h3 className='font-semibold text-xl'>Opportunities</h3>
                <CustomButton onClick={() => setCreateModal(true)}>
                    <span>Create</span>
                </CustomButton>
            </div>

            <div className='flex items-center gap-4 flex-wrap' >
                {allOpportunities?.map(opportunity => {

                    const isShowDeleteIcon = opportunity?.created_by?._id === currentUser?.user_id || currentUser?.role === ROLE.admin || currentUser?.role === ROLE.manager;

                    return (
                        <div key={opportunity?._id} className="w-fit space-y-4">
                            <div className="relative p-4 border rounded-lg hover:shadow-md transition-shadow  min-w-80">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-sm">
                                            Stage: <span className='font-semibold'>{opportunity?.current_stage?.name}</span>
                                        </h3>
                                        <h3 className="text-sm">
                                            Close Date: <span className='font-semibold'>{convertDateIntoFormat(opportunity?.close_date)}</span>
                                        </h3>
                                        <h3 className="text-sm">
                                            Created By: <span className='font-semibold' >{opportunity?.created_by?.name}</span>
                                        </h3>
                                        <div className="text-sm">
                                            <p className="font-medium text-green-600">{`Expected Revenue: $${opportunity.expected_revenue}`}</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col' >
                                        <button
                                            onClick={() => fnOpenUpdateModal(opportunity)}
                                            className="p-2 hover:bg-gray-100 rounded-full"
                                        >
                                            <EditIcon />
                                        </button>
                                        {isShowDeleteIcon && <button
                                            onClick={() => fnDeleteOpportunity(opportunity?._id)}
                                            className="p-2 hover:bg-gray-100 rounded-full"
                                        >
                                            <DeleteIcon className='text-[#DF3744]' />
                                        </button>}
                                    </div>

                                </div>

                            </div>
                        </div>
                    )
                })}
            </div>

            {
                createModal && <CustomModal open={createModal} onClose={() => setCreateModal(false)} >
                    <div className='flex flex-col gap-4' >

                        <div className="w-full">
                            <label className="block text-[14px] mb-1">Pipeline</label>
                            <Controller
                                name="pipeline_id"
                                control={control}
                                rules={{ required: "Pipeline is required!" }}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="">Select Pipeline</option>
                                        {allPipelines?.map((pipeline) => (
                                            <option key={pipeline?._id} value={pipeline?._id}>
                                                {pipeline?.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                            {errors?.pipeline_id && (
                                <p className="text-red-500 text-sm">{errors?.pipeline_id?.message}</p>
                            )}
                        </div>

                        <CustomInput placeholder='200' type='number' name={"expected_revenue"} label={"Expected Revenue"} control={control} errors={errors} rules={{ required: "Revenue is required" }} />
                        <CustomInput type='date' name={"close_date"} label={"Close Date"} control={control} errors={errors} rules={{ required: "Close Date is required" }} />

                        <CustomButton onClick={handleSubmit(fnCreateOpportunity)} >
                            <span>{isLoadingCreateOpportunity ? "Loading..." : "Add Opportunity"}</span>
                        </CustomButton>
                    </div>
                </CustomModal>
            }

            {updateModal && selectedOpportunity && (
                <CustomModal open={updateModal} onClose={() => {
                    setUpdateModal(false);
                    setSelectedOpportunity(null);
                    resetUpdate();
                }}>
                    <div className='flex flex-col gap-4'>
                        <div className="w-full">
                            <label className="block text-[14px] mb-1">Stage</label>
                            <Controller
                                name="stage_id"
                                control={controlUpdate}
                                rules={{ required: "Stage is required!" }}
                                render={({ field }) => (
                                    <select {...field} className="w-full p-2 border rounded">
                                        <option value="">Select Stage</option>
                                        {selectedOpportunity?.stages?.map((stage) => (
                                            <option key={stage?._id} value={stage?._id}>
                                                {stage?.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                            {errorsUpdate?.stage_id && (
                                <p className="text-red-500 text-sm">{errorsUpdate?.stage_id?.message}</p>
                            )}
                        </div>

                        <CustomInput
                            type='number'
                            name="expected_revenue"
                            label="Expected Revenue"
                            control={controlUpdate}
                            errors={errorsUpdate}
                            rules={{ required: "Expected revenue is required!" }}
                        />

                        <CustomInput
                            type='date'
                            name="close_date"
                            label="Close Date"
                            control={controlUpdate}
                            errors={errorsUpdate}
                            rules={{ required: "Close Date is required!" }}
                        />

                        <CustomButton onClick={handleSubmitUpdate(fnUpdateOpportunity)}>
                            <span>{isLoadingUpdateOpportunity ? "Loading..." : "Update Opportunity"}</span>
                        </CustomButton>
                    </div>
                </CustomModal>
            )}

        </div >
    );
};

export default OpportunityView;