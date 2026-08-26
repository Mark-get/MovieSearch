import styles from "@/features/MainPage/ui/MainPage.module.css";
import {
    useFetchUpcomingMoviesQuery
} from "@/features/MainPage/api/MoviesApi.ts";
import {MovieCard} from "@/common/components/MovieCard/MovieCard.tsx";
import {MovieCardSkeleton} from "@/common/components/MovieCard/MovieCardSkeleton.tsx";

export const UpcomingMovies = () => {
    const {data: UpcomingMovies, isLoading} = useFetchUpcomingMoviesQuery({page:1, region: 'US', language: "en-US"});

    return (
        <>
            <section className={styles.movieSection}>
                <h2 className={styles.sectionTitle}>Upcoming Movies</h2>
                <div className={styles.movieGrid}>
                    {isLoading && Array.from({length: 5}, (_, index) => <MovieCardSkeleton key={index}/>)}
                    {UpcomingMovies?.results.slice(0,5).map((movie) => {
                        return (
                            <MovieCard movie={movie}/>
                        )
                    })}
                </div>
            </section>

        </>
    )
}
