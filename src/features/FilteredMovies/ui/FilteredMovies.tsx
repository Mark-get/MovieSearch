import {LinearProgress, MenuItem, Pagination, Select, Slider} from "@mui/material";
import {useState} from "react";
import {useFetchMovieByGenreQuery, useFetchMovieFilterQuery} from "@/features/FilteredMovies/api/FilterMovies.ts";
import styles from "./FilteredMovies.module.css";
import type {SortBy} from "@/features/FilteredMovies/api/FilterMovieType.ts";
import {MovieCard} from "@/common/components/MovieCard/MovieCard.tsx";
import {MovieCardSkeleton} from "@/common/components/MovieCard/MovieCardSkeleton.tsx";

export const FilteredMovies = () => {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState<SortBy>("vote_average.desc");
    const [minRating, setMinRating] = useState(7.0);
    const [genre, setGenre] = useState<number | string>("");
    const {data:MovieFilterQuery, isFetching} = useFetchMovieFilterQuery({sort_by: sort, "vote_average.gte": minRating, page, with_genres: genre === "" ? undefined : String(genre),});
    const {data:MovieByGenre} = useFetchMovieByGenreQuery();
    return (
        <main className={styles.page}>
            <aside className={styles.filters}>
                <p className={styles.filterLabel}>Filter & sort</p>
                <h1>Discover movies</h1>

                <label className={styles.controlLabel}>
                    Sort by
                    <Select className={styles.select} value={sort} onChange={(e) => setSort(e.target.value)}>
                        <MenuItem value="popularity.desc">Popularity ↓</MenuItem>
                        <MenuItem value="popularity.asc">Popularity ↑</MenuItem>
                        <MenuItem value="vote_average.desc">Rating ↓</MenuItem>
                        <MenuItem value="vote_average.asc">Rating ↑</MenuItem>
                        <MenuItem value="primary_release_date.desc">Release date ↓</MenuItem>
                        <MenuItem value="primary_release_date.asc">Release date ↑</MenuItem>
                        <MenuItem value="title.asc">Title A–Z</MenuItem>
                        <MenuItem value="title.desc">Title Z–A</MenuItem>
                    </Select>
                </label>
                <div className={styles.ratingControl}>
                    <div className={styles.ratingHeading}>
                        <span>Minimum rating</span>
                        <strong>{minRating.toFixed(1)}</strong>
                    </div>
                    <Slider
                        size="small"
                        value={minRating}
                        onChange={(_, value) => setMinRating(value as number)}
                        aria-label="Min rating"
                        min={0}
                        max={10}
                        step={0.1}
                        valueLabelDisplay="auto"
                    />
                    <Select  value={genre}
                             onChange={(e) => setGenre(Number(e.target.value))}
                    >
                        {MovieByGenre?.genres.map((genre) => (
                            <MenuItem key={genre.id} value={genre.id}>
                                {genre.name}
                            </MenuItem>
                        ))}
                    </Select>

                </div>
            </aside>

            <section className={styles.results}>
                <h2>Movies</h2>
                {isFetching && MovieFilterQuery && <LinearProgress/>}
                <div className={styles.movieGrid}>
                    {isFetching && !MovieFilterQuery && Array.from({length: 20}, (_, index) => <MovieCardSkeleton key={index}/>)}
                    {MovieFilterQuery?.results.slice(0, 20).map((movie) => (
                        <MovieCard movie={movie}/>
                    ))}
                </div>
                <Pagination
                    className={styles.pagination}
                    page={page}
                    count={MovieFilterQuery?.total_pages ?? 1}
                    onChange={(_, selectedPage) => {
                        setPage(selectedPage);
                    }}
                />
            </section>
        </main>


    )
}
