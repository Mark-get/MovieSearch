import styles from "@/features/MainPage/ui/MainPage.module.css";
import {useFetchNowPlayingMoviesQuery} from "@/features/MainPage/api/MoviesApi.ts";
import {Link} from "react-router-dom";
import {IMAGE_BASE_URL} from "@/common/constants/IMAGE_BASE_URL.ts";

export const NowPlayingMovies = () => {
    const {data: NowPlayingMovies} = useFetchNowPlayingMoviesQuery({page:1, region: 'US', language: "en-US"});

    return (
        <>
            <section className={styles.movieSection}>
                <h2 className={styles.sectionTitle}>Now Playing Movies
                </h2>
                <div className={styles.movieGrid}>
                    {NowPlayingMovies?.results.slice(0,5).map((movie) => {
                        return (
                            <article className={styles.movieCard} key={movie.id}>
                                <div className={styles.posterWrapper}>
                                    <Link to={`/movie/${movie.id}`}>
                                        <img
                                            className={styles.poster}
                                            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                                            alt={movie.title}
                                        />
                                    </Link>
                                    {(movie.vote_average) >= 7 ? <span className={styles.rating}>{movie.vote_average.toFixed(1)}</span> :<span className={styles.ratingBad}>{movie.vote_average.toFixed(1)}</span> }
                                </div>
                                <h3 className={styles.movieTitle}>{movie.title}</h3>
                            </article>
                        )
                    })}
                </div>
            </section>
        </>
    )
}