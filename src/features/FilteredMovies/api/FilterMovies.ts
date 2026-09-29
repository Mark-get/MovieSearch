import {baseApi} from "@/app/baseApi.ts";
import type {DiscoverMovieParams, MoviesResponse} from "@/features/FilteredMovies/api/FilterMovieType.ts";
import {genresResponseSchema, moviesResponseSchema} from "@/common/components/zodValidation/validation.ts";
import type {GenresResponse} from "@/features/FilteredMovies/api/MovieByGenres.ts";

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
        fetchMovieByGenre: build.query<GenresResponse, void>({
            transformResponse: (response: unknown) => genresResponseSchema.parse(response),
            query: (params) => {
                return {
                    url:'genre/movie/list',
                    params: {
                        language: params
                    }
                }
            },
        }),
    }),

})

export const {useFetchMovieFilterQuery, useFetchMovieByGenreQuery} = MoviesApi