import {baseApi} from "@/app/baseApi.ts";
import type {MoviesParams, MoviesResponse} from "@/features/MainPage/api/MoviesApi.types.ts";
import {moviesResponseSchema} from "@/common/components/zodValidation/validation.ts";

export const MoviesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        fetchPopularMovies: build.query<MoviesResponse, MoviesParams>({
            transformResponse: (response: unknown) => moviesResponseSchema.parse(response),
            query: (params) => {
                return {
                    url: 'movie/popular',
                    params,
                }
            },
        }),
        fetchTopRatedMovies: build.query<MoviesResponse, MoviesParams>({
            transformResponse: (response: unknown) => moviesResponseSchema.parse(response),
            query: (params) => {
                return {
                    url: 'movie/top_rated',
                    params,
                }
            },
        }),
        fetchUpcomingMovies: build.query<MoviesResponse, MoviesParams>({
            transformResponse: (response: unknown) => moviesResponseSchema.parse(response),
            query: (params) => {
                return {
                    url: 'movie/upcoming',
                    params,
                }
            },
        }),
        fetchNowPlayingMovies: build.query<MoviesResponse, MoviesParams>({
            transformResponse: (response: unknown) => moviesResponseSchema.parse(response),
            query: (params) => {
                return {
                    url: 'movie/now_playing',
                    params,
                }
            },
        }),
    }),

})

export const {
    useFetchPopularMoviesQuery,
    useFetchTopRatedMoviesQuery,
    useFetchUpcomingMoviesQuery,
    useFetchNowPlayingMoviesQuery
} = MoviesApi
