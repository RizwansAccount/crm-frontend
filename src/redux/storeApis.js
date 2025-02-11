import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Config } from '../constants/Index';

const TAG_TYPES = { LEAD: "Lead", CONTACT: "Contact", FILES: "Files", NOTES: "Notes" };

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

    tagTypes: [TAG_TYPES.LEAD, TAG_TYPES.CONTACT, TAG_TYPES.FILES, TAG_TYPES.NOTES],

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
        
        //leads
        getAllContacts: builder.query({ query: () => 'contact', providesTags: [TAG_TYPES.CONTACT] }),
        getContact: builder.query({ query: (id) => `contact/${id}`, providesTags: [TAG_TYPES.CONTACT] }),
        createContact: builder.mutation({ query: (data) => ({ url: 'contact', method: "POST", body: data }), invalidatesTags: [TAG_TYPES.CONTACT] }),
        updateContact: builder.mutation({ query: ({ id, ...body }) => ({ url: `contact/${id}`, method: "PATCH", body }), invalidatesTags: [TAG_TYPES.CONTACT] }),
        deleteContact: builder.mutation({ query: (id) => ({ url: `contact/${id}`, method: "DELETE" }), invalidatesTags: [TAG_TYPES.CONTACT] }),

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
        removeAssignment: builder.mutation({ query: (data) => ({ url: `assignment/remove-assign`, method: "DELETE", body: data }) }),
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