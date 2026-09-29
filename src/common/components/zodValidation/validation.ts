import {z} from "zod";

export const movieSchema = z.object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    genre_ids: z.array(z.number()),
    id: z.number(),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
    release_date: z.string(),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.number(),
});

export const moviesResponseSchema = z.object({
    dates: z.object({
        maximum: z.string(),
        minimum: z.string(),
    }).optional(),
    page: z.number(),
    results: z.array(movieSchema),
    total_pages: z.number(),
    total_results: z.number(),
});

export const requestTokenResponseSchema = z.object({
    request_token: z.string(),
    expires_at: z.string(),
    success: z.boolean(),
});

export const sessionResponseSchema = z.object({
    session_id: z.string(),
    success: z.boolean(),
});

export const favouriteMutationResponseSchema = z.object({
    status_code: z.number(),
    status_message: z.string(),
});

const collectionSchema = z.object({
    id: z.number(),
    name: z.string(),
    poster_path: z.string().nullable(),
    backdrop_path: z.string().nullable(),
});

const genreSchema = z.object({
    id: z.number(),
    name: z.string(),
});
export const genresResponseSchema = z.object({
    genres: z.array(genreSchema),
});
const productionCompanySchema = z.object({
    id: z.number(),
    logo_path: z.string().nullable(),
    name: z.string(),
    origin_country: z.string(),
});

const productionCountrySchema = z.object({
    iso_3166_1: z.string(),
    name: z.string(),
});

const spokenLanguageSchema = z.object({
    english_name: z.string(),
    iso_639_1: z.string(),
    name: z.string(),
});

export const movieDetailsResponseSchema = z.object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    belongs_to_collection: collectionSchema.nullable(),
    budget: z.number(),
    genres: z.array(genreSchema),
    homepage: z.string(),
    id: z.number(),
    imdb_id: z.string().nullable(),
    origin_country: z.array(z.string()),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
    production_companies: z.array(productionCompanySchema),
    production_countries: z.array(productionCountrySchema),
    release_date: z.string(),
    revenue: z.number(),
    runtime: z.number().nullable(),
    spoken_languages: z.array(spokenLanguageSchema),
    status: z.string(),
    tagline: z.string(),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.number(),
});

const creditPersonSchema = z.object({
    adult: z.boolean(),
    gender: z.number(),
    id: z.number(),
    known_for_department: z.string(),
    name: z.string(),
    original_name: z.string(),
    popularity: z.number(),
    profile_path: z.string().nullable(),
    credit_id: z.string(),
});

export const movieCreditsResponseSchema = z.object({
    id: z.number(),
    cast: z.array(creditPersonSchema.extend({
        cast_id: z.number(),
        character: z.string(),
        order: z.number(),
    })),
    crew: z.array(creditPersonSchema.extend({
        department: z.string(),
        job: z.string(),
    })),
});
