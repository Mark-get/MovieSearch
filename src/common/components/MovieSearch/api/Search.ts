import {baseApi} from "@/app/baseApi.ts";
import type {SearchMoviesParams, SearchMoviesResponse} from "@/common/components/MovieSearch/api/types/Search.ts";

export const Search = baseApi.injectEndpoints({
    endpoints: (build) => ({
        fetchAllMovies: build.query<SearchMoviesResponse, SearchMoviesParams>({
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
