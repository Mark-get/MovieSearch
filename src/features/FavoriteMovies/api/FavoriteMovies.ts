import {baseApi} from "@/app/baseApi.ts";
import type {favoriteParams, favoriteResponse} from "@/features/FavoriteMovies/api/FavoriteMoviesApi.ts";

export const FavoriteMovies = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addFavoriteMovie: build.mutation<favoriteResponse, favoriteParams>({
            query: (body, account_id) => {
                return {
                    method: 'post',
                    url: `account/${account_id}/favorite`,
                    body
                }
            },
        }),
    }),
})

export const {useAddFavoriteMovieMutation} = FavoriteMovies