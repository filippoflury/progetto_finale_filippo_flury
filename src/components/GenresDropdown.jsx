import { useEffect, useState } from "react";
import {Link} from 'react-router';
import useFetchSolution from "../hook/useFetchSolution";

export default function GenresDropdown() {
    const [genres, setGenres] = useState({ results: [] });


    const initialUrl = "https://api.rawg.io/api/genres?key=99f68e36476944c2b38238304f43349d";
    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

    const load = async () => {
        try {
            const response = await fetch(initialUrl);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setGenres(json);
        } catch (error) {
            setError(error.message);
            setGenres({ results: [] });
        }
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <details className="dropdown">
            <summary>Genres</summary>
            {error && <small>{error}</small>}
            <ul>
                {genres.results.map((genre) => (
                    <li key={genre.id}>
                        <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
                    </li>
                ))}
            </ul>
        </details>
    );
}