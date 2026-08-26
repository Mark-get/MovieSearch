import styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p> 2026 Kinopoisk Demo Data courtesy of TMDB.</p>
            <a href="https://github.com/Mark-get">GitHub</a>
        </footer>
    )
}
