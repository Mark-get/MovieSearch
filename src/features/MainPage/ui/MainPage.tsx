import styles from "./MainPage.module.css";
import {PopularMoviesPage} from "@/features/MainPage/ui/PopularMovies/PopularMovies.tsx";
import {TopRatedMovies} from "@/features/MainPage/ui/TopRatedMovies/TopRatedMovies.tsx";
import {UpcomingMovies} from "@/features/MainPage/ui/UpcomingMovies/UpcomingMovies.tsx";
import {NowPlayingMovies} from "@/features/MainPage/ui/NowPlayingMovies/NowPlayingMovies.tsx";

export const MainPage = () => {

    return (
        <main className={styles.page}>
            {/*<MovieSearch/>*/}
            <PopularMoviesPage/>
            <TopRatedMovies/>
            <UpcomingMovies/>
            <NowPlayingMovies/>
        </main>
    )
}