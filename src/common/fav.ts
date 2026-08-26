import type { Movie } from "@/features/MainPage/api/MoviesApi.types.ts"

export const addToFavorites = (movie: Movie) => {
    const favorites: Movie[] = JSON.parse(
        localStorage.getItem("favorites") || "[]"
    )

    const alreadyExists = favorites.some(
        favorite => favorite.id === movie.id
    )

    if (alreadyExists) {
        return
    }

    const updatedFavorites = [...favorites, movie]

    localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
    )
}