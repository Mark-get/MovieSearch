import {
    useFetchDetailedInfoCreditQuery, useFetchDetailedInfoQuery, useSimilarMoviesQuery,

} from "@/features/MainPage/ui/MovieDetailsPage/api/MovieDetailsPageCredits.ts";
import {Link, useNavigate, useParams} from "react-router-dom";
import {IMAGE_BASE_URL} from "@/common/constants/IMAGE_BASE_URL.ts";
import styles from "./MovieDetailsPage.module.css";

export const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {data: FetchDetailedInfoCredit} = useFetchDetailedInfoCreditQuery({movie_id: Number(id)}  )
    const {data: FetchDetailedInfo} = useFetchDetailedInfoQuery({movie_id: Number(id) })
    const {data: SimilarMovies} = useSimilarMoviesQuery({movie_id: Number(id) })

    return (
        <main className={styles.page}>
            <button className={styles.backLink}  onClick={()=> navigate(-1)}>back</button>
            <section className={styles.detailsSection}>
                <img
                    className={styles.mainPoster}
                    src={`${IMAGE_BASE_URL}${FetchDetailedInfo?.poster_path}`}
                    alt={FetchDetailedInfo?.title ?? "Movie poster"}
                />
                <div className={styles.movieInfo}>
                    <p className={styles.eyebrow}>Movie details</p>
                    <h1>{FetchDetailedInfo?.title}</h1>
                    <div className={styles.meta}>
                        <span>{FetchDetailedInfo?.release_date?.slice(0, 4)}</span>
                        <span>{FetchDetailedInfo?.runtime} min</span>
                    </div>
                    <p className={styles.overview}>{FetchDetailedInfo?.overview}</p>
                    <div className={styles.genreList}>
                        {FetchDetailedInfo?.genres.map((genre) => (
                            <span className={styles.genre} key={genre.id}>{genre.name}</span>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h2>Cast</h2>
                <div className={styles.castList}>
                    {FetchDetailedInfoCredit?.cast.slice(0, 8).map((actor) => (
                        <article className={styles.castMember} key={actor.id}>
                            <img
                                className={styles.actorPhoto}
                                src={`${IMAGE_BASE_URL}${actor.profile_path}`}
                                alt={actor.name}
                            />
                            <h3>{actor.name}</h3>
                            <p>{actor.character}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <h2>Similar movies</h2>
                <div className={styles.similarGrid}>
                    {SimilarMovies?.results.map((movie) => (
                        <article className={styles.movieCard} key={movie.id}>
                            <div className={styles.posterWrapper}>
                                <Link to={`/movie/${movie.id}`}>
                                    <img
                                        className={styles.poster}
                                        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                </Link>
                                <span className={movie.vote_average >= 7 ? styles.rating : styles.ratingBad}>
                                    {movie.vote_average.toFixed(1)}
                                </span>
                            </div>
                            <h3 className={styles.movieTitle}>{movie.title}</h3>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    )
}
