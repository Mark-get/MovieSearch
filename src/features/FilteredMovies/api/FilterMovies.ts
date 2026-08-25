import {baseApi} from "@/app/baseApi.ts";
import type {DiscoverMovieParams, MoviesResponse} from "@/features/FilteredMovies/api/FilterMovieType.ts";

export const MoviesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        fetchMovieFilter: build.query<MoviesResponse, DiscoverMovieParams>({
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