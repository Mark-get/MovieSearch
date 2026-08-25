import {Route, Routes} from "react-router-dom";
import {Path} from "@/common/routing/routing.ts";
import {MainPage} from "@/features/MainPage/ui/MainPage.tsx";
import {CategoryMovies} from "@/features/CategoryMovies/ui/CategoryMovies.tsx";
import {FavoriteMovies} from "@/features/FavoriteMovies/ui/FavoriteMovies.tsx";
import {NotFound} from "@/common/components/NotFound/NotFound.tsx";
import {FilteredMovies} from "@/features/FilteredMovies/ui/FilteredMovies.tsx";
import {MovieSearch} from "@/common/components/MovieSearch/MovieSearch.tsx";
import {MovieDetails} from "@/features/MainPage/ui/MovieDetailsPage/MovieDetailsPage.tsx";

export const Routing = () => {
    return (
        <>
            <Routes>
                <Route path={Path.Main} element={<MainPage />} />
                <Route path={Path.CategoryMovies} element={<CategoryMovies />} />
                <Route path={Path.FilteredMovies} element={<FilteredMovies />} />
                <Route path={Path.Search} element={<MovieSearch />} />
                <Route path={Path.FavouritesMovies} element={< FavoriteMovies/>} />
                <Route path={Path.MovieDetails} element={< MovieDetails/>} />
                <Route path={Path.NotFound} element={< NotFound/>} />
            </Routes>
        </>
    )
}