export type Movie = {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export type MoviesResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

export type SortBy =
    | "popularity.asc" | "popularity.desc"
    | "release_date.asc" | "release_date.desc"
    | "revenue.asc" | "revenue.desc"
    | "primary_release_date.asc" | "primary_release_date.desc"
    | "title.asc" | "title.desc"
    | "vote_average.asc" | "vote_average.desc"
    | "vote_count.asc" | "vote_count.desc";

export type DiscoverMovieParams = {
    sort_by?: SortBy;
    page?: number;

    include_adult?: boolean;
    include_video?: boolean;
    language?: string;
    region?: string;

    primary_release_year?: number;
    "primary_release_date.gte"?: string;
    "primary_release_date.lte"?: string;

    "vote_average.gte"?: number;
    "vote_average.lte"?: number;
    "vote_count.gte"?: number;

    with_genres?: string;
    without_genres?: string;
}