import {baseApi} from "@/app/baseApi.ts";
import type {
    MovieCredits, QueryParams


} from "@/features/MainPage/ui/MovieDetailsPage/api/MovieDetailsPageTypes.ts";
import type {
 MovieDetails, MovieDetailsParams,

} from "@/features/MainPage/ui/MovieDetailsPage/api/MovieDetails.ts";
import type {MovieListResponse, ParamsSimilarMovie} from "@/features/MainPage/ui/MovieDetailsPage/api/MoviesSimilar.ts";
import {
    movieCreditsResponseSchema,
    movieDetailsResponseSchema,
    moviesResponseSchema,
} from "@/common/components/zodValidation/validation.ts";


export const MovieDetailsPage = baseApi.injectEndpoints({
    endpoints: (build) => ({

        FetchDetailedInfo: build.query<MovieDetails, MovieDetailsParams>({
            transformResponse: (response: unknown) => movieDetailsResponseSchema.parse(response),
            query: ({movie_id}) => {
                return {
                    url: `movie/${movie_id}`,
                }
            },
        }),

        FetchDetailedInfoCredit: build.query<MovieCredits, QueryParams>({
            transformResponse: (response: unknown) => movieCreditsResponseSchema.parse(response),
            query: ({movie_id}) => {
                return {
                    url: `movie/${movie_id}/credits`,
                }
            },
        }),

        SimilarMovies: build.query<MovieListResponse, ParamsSimilarMovie>({
            transformResponse: (response: unknown) => moviesResponseSchema.parse(response),
            query: ({movie_id}) => {
                return {
                    url: `movie/${movie_id}/similar`,
                }
            },
        }),


    }),

})

export const {useFetchDetailedInfoCreditQuery, useFetchDetailedInfoQuery, useSimilarMoviesQuery} = MovieDetailsPage
