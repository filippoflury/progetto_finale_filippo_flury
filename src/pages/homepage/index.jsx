import { useEffect, useState } from "react";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";
export default function HomePage() {

    const initialUrl = "https://api.rawg.io/api/games?key=99f68e36476944c2b38238304f43349d&dates=2024-01-01,2024-12-31&page=1"
    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

    return (
        <>
            <h1>Home Page</h1>
            <div className="grid-games-list">
                {error && <article>{error}</article>}
                {data && data.results.map((game) => (
                    <CardGame key={game.id} game={game} />
                ))}
            </div>
            
        </>
    );
}