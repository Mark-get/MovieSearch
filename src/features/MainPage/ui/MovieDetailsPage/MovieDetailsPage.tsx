import {
    useFetchDetailedInfoCreditQuery, useFetchDetailedInfoQuery, useSimilarMoviesQuery,

} from "@/features/MainPage/ui/MovieDetailsPage/api/MovieDetailsPageCredits.ts";
import { useNavigate, useParams} from "react-router-dom";
import {IMAGE_BASE_URL} from "@/common/constants/IMAGE_BASE_URL.ts";
import styles from "./MovieDetailsPage.module.css";
import {MovieCard} from "@/common/components/MovieCard/MovieCard.tsx";
import {Skeleton} from "@mui/material";
import {MovieCardSkeleton} from "@/common/components/MovieCard/MovieCardSkeleton.tsx";

export const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {data: FetchDetailedInfoCredit, isLoading: isCreditsLoading} = useFetchDetailedInfoCreditQuery({movie_id: Number(id)}  )
    const {data: FetchDetailedInfo, isLoading: isDetailsLoading} = useFetchDetailedInfoQuery({movie_id: Number(id) })
    const {data: SimilarMovies, isLoading: areSimilarMoviesLoading} = useSimilarMoviesQuery({movie_id: Number(id) })

    return (
        <main className={styles.page}>
            <button className={styles.backLink}  onClick={()=> navigate(-1)}>back</button>
            <section className={styles.detailsSection}>
                {isDetailsLoading ? (
                    <Skeleton className={styles.mainPoster} variant="rounded" animation="wave"/>
                ) : (
                    <img
                        className={styles.mainPoster}
                        src={`${IMAGE_BASE_URL}${FetchDetailedInfo?.poster_path}`}
                        alt={FetchDetailedInfo?.title ?? "Movie poster"}
                    />
                )}
                <div className={styles.movieInfo}>
                    <p className={styles.eyebrow}>Movie details</p>
                    <h1>{isDetailsLoading ? <Skeleton width="70%"/> : FetchDetailedInfo?.title}</h1>
                    <div className={styles.meta}>
                        <span>{FetchDetailedInfo?.release_date?.slice(0, 4)}</span>
                        <span>{FetchDetailedInfo?.runtime} min</span>
                    </div>
                    <div className={styles.overview}>
                        {isDetailsLoading
                            ? <><Skeleton/><Skeleton/><Skeleton width="75%"/></>
                            : FetchDetailedInfo?.overview}
                    </div>
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
                    {isCreditsLoading && Array.from({length: 8}, (_, index) => (
                        <article className={styles.castMember} key={index}>
                            <Skeleton className={styles.actorPhoto} variant="rounded"/>
                            <Skeleton width="75%"/>
                            <Skeleton width="55%"/>
                        </article>
                    ))}
                    {FetchDetailedInfoCredit?.cast.slice(0, 6).map((actor) => (
                        <article className={styles.castMember} key={actor.id}>
                            {actor.profile_path ?  <img
                                className={styles.actorPhoto}
                                src={`${IMAGE_BASE_URL}${actor.profile_path}`}
                                alt={actor.name}
                            /> : "no picture"}

                            <h3>{actor.name}</h3>
                            <p>{actor.character}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <h2>Similar movies</h2>
                <div className={styles.similarGrid}>
                    {areSimilarMoviesLoading && Array.from({length: 5}, (_, index) => <MovieCardSkeleton key={index}/>)}
                    {SimilarMovies?.results.map((movie) => (
                        <MovieCard movie={movie}/>
                    ))}
                </div>
            </section>
        </main>
    )
}
