import {baseApi} from "@/app/baseApi.ts";
import type {MovieCardResponse, Params} from "@/features/FavoriteMovies/api/types.ts";
import {favouriteMutationResponseSchema} from "@/common/components/zodValidation/validation.ts";

export const MoviesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addFavouriteMovie: build.mutation<MovieCardResponse, Params>({
            transformResponse: (response: unknown) => favouriteMutationResponseSchema.parse(response),
            query: ({account_id, session_id, movie_id}) => {
                return {
                    method: 'post',
                    url: `account/${account_id}/favorite`,
                    params: {
                        session_id
                    },
                    body: {
                        media_type: "movie",
                        media_id: movie_id,
                        favorite: true,
                    },
                }
            },
        }),
    }),

})

export const {useAddFavouriteMovieMutation} = MoviesApi
