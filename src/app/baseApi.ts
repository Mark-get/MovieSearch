import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'kinopoisk',

    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,

        prepareHeaders: (headers) => {
            headers.set(
                'Authorization',
                `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`
            )
            return headers
        },
    }),

    endpoints: () => ({}),
})