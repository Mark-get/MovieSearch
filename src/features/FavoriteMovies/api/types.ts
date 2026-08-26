import type {Movie} from "@/features/MainPage/api/MoviesApi.types.ts";

export type MovieCardResponse = {
    status_code: number;
    status_message: string;
}

export type AccountDetails = {
    id: number;
    name: string;
    username: string;
}

export type FavouriteMoviesResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export type AccountParams = {
    session_id: string;
}

export type FavouriteMoviesParams = AccountParams & {
    account_id: number;
    page?: number;
}

export type Params = {
    account_id: number;
    session_id: string;
    movie_id: number;
}

