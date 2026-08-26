import type {Movie} from "@/features/MainPage/api/MoviesApi.types.ts";
import {MovieCard} from "@/common/components/MovieCard/MovieCard.tsx";
import s from './FavoriteMovies.module.css'
import {useState} from "react";
export const FavoriteMovies = () => {

    const [favorites, setFavorites] = useState<Movie[]>(() => {
        return JSON.parse(localStorage.getItem("favorites") || "[]")
    })

    const removeFavorite = (movieId: number) => {
        const updatedFavorites = favorites.filter(
            movie => movie.id !== movieId
        )

        setFavorites(updatedFavorites)

        localStorage.setItem(
            "favorites",
            JSON.stringify(updatedFavorites)
        )
    }
    const addFavorite = (movie: Movie) => {
        setFavorites(prev => {
            const alreadyExists = prev.some(
                favorite => favorite.id === movie.id
            )

            if (alreadyExists) {
                return prev
            }

            const updatedFavorites = [...prev, movie]

            localStorage.setItem(
                "favorites",
                JSON.stringify(updatedFavorites)
            )

            return updatedFavorites
        })
    }

    return (
        <>
            <div className={s.box}>
            {favorites.map((movie) => (
                <><MovieCard
                    key={movie.id}
                    movie={movie}
                    addToFavorites={addFavorite}/>

                    <button onClick={() => {
                        removeFavorite(movie.id);
                    }}>delete</button>
                </>
            ))}

            </div>
        </>
    )
}