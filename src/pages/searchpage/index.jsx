import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import CardGame from '../../components/CardGame';
import useFetchSolution from '../../hook/useFetchSolution';

export default function SearchPage() {
    let [searchParams] = useSearchParams();
    const game = searchParams.get("query");

    const initialUrl = `https://api.rawg.io/api/games?key=99f68e36476944c2b38238304f43349d&search=${game}`;
    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        updateUrl(initialUrl);
    }, [initialUrl, updateUrl]);

    return (
        <div className="container">
            <h1>Risultati per: {game} game</h1>
            {loading && <p>Loading...</p>}
            {error && <h2>{error}</h2>}
            <div>
                {data && data.results.map((game) => <CardGame key={game.id} game={game} />)}
            </div>
        </div>
    );
}