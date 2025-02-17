import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Config } from '../constants/Index';

const TAG_TYPES = {
    LEAD: "Lead", CONTACT: "Contact", FILES: "Files", NOTES: "Notes",
    PIPELINE: "Pipeline", PIPELINE_STAGES: "Pipeline Stages", OPPORTUNITY: "Opportunity"
};

export const crmApi = createApi({

    reducerPath: 'crmApi',

    baseQuery: fetchBaseQuery({
        baseUrl: Config.serverApiUrl,
        prepareHeaders: async (headers, { getState, endpoint }) => {
            const storedToken = localStorage.getItem(Config.userToken);
            if (storedToken && endpoint !== 'refresh') headers.set('Authorization', `Bearer ${storedToken}`);
            return headers;
        },
    }),

    tagTypes: Object.values(TAG_TYPES),

    endpoints: (builder) => ({
        //users
        loginUser: builder.mutation({ query: (data) => ({ url: 'user/login', method: "POST", body: data }) }),
        getAllUsers: builder.query({ query: () => 'user' }),
        getUser: builder.query({ query: (id) => `user/${id}` }),
        getCurrentUser: builder.query({ query: () => "user/me" }),

        //leads
        getAllLeads: builder.query({ query: () => 'lead', providesTags: [TAG_TYPES.LEAD] }),
        getLead: builder.query({ query: (id) => `lead/${id}`, providesTags: [TAG_TYPES.LEAD] }),
        createLead: builder.mutation({ query: (data) => ({ url: 'lead', method: "POST", body: data }), invalidatesTags: [TAG_TYPES.LEAD] }),
        updateLead: builder.mutation({ query: ({ id, ...body }) => ({ url: `lead/${id}`, method: "PATCH", body }), invalidatesTags: [TAG_TYPES.LEAD] }),
        deleteLead: builder.mutation({ query: (id) => ({ url: `lead/${id}`, method: "DELETE" }), invalidatesTags: [TAG_TYPES.LEAD] }),

        //contacts
        getAllContacts: builder.query({ query: () => 'contact', providesTags: [TAG_TYPES.CONTACT] }),
        getContact: builder.query({ query: (id) => `contact/${id}`, providesTags: [TAG_TYPES.CONTACT] }),
        createContact: builder.mutation({ query: (data) => ({ url: 'contact', method: "POST", body: data }), invalidatesTags: [TAG_TYPES.CONTACT] }),
        updateContact: builder.mutation({ query: ({ id, ...body }) => ({ url: `contact/${id}`, method: "PATCH", body }), invalidatesTags: [TAG_TYPES.CONTACT] }),
        deleteContact: builder.mutation({ query: (id) => ({ url: `contact/${id}`, method: "DELETE" }), invalidatesTags: [TAG_TYPES.CONTACT] }),

        //pipelines
        getAllPipelines: builder.query({ query: () => 'pipeline', providesTags: [TAG_TYPES.PIPELINE] }),
        getPipeline: builder.query({ query: (id) => `pipeline/${id}`, providesTags: [TAG_TYPES.PIPELINE] }),
        createPipeline: builder.mutation({ query: (data) => ({ url: 'pipeline', method: "POST", body: data }), invalidatesTags: [TAG_TYPES.PIPELINE] }),
        updatePipeline: builder.mutation({ query: ({ id, ...body }) => ({ url: `pipeline/${id}`, method: "PUT", body }), invalidatesTags: [TAG_TYPES.PIPELINE] }),
        deletePipeline: builder.mutation({ query: (id) => ({ url: `pipeline/${id}`, method: "DELETE" }), invalidatesTags: [TAG_TYPES.PIPELINE] }),

        //stages
        getAllStages: builder.query({ query: (id) => `stage?pipeline_id=${id}`, providesTags: [TAG_TYPES.PIPELINE_STAGES] }),
        getStage: builder.query({ query: (id) => `stage/${id}`, providesTags: [TAG_TYPES.PIPELINE_STAGES] }),
        createStage: builder.mutation({ query: (data) => ({ url: 'stage', method: "POST", body: data }), invalidatesTags: [TAG_TYPES.PIPELINE_STAGES, TAG_TYPES.PIPELINE] }),
        updateStage: builder.mutation({ query: ({ id, ...body }) => ({ url: `stage/${id}`, method: "PUT", body }), invalidatesTags: [TAG_TYPES.PIPELINE_STAGES, TAG_TYPES.PIPELINE] }),
        deleteStage: builder.mutation({ query: (id) => ({ url: `stage/${id}`, method: "DELETE" }), invalidatesTags: [TAG_TYPES.PIPELINE_STAGES, TAG_TYPES.PIPELINE] }),

        //opportunities
        getAllOpportunities: builder.query({ query: (data) => `opportunity?source=${data?.source}&source_id=${data?.source_id}`, providesTags: [TAG_TYPES.OPPORTUNITY] }),
        getOpportunity: builder.query({ query: (data) => `opportunity/${data?.id}?source=${data?.source}&source_id=${data?.source_id}`, providesTags: [TAG_TYPES.OPPORTUNITY] }),
        createOpportunity: builder.mutation({ query: (data) => ({ url: 'opportunity', method: "POST", body: data }), invalidatesTags: [TAG_TYPES.OPPORTUNITY] }),
        updateOpportunity: builder.mutation({ query: ({ id, ...body }) => ({ url: `opportunity/${id}`, method: "PATCH", body }), invalidatesTags: [TAG_TYPES.OPPORTUNITY] }),
        deleteOpportunity: builder.mutation({ query: (id) => ({ url: `opportunity/${id}`, method: "DELETE" }), invalidatesTags: [TAG_TYPES.OPPORTUNITY] }),

        //files 
        createFile: builder.mutation({ query: (data) => ({ url: 'file', method: "POST", body: data }), invalidatesTags: [TAG_TYPES.FILES] }),
        getAllFiles: builder.query({ query: (params) => `file?source=${params?.source}&source_id=${params?.source_id}`, providesTags: [TAG_TYPES.FILES] }),
        deleteFile: builder.mutation({ query: (id) => ({ url: `file/${id}`, method: "DELETE" }), invalidatesTags: [TAG_TYPES.FILES] }),
        updateFile: builder.mutation({ query: ({ id, ...body }) => ({ url: `file/${id}`, method: "PUT", body }), invalidatesTags: [TAG_TYPES.FILES] }),

        //notes
        createNote: builder.mutation({ query: (data) => ({ url: 'note', method: "POST", body: data }), invalidatesTags: [TAG_TYPES.NOTES] }),
        getAllNotes: builder.query({ query: (params) => `note?source=${params?.source}&source_id=${params?.source_id}`, providesTags: [TAG_TYPES.NOTES] }),
        deleteNote: builder.mutation({ query: (id) => ({ url: `note/${id}`, method: "DELETE" }), invalidatesTags: [TAG_TYPES.NOTES] }),
        updateNote: builder.mutation({ query: ({ id, ...body }) => ({ url: `note/${id}`, method: "PUT", body }), invalidatesTags: [TAG_TYPES.NOTES] }),

        //assignment
        removeAssignment: builder.mutation({ query: (data) => ({ url: `assignment/remove-assign`, method: "DELETE", body: data }), invalidatesTags: [TAG_TYPES.CONTACT, TAG_TYPES.LEAD] }),
    }),

});

