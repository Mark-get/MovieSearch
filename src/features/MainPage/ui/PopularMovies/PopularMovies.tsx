import styles from "@/features/MainPage/ui/MainPage.module.css";

import {useFetchPopularMoviesQuery} from "@/features/MainPage/api/MoviesApi.ts";
import {MovieCard} from "@/common/components/MovieCard/MovieCard.tsx";
import {MovieCardSkeleton} from "@/common/components/MovieCard/MovieCardSkeleton.tsx";

export const PopularMoviesPage = () => {

    const {data: popularMovies, isLoading} = useFetchPopularMoviesQuery({page:1, region: 'US', language: "en-US"});

    return (
        <>
            <section className={styles.movieSection}>
                <h2 className={styles.sectionTitle}>Popular movies</h2>
                <div className={styles.movieGrid}>
                    {isLoading && Array.from({length: 5}, (_, index) => <MovieCardSkeleton key={index}/>)}
                    {popularMovies?.results.slice(0,6).map((movie) => {
                        return (
                            <MovieCard movie={movie}/>
                        )
                    })}
                </div>
            </section>
        </>
    )
}