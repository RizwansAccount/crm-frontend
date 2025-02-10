import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Config } from '../constants/Index';

const TAG_TYPES = { LEAD : "Lead", CONTACT : "Contact" };

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

    tagTypes: [TAG_TYPES.LEAD, TAG_TYPES.CONTACT],

    endpoints: (builder) => ({
        //users
        loginUser: builder.mutation({ query: (data) => ({ url: 'user/login', method: "POST", body: data }) }),
        getAllUsers : builder.query({ query: () => 'user' }),

        //leads
        getAllLeads: builder.query({ query: () => 'lead', providesTags: [TAG_TYPES.LEAD] }),
        getLead: builder.query({ query: (id) => `lead/${id}`, providesTags: [TAG_TYPES.LEAD] }),
        createLead: builder.mutation({ query: (data) => ({ url: 'lead', method: "POST", body: data }), invalidatesTags: [TAG_TYPES.LEAD] }),
        deleteLead: builder.mutation({ query: (id) => ({ url: `lead/${id}`, method: "DELETE" }), invalidatesTags: [TAG_TYPES.LEAD] }),

        //files 
        getAllFiles: builder.query({ query: (params) => `file?source=${params?.source}&source_id=${params?.source_id}` }),

        //notes
        getAllNotes: builder.query({ query: (params) => `note?source=${params?.source}&source_id=${params?.source_id}` }),
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
    useDeleteLeadMutation,

    //files
    useGetAllFilesQuery,

    //notes
    useGetAllNotesQuery

} = crmApi;