import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Config } from '../constants/Index';

const TAG_TYPES = { LEAD : "Lead", CONTACT : "Contact", FILES : "Files" };

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

    tagTypes: [TAG_TYPES.LEAD, TAG_TYPES.CONTACT, TAG_TYPES.FILES],

    endpoints: (builder) => ({
        //users
        loginUser: builder.mutation({ query: (data) => ({ url: 'user/login', method: "POST", body: data }) }),
        getAllUsers : builder.query({ query: () => 'user' }),

        //leads
        getAllLeads: builder.query({ query: () => 'lead', providesTags: [TAG_TYPES.LEAD] }),
        getLead: builder.query({ query: (id) => `lead/${id}`, providesTags: [TAG_TYPES.LEAD] }),
        createLead: builder.mutation({ query: (data) => ({ url: 'lead', method: "POST", body: data }), invalidatesTags: [TAG_TYPES.LEAD] }),
        updateLead: builder.mutation({ query: ({id, ...body}) => ({ url: `lead/${id}`, method: "PATCH", body: {...body} }), invalidatesTags: [TAG_TYPES.LEAD] }),
        deleteLead: builder.mutation({ query: (id) => ({ url: `lead/${id}`, method: "DELETE" }), invalidatesTags: [TAG_TYPES.LEAD] }),

        //files 
        createFile: builder.mutation({ query: (data) => ({ url: 'file', method: "POST", body: data }), invalidatesTags: [TAG_TYPES.FILES] }),
        getAllFiles: builder.query({ query: (params) => `file?source=${params?.source}&source_id=${params?.source_id}`, providesTags: [TAG_TYPES.FILES] }),
        deleteFile: builder.mutation({ query: (id) => ({ url: `file/${id}`, method: "DELETE" }), invalidatesTags: [TAG_TYPES.FILES] }),

        //notes
        createNote: builder.mutation({ query: (data) => ({ url: 'note', method: "POST", body: data }) }),
        getAllNotes: builder.query({ query: (params) => `note?source=${params?.source}&source_id=${params?.source_id}` }),
        deleteNote: builder.mutation({ query: (id) => ({ url: `note/${id}`, method: "DELETE" }) }),
    }),

});

export const {
    //users
    useLoginUserMutation,
    useGetAllUsersQuery,

    //leads
    useGetAllLeadsQuery,
    useGetLeadQuery,
    useCreateLeadMutation,
    useUpdateLeadMutation,
    useDeleteLeadMutation,

    //files
    useCreateFileMutation,
    useGetAllFilesQuery,
    useDeleteFileMutation,

    //notes
    useCreateNoteMutation,
    useGetAllNotesQuery,
    useDeleteNoteMutation,

} = crmApi;