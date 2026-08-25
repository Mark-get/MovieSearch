import {MenuItem, Pagination, Select, Slider} from "@mui/material";
import {useState} from "react";
import {useFetchMovieFilterQuery} from "@/features/FilteredMovies/api/FilterMovies.ts";
import styles from "./FilteredMovies.module.css";
import {Link} from "react-router-dom";
import {IMAGE_BASE_URL} from "@/common/constants/IMAGE_BASE_URL.ts";
import type {SortBy} from "@/features/FilteredMovies/api/FilterMovieType.ts";

export const FilteredMovies = () => {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState<SortBy>("vote_average.desc");
    const [minRating, setMinRating] = useState(7.0);
    const { data } = useFetchMovieFilterQuery({sort_by: sort, "vote_average.gte": minRating, page});
    //const debouncedSearchTerm = useDebounce(sort, 500);
    //finish with debounce!!!!!!!
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
                </div>
            </aside>

            <section className={styles.results}>
                <h2>Movies</h2>
                <div className={styles.movieGrid}>
                    {data?.results.slice(0, 20).map((movie) => (
                        <article className={styles.movieCard} key={movie.id}>
                            <div className={styles.posterWrapper}>
                                <Link to={`/movie/${movie.id}`}>
                                    <img className={styles.poster} src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title}/>
                                </Link>
                                <span className={movie.vote_average >= 7 ? styles.rating : styles.ratingBad}>
                                    {movie.vote_average.toFixed(1)}
                                </span>
                            </div>
                            <h3 className={styles.movieTitle}>{movie.title}</h3>
                        </article>
                    ))}
                </div>
                <Pagination
                    className={styles.pagination}
                    page={page}
                    count={data?.total_pages ?? 1}
                    onChange={(_, selectedPage) => {
                        setPage(selectedPage);
                    }}
                />
            </section>
        </main>


    )
}
