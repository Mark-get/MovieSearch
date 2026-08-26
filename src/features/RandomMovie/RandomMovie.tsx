import {useFetchPopularMoviesQuery} from "@/features/MainPage/api/MoviesApi.ts";
import {BACKDROP_BASE_URL} from "@/common/constants/BackgroundIMAGEINMAIN.ts";
import styles from "./RandomMovie.module.css";
import {Skeleton} from "@mui/material";

export const RandomMovie = () => {
    const {data: fetch, isLoading} = useFetchPopularMoviesQuery({page:1})
    const movies = fetch?.results ?? []

    const randomMovie =
        movies[Math.floor(Math.random() * movies.length)]
    return (
        <>
            <div
                className={styles.background}
                style={{
                    backgroundImage: `url(${BACKDROP_BASE_URL}${randomMovie?.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "600px",
                }}
            >
                {isLoading && <Skeleton variant="rectangular" height={600} animation="wave"/>}
            </div>
        </>
    )
}
