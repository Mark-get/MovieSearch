import {
    type ChangeEvent,
    type FormEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import {useLazyFetchAllMoviesQuery} from "@/common/components/MovieSearch/api/Search.ts";
import type {SearchMovie} from "@/common/components/MovieSearch/api/types/Search.ts";
import {IMAGE_BASE_URL} from "@/common/constants/IMAGE_BASE_URL.ts";
import styles from "./MovieSearch.module.css";
import {Link} from "react-router-dom";

export const MovieSearch = () => {
    const [searchValue, setSearchValue] = useState("")
    const [submittedSearch, setSubmittedSearch] = useState("")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [movies, setMovies] = useState<SearchMovie[]>([])
    const loadMoreRef = useRef<HTMLDivElement>(null)
    const [fetchMovies, {isFetching, isError}] = useLazyFetchAllMoviesQuery()

    const getMovies = useCallback((query: string, requestedPage: number, replaceResults = false) => {
        void fetchMovies({query, page: requestedPage, language: "en-US", include_adult: false})
            .unwrap()
            .then((response) => {
                setTotalPages(response.total_pages)
                setMovies((currentMovies) => replaceResults
                    ? response.results
                    : [...currentMovies, ...response.results.filter((movie) => !currentMovies.some(({id}) => id === movie.id))],
                );
            })
            .catch(() => {})
    }, [fetchMovies]);

    useEffect(() => {
        const sentinel = loadMoreRef.current;
        if (!sentinel || isFetching || !submittedSearch || page >= totalPages) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                const nextPage = page + 1
                setPage(nextPage);
                getMovies(submittedSearch, nextPage)
            }
        }, {rootMargin: "240px"})

        observer.observe(sentinel)
        return () => observer.disconnect()
    }, [getMovies, isFetching, page, submittedSearch, totalPages])

    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        setSearchValue(value)

        if (value === "") {
            setSubmittedSearch("")
            setPage(1)
            setTotalPages(1)
            setMovies([])
        }
    };

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedValue = searchValue.trim();

        setMovies([])
        setPage(1)
        setTotalPages(1)
        setSubmittedSearch(trimmedValue)
        if (trimmedValue) getMovies(trimmedValue, 1, true)
    };

    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <p className={styles.eyebrow}>TMDB movie finder</p>
                <form className={styles.searchForm} onSubmit={submitHandler}>
                    <input type="search" value={searchValue} onChange={inputHandler} placeholder="Enter a movie title"/>
                    <button type="submit">Search</button>
                </form>
            </section>

            {!submittedSearch && <p className={styles.message}>Enter a movie title to start searching.</p>}
            {isError && <p className={`${styles.message} ${styles.error}`}>Something went wrong. Please try again.</p>}
            {submittedSearch && !isFetching && movies.length === 0 && <p className={styles.message}>No matches for: “{submittedSearch}”.</p>}

            {movies.length > 0 && (
                <section className={styles.results}>
                    <h2>Results for “{submittedSearch}”</h2>
                    <div className={styles.movieGrid}>
                        {movies.map((movie) => (
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
                                <p className={styles.releaseYear}>{movie.release_date?.slice(0, 4) || "Release date unavailable"}</p>
                            </article>
                        ))}
                    </div>
                    <div className={styles.loadMore} ref={loadMoreRef}>
                        {isFetching && "Loading more movies..."}
                        {!isFetching && page >= totalPages && "You have reached the end of the results."}
                    </div>
                </section>
            )}

            {isFetching && movies.length === 0 && <p className={styles.message}>Loading movies...</p>}
        </main>
    );
};
