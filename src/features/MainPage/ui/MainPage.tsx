import styles from "./MainPage.module.css";
import {PopularMoviesPage} from "@/features/MainPage/ui/PopularMovies/PopularMovies.tsx";
import {TopRatedMovies} from "@/features/MainPage/ui/TopRatedMovies/TopRatedMovies.tsx";
import {UpcomingMovies} from "@/features/MainPage/ui/UpcomingMovies/UpcomingMovies.tsx";
import {NowPlayingMovies} from "@/features/MainPage/ui/NowPlayingMovies/NowPlayingMovies.tsx";
import {RandomMovie} from "@/features/RandomMovie/RandomMovie.tsx";
import {Link} from "react-router-dom";

export const MainPage = () => {

    return (
        <main className={styles.page}>
            <RandomMovie/>
            <Link to={"/movies"}>View more</Link>
            <PopularMoviesPage/>
            <Link to={"/movies"}>View more</Link>
            <TopRatedMovies/>
            <Link to={"/movies"}>View more</Link>
            <UpcomingMovies/>
            <Link to={"/movies"}>View more</Link>
            <NowPlayingMovies/>
        </main>
    )
}