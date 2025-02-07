import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Config } from '../constants/Index';

const TAG_TYPES = {}

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

    tagTypes: [],

    endpoints: (builder) => ({
        //users
        loginUser: builder.mutation({ query: (data) => ({ url: 'user/login', method: "POST", body: data }) }),

        //leads
        getAllLeads: builder.query({ query: () => 'lead' }),
        getLead: builder.query({ query: (id) => `lead/${id}` }),

        //files 
        getAllFiles: builder.query({ query: (params) => `file?source=${params?.source}&source_id=${params?.source_id}` }),

        //notes
        getAllNotes: builder.query({ query: (params) => `note?source=${params?.source}&source_id=${params?.source_id}` }),
    }),

});

export const {
    //users
    useLoginUserMutation,

    //leads
    useGetAllLeadsQuery,
    useGetLeadQuery,

    //files
    useGetAllFilesQuery,

    //notes
    useGetAllNotesQuery

} = crmApi;