import Link from "next/link";
import styles from "../../styles/home.module.css";
import { Metadata } from "next";
import Movie from "./components/movie";

export const metadata: Metadata = {
    title: 'Home'
}

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // 위 3줄과 마지막 1줄은 똑같음.
    // const response = await fetch(URL);
    // const json = await response.json();
    // return json;
    return fetch(API_URL).then(response => response.json());
}

export default async function Page() {
    /* React version
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const getMovies = async () => {
        const response = await fetch("https://nomad-movies.nomadcoders.workers.dev/movies")
        const json = await response.json();
        setMovies(json);
        setIsLoading(false);
    }
    useEffect(() => {
        getMovies();
    }, []);
    {isLoading ? "Loading..." : JSON.stringify(movies)}
    */
    const movies = await getMovies();
    return (
        <div className={styles.container}>
            {movies.map(movie => (
                <Movie
                    key={movie.id}
                    id={movie.id}
                    poster_path={movie.poster_path}
                    title={movie.title}
                />
            ))}
        </div>
    );
}