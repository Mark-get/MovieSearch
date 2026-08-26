import {baseApi} from "@/app/baseApi.ts";
import type {SearchMoviesParams, SearchMoviesResponse} from "@/common/components/MovieSearch/api/types/Search.ts";
import {moviesResponseSchema} from "@/common/components/zodValidation/validation.ts";

export const Search = baseApi.injectEndpoints({
    endpoints: (build) => ({
        fetchAllMovies: build.query<SearchMoviesResponse, SearchMoviesParams>({
            transformResponse: (response: unknown) => moviesResponseSchema.parse(response),
            query: (params) => {
                return {
                    url: 'search/movie',
                    params,
                }
            },
        }),
    }),

})

export const {
    useFetchAllMoviesQuery,
    useLazyFetchAllMoviesQuery,
} = Search