export const {
    //users
    useLoginUserMutation,
    useGetAllUsersQuery,
    useGetUserQuery,
    useGetCurrentUserQuery,

    //leads
    useGetAllLeadsQuery,
    useGetLeadQuery,
    useCreateLeadMutation,
    useUpdateLeadMutation,
    useDeleteLeadMutation,

    //contacts
    useGetAllContactsQuery,
    useGetContactQuery,
    useCreateContactMutation,
    useUpdateContactMutation,
    useDeleteContactMutation,

    //pipelines
    useGetAllPipelinesQuery,
    useGetPipelineQuery,
    useCreatePipelineMutation,
    useUpdatePipelineMutation,
    useDeletePipelineMutation,

    //stages
    useGetAllStagesQuery,
    useGetStageQuery,
    useCreateStageMutation,
    useUpdateStageMutation,
    useDeleteStageMutation,

    //opportunities
    useGetAllOpportunitiesQuery,
    useGetOpportunityQuery,
    useCreateOpportunityMutation,
    useUpdateOpportunityMutation,
    useDeleteOpportunityMutation,

    //files
    useCreateFileMutation,
    useGetAllFilesQuery,
    useDeleteFileMutation,
    useUpdateFileMutation,

    //notes
    useCreateNoteMutation,
    useGetAllNotesQuery,
    useDeleteNoteMutation,
    useUpdateNoteMutation,

    //removeAssignment
    useRemoveAssignmentMutation

} = crmApi;