import {Path} from "@/common/routing";
import {Link, NavLink} from "react-router-dom";
import logo from "@/assets/HeaderLogo/logo.svg"
import s from "./Header.module.css"
import {changeThemeModeAC, selectThemeMode} from "@/app/app-slice.ts";
import {useAppDispatch, useAppSelector} from "@/common/hooks";
import {Switch} from "@mui/material";
export const Header = () => {
    const navItems = [
        { to: Path.Main, label: 'Main' },
        { to: Path.CategoryMovies, label: 'CategoryMovies' },
        { to: Path.FilteredMovies, label: 'FilteredMovies' },
        { to: Path.Search, label: 'Search' },
        { to: Path.FavouritesMovies, label: 'Favourites' },
    ]
    const dispatch = useAppDispatch()
    const themeMode = useAppSelector(selectThemeMode)
    const changeMode = () => {
        dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
    }
    return (

        <header className={s.container}>
            <Link to={"/"}><img className={s.logo} src={logo} alt="Kinopoisk" /></Link>
            <nav>
                <ul className={s.list}>
                    {navItems.map(item => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) => `${s.link} ${isActive ? s.activeLink : ''}`}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

            </nav>
            <Switch color={"default"} onChange={changeMode}/>
        </header>
    )
}
