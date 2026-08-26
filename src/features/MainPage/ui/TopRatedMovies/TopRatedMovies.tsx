import styles from "@/features/MainPage/ui/MainPage.module.css";
import {useFetchTopRatedMoviesQuery} from "@/features/MainPage/api/MoviesApi.ts";
import {MovieCard} from "@/common/components/MovieCard/MovieCard.tsx";
import {MovieCardSkeleton} from "@/common/components/MovieCard/MovieCardSkeleton.tsx";

export const TopRatedMovies = () => {
    const {data: TopRatedMovies, isLoading} = useFetchTopRatedMoviesQuery({page:1, region: 'US', language: "en-US"});

    return (
        <>
            <section className={styles.movieSection}>
                <h2 className={styles.sectionTitle}>Top Rated Movies</h2>
                <div className={styles.movieGrid}>
                    {isLoading && Array.from({length: 5}, (_, index) => <MovieCardSkeleton key={index}/>)}
                    {TopRatedMovies?.results.slice(0,6).map((movie) => {
                        return (
                            <MovieCard movie={movie}/>
                        )
                    })}
                </div>
            </section>

        </>
    )
}
