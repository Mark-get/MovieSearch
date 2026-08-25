export type SearchMoviesResponse = {
    page: number;
    results: SearchMovie[];
    total_pages: number;
    total_results: number;
};

export type SearchMovie = {
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

export type SearchMoviesParams = {
    query: string;
    include_adult?: boolean;
    language?: string;
    primary_release_year?: string;
    page?: number;
    region?: string;
    year?: string;
};