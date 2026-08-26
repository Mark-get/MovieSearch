import styles from "@/features/MainPage/ui/MainPage.module.css";
import {Link} from "react-router-dom";
import {IMAGE_BASE_URL} from "@/common/constants/IMAGE_BASE_URL.ts";
import type {Movie} from "@/features/MainPage/api/MoviesApi.types.ts";
import {placeholderFilm} from "@/common/constants/zaglushkaFilm.ts";
import {addToFavorites} from "@/common/fav.ts";

type Props = {
    movie: Movie
    addToFavorites?: (movie: Movie) => void;
}

export const MovieCard = ({movie}:Props) => {
    if (!movie) {
        return null;
    }

    return (
        <>
            <article className={styles.movieCard} key={movie.id}>
                <div className={styles.posterWrapper}>
                    <button onClick={() => {addToFavorites(movie)}}>add</button>
                    <Link to={`/movie/${movie.id}`}>
                        {movie.poster_path ? <img
                            className={styles.poster}
                            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                            alt={movie.title}
                        /> : <img src={placeholderFilm} width={"226px"} height={"338px"}/>}
                    </Link>
                    {(movie.vote_average) >= 7 ? <span className={styles.rating}>{movie.vote_average.toFixed(1)}</span> :<span className={styles.ratingBad}>{movie.vote_average.toFixed(1)}</span> }
                </div>
                <h3 className={styles.movieTitle}>{movie.title}</h3>
            </article>
        </>
    )
}