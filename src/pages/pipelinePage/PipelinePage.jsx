import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import ChevronRight from '@mui/icons-material/KeyboardArrowRight';
import Plus from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Close from '@mui/icons-material/Close';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useCreatePipelineMutation, useCreateStageMutation, useDeletePipelineMutation, useDeleteStageMutation, useGetAllPipelinesQuery, useUpdateStageMutation } from '../../redux/storeApis';
import { useSnackbarManager } from '../../hooks/useSnackbarManager';
import { RoundedBtn } from '../../components/customButton/CustomButton';
import CustomInput from '../../components/customInput/CustomInput';

const PipelinePage = () => {
    const { data: pipelineData, isLoading: isLoadingPipelineData } = useGetAllPipelinesQuery();
    const [createPipeline, { isLoading: isLoadingCreatePipeline }] = useCreatePipelineMutation();
    const [deletePipeline, { isLoading : isLoadingDeletePipeline }] = useDeletePipelineMutation();
    const [createStage, { isLoading: isLoadingCreateStage }] = useCreateStageMutation();
    const [deleteStage, { isLoading: isLoadingDeleteStage }] = useDeleteStageMutation();
    const [updateStage, { isLoading: isLoadingUpdateStage }] = useUpdateStageMutation();

    const { fnShowSuccessSnackbar, fnShowErrorSnackbar } = useSnackbarManager();

    const allPipelines = pipelineData?.data;

    const [showNewPipelineForm, setShowNewPipelineForm] = useState(false);
    const [selectedStage, setSelectedStage] = useState(null);
    const [showAddStageForm, setShowAddStageForm] = useState(null);

    // Form for new pipeline
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: { name: '', stages: [{ name: '' }]}
    });

    // Form for editing/adding single stage
    const { control: stageControl, handleSubmit: handleStageSubmit, reset: resetStageForm } = useForm({
        defaultValues: { name: ''}
    });

    const { fields, append, remove } = useFieldArray({
        control, name: 'stages'
    });

    const fnCreatePipeline = async (data) => {
        try {
            const filteredStages = data?.stages?.map(stage => stage?.name?.trim())?.filter(stage => stage !== '');
            const pipelineData = filteredStages?.length > 0 ? { name: data?.name, stages: filteredStages } : { name: data?.name };

            const response = await createPipeline(pipelineData).unwrap();

            if (response?.response === "OK") {
                fnShowSuccessSnackbar("Pipeline created successfully!");
                setShowNewPipelineForm(false);
                reset({ name: '', stages: [{ name: '' }] });
            }
        } catch (error) {
            fnShowErrorSnackbar(error?.data?.message || "Failed to create pipeline");
        }
    };

    const fnDeletePipeline = async (id) => {
        try {
            const response = await deletePipeline(id).unwrap();
            if (response?.response === "OK") {
                fnShowSuccessSnackbar("Pipeline deleted successfully!");
            }
        } catch (error) {
            fnShowErrorSnackbar(error?.data?.message);
        }
    };

    const fnCreateStage = async (data) => {
        try {
            if (!showAddStageForm) return;
            const stageData = {
                pipeline_id: showAddStageForm,
                name: data.name.trim()
            };
            const response = await createStage(stageData).unwrap();
            if (response?.response === "OK") {
                fnShowSuccessSnackbar("Stage created successfully!");
                setShowAddStageForm(null);
                resetStageForm();
            }
        } catch (error) {
            fnShowErrorSnackbar(error?.data?.message);
        }
    };

    const fnDeleteStage = async (id) => {
        try {
            const response = await deleteStage(id).unwrap();
            if (response?.response === "OK") {
                fnShowSuccessSnackbar("Stage deleted successfully!");
            }
        } catch (error) {
            fnShowErrorSnackbar(error?.data?.message);
        }
    };

    const fnUpdateStage = async (data) => {
        try {
            if (!selectedStage) return;
            const updateData = {
                id : selectedStage?._id,
                pipeline_id: selectedStage.pipeline_id,
                name: data.name.trim()
            };
            const response = await updateStage(updateData).unwrap();
            if (response?.response === "OK") {
                fnShowSuccessSnackbar("Stage updated successfully!");
                setSelectedStage(null);
                resetStageForm();
            }
        } catch (error) {
            fnShowErrorSnackbar(error?.data?.message);
        }
    };

    const fnOnChangeStage = (stage) => {
        setSelectedStage(stage);
        resetStageForm({ name: stage.name });
    };

    const fnOnCancel = () => {
        setShowNewPipelineForm(false);
        reset({ name: '', stages: [{ name: '' }] });
    };

    return (
        <div className="w-full p-6 space-y-6">
            <RoundedBtn onClick={() => setShowNewPipelineForm(true)}>
                <Plus className="w-4 h-4" />
                <span>Create New Pipeline</span>
            </RoundedBtn>

            {showNewPipelineForm && (
                <Card className="w-full">

                    <CardHeader>
                        <span>Create New Pipeline</span>
                    </CardHeader>

                    <CardContent className="p-4 space-y-4">

                        <CustomInput 
                            name="name" 
                            control={control} 
                            errors={errors} 
                            label="Pipeline Name" 
                            placeholder="Enter pipeline name" 
                            isRequired={true} 
                        />

                        <>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pipeline Stages
                            </label>
                            <div className="space-y-2">
                                {fields?.map((field, index) => (
                                    <div key={field.id} className="flex gap-2">

                                        <CustomInput
                                            name={`stages.${index}.name`}
                                            control={control}
                                            errors={errors}
                                            placeholder={`Stage ${index + 1} name`}
                                            isRequired={true}
                                        />

                                        {fields.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded"
                                            >
                                                <Close className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={() => append({ name: '' })}
                                className="mt-2 flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                            >
                                <Plus className="w-4 h-4" />
                                Add Another Stage
                            </button>
                        </>

                        <div className="flex gap-2">
                            <RoundedBtn 
                                disabled={isLoadingCreatePipeline} 
                                onClick={handleSubmit(fnCreatePipeline)}
                            >
                                {isLoadingCreatePipeline ? 'Creating...' : 'Create Pipeline'}
                            </RoundedBtn>
                            <button 
                                onClick={fnOnCancel} 
                                className="px-4 py-2 border rounded hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {allPipelines?.map(pipeline => (
                <Card key={pipeline._id} className="w-full p-4">
                    <div className="flex flex-row items-center justify-between">
                        <span className="font-medium">{pipeline?.name}</span>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setShowAddStageForm(pipeline._id)}
                                className="p-1 hover:bg-blue-50 rounded-full text-blue-600"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <CardContent>
                        {showAddStageForm === pipeline._id && (
                            <div className="mb-4 p-4 border rounded-lg bg-gray-50">
                                <h4 className="font-medium mb-2">Add New Stage</h4>
                                <form onSubmit={handleStageSubmit(fnCreateStage)} className="flex gap-2">
                                    <div className="flex-1">
                                        <CustomInput
                                            name="name"
                                            control={stageControl}
                                            placeholder="Enter stage name"
                                            isRequired={true}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            disabled={isLoadingCreateStage}
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            {isLoadingCreateStage ? 'Adding...' : 'Add Stage'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowAddStageForm(null);
                                                resetStageForm();
                                            }}
                                            className="px-4 py-2 border rounded hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="flex justify-between mb-8">
                            {pipeline?.stages?.map((stage, index) => (
                                <div key={stage._id} className="flex items-center">
                                    <div className="flex flex-col items-center">
                                        {selectedStage?._id === stage._id ? (
                                            <form onSubmit={handleStageSubmit(fnUpdateStage)} className="flex gap-2">
                                                <CustomInput
                                                    name="name"
                                                    control={stageControl}
                                                    placeholder="Enter stage name"
                                                    isRequired={true}
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        type="submit"
                                                        disabled={isLoadingUpdateStage}
                                                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                                    >
                                                        {isLoadingUpdateStage ? 'Saving...' : 'Save'}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedStage(null);
                                                            resetStageForm();
                                                        }}
                                                        className="px-3 py-1 border rounded hover:bg-gray-50"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            <div className="relative group">
                                                <div className="w-fit p-2 bg-gray-100 rounded-lg text-sm">
                                                    {stage?.name}
                                                </div>
                                                <div className="absolute bottom-[-4] right-0 hidden group-hover:flex gap-1">
                                                    <button
                                                        onClick={() => fnOnChangeStage({...stage, pipeline_id : pipeline?._id})}
                                                        className="px-2 py-1 bg-gray-100 shadow rounded-full hover:bg-gray-50"
                                                    >
                                                        <Edit style={{height:16, width: 16}} />
                                                    </button>
                                                    <button
                                                        onClick={() => fnDeleteStage(stage._id, stage.name)}
                                                        className="px-2 py-1 bg-gray-100 shadow rounded-full hover:bg-gray-50 text-red-500"
                                                    >
                                                        <Delete style={{height:16, width: 16}} />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {index < pipeline.stages.length - 1 && (
                                        <ChevronRight className="mx-2 text-gray-400" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>

                    <div className='flex flex-col items-end'>
                        <Delete style={{color:'red', cursor:'pointer'}} onClick={()=>fnDeletePipeline(pipeline?._id)} />
                    </div>

                </Card>
            ))}
        </div>
    )
}

export default PipelinePage;