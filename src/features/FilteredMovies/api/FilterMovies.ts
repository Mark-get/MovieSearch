import {baseApi} from "@/app/baseApi.ts";
import type {DiscoverMovieParams, MoviesResponse} from "@/features/FilteredMovies/api/FilterMovieType.ts";
import {moviesResponseSchema} from "@/common/components/zodValidation/validation.ts";

export const MoviesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        fetchMovieFilter: build.query<MoviesResponse, DiscoverMovieParams>({
            transformResponse: (response: unknown) => moviesResponseSchema.parse(response),
            query: (params) => {
                return {
                    url: 'discover/movie',
                    params: params
                }
            },
        }),
    }),

})

export const {useFetchMovieFilterQuery} = MoviesApi
