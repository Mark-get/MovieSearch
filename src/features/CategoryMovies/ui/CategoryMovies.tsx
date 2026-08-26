import {useState} from "react";
import {
    useFetchNowPlayingMoviesQuery,
    useFetchPopularMoviesQuery,
    useFetchTopRatedMoviesQuery,
    useFetchUpcomingMoviesQuery,
} from "@/features/MainPage/api/MoviesApi.ts";
import styles from "./CategoryMovies.module.css";
import {MovieCard} from "@/common/components/MovieCard/MovieCard.tsx";
import {LinearProgress} from "@mui/material";
import {MovieCardSkeleton} from "@/common/components/MovieCard/MovieCardSkeleton.tsx";

const categories = [
    {id: "popular", label: "Popular movies"},
    {id: "topRated", label: "Top rated movies"},
    {id: "upcoming", label: "Upcoming movies"},
    {id: "nowPlaying", label: "Now playing movies"},
] as const;

type Category = (typeof categories)[number]["id"];

const getPaginationItems = (currentPage: number, totalPages: number) => {
    if (totalPages <= 5) {
        return Array.from({length: totalPages}, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
        return [1, 2, 3, 4, "end-ellipsis", totalPages];
    }

    if (currentPage >= totalPages - 3) {
        return [1, "start-ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "start-ellipsis", currentPage - 1, currentPage, currentPage + 1, "end-ellipsis", totalPages];
};

export const CategoryMovies = () => {
    const [activeCategory, setActiveCategory] = useState<Category>("popular");
    const [page, setPage] = useState(1);
    const queryParams = {page, region: "US", language: "en-US"};

    const popularQuery = useFetchPopularMoviesQuery(queryParams, {skip: activeCategory !== "popular"});
    const topRatedQuery = useFetchTopRatedMoviesQuery(queryParams, {skip: activeCategory !== "topRated"});
    const upcomingQuery = useFetchUpcomingMoviesQuery(queryParams, {skip: activeCategory !== "upcoming"});
    const nowPlayingQuery = useFetchNowPlayingMoviesQuery(queryParams, {skip: activeCategory !== "nowPlaying"});

    const activeQuery = {
        popular: popularQuery,
        topRated: topRatedQuery,
        upcoming: upcomingQuery,
        nowPlaying: nowPlayingQuery,
    }[activeCategory];
    const activeLabel = categories.find((category) => category.id === activeCategory)?.label;

    const handleCategoryChange = (category: Category) => {
        setActiveCategory(category);
        setPage(1);
    };

    return (
        <main className={styles.page}>
            <nav className={styles.categories} aria-label="Movie categories">
                {categories.map((category) => (
                    <button
                        className={styles.categoryButton}
                        data-active={category.id === activeCategory}
                        key={category.id}
                        onClick={() => handleCategoryChange(category.id)}
                        type="button"
                    >
                        {category.label}
                    </button>
                ))}
            </nav>

            <section className={styles.movieSection} aria-labelledby="category-title">
                <h1 className={styles.sectionTitle} id="category-title">{activeLabel}</h1>

                {activeQuery.isFetching && activeQuery.data && <LinearProgress/>}
                {activeQuery.isError && <p className={styles.status}>Unable to load movies.</p>}

                <div className={styles.movieGrid}>
                    {activeQuery.isLoading && Array.from({length: 20}, (_, index) => <MovieCardSkeleton key={index}/>)}
                    {activeQuery.data?.results.slice(0, 20).map((movie) => (
                        <MovieCard movie={movie}/>
                    ))}
                </div>

                {activeQuery.data && (
                    <nav className={styles.pagination} aria-label="Movie pages">
                        {getPaginationItems(page, activeQuery.data.total_pages).map((item) => (
                            typeof item === "number" ? (
                                <button
                                    aria-current={item === page ? "page" : undefined}
                                    className={styles.pageButton}
                                    data-active={item === page}
                                    key={item}
                                    onClick={() => setPage(item)}
                                    type="button"
                                >
                                    {item}
                                </button>
                            ) : (
                                <span className={styles.ellipsis} key={item}>...</span>
                            )
                        ))}
                    </nav>
                )}
            </section>
        </main>
    );
};
