import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Config } from '../constants/Index';

const TAG_TYPES = {  }

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
        loginUser : builder.mutation({ query:(data)=> ({ url : 'user/login', method : "POST", body : data  }) })
    }),

});

export const {
    //users
    useLoginUserMutation
    
} = crmApi;