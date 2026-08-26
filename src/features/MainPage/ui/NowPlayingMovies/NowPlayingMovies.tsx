import styles from "@/features/MainPage/ui/MainPage.module.css";
import {useFetchNowPlayingMoviesQuery} from "@/features/MainPage/api/MoviesApi.ts";
import {MovieCard} from "@/common/components/MovieCard/MovieCard.tsx";
import {MovieCardSkeleton} from "@/common/components/MovieCard/MovieCardSkeleton.tsx";

export const NowPlayingMovies = () => {
    const {data: NowPlayingMovies, isLoading} = useFetchNowPlayingMoviesQuery({page:1, region: 'US', language: "en-US"});

    return (
        <>
            <section className={styles.movieSection}>
                <h2 className={styles.sectionTitle}>Now Playing Movies
                </h2>
                <div className={styles.movieGrid}>
                    {isLoading && Array.from({length: 5}, (_, index) => <MovieCardSkeleton key={index}/>)}
                    {NowPlayingMovies?.results.slice(0,5).map((movie) => {
                        return (
                            <MovieCard movie={movie}/>
                        )
                    })}
                </div>
            </section>
        </>
    )
}
