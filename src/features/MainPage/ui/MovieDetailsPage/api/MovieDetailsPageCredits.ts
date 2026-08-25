import {baseApi} from "@/app/baseApi.ts";
import type {
    MovieCredits, QueryParams


} from "@/features/MainPage/ui/MovieDetailsPage/api/MovieDetailsPageTypes.ts";
import type {
 MovieDetails, MovieDetailsParams,

} from "@/features/MainPage/ui/MovieDetailsPage/api/MovieDetails.ts";
import type {MovieListResponse, ParamsSimilarMovie} from "@/features/MainPage/ui/MovieDetailsPage/api/MoviesSimilar.ts";


export const MovieDetailsPage = baseApi.injectEndpoints({
    endpoints: (build) => ({

        FetchDetailedInfo: build.query<MovieDetails, MovieDetailsParams>({
            query: ({movie_id}) => {
                return {
                    url: `movie/${movie_id}`,
                }
            },
        }),

        FetchDetailedInfoCredit: build.query<MovieCredits, QueryParams>({
            query: ({movie_id}) => {
                return {
                    url: `movie/${movie_id}/credits`,
                }
            },
        }),

        SimilarMovies: build.query<MovieListResponse, ParamsSimilarMovie>({
            query: ({movie_id}) => {
                return {
                    url: `movie/${movie_id}/similar`,
                }
            },
        }),


    }),

})

export const {useFetchDetailedInfoCreditQuery, useFetchDetailedInfoQuery, useSimilarMoviesQuery} = MovieDetailsPage