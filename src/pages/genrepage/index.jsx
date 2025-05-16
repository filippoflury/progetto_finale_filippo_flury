import { useEffect } from "react";
import { useParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";

export default function GenrePage() {
  const { genre } = useParams();

  const initialUrl = `https://api.rawg.io/api/games?key=99f68e36476944c2b38238304f43349d&dates=2024-01-01,2024-12-31&genres=${genre}&page=1`;
  const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    updateUrl(
      `https://api.rawg.io/api/games?key=99f68e36476944c2b38238304f43349d&dates=2024-01-01,2024-12-31&genres=${genre}&page=1`
    );
  }, [genre, updateUrl]);

  return (
    <>
      <h2>Welcome to {genre} page</h2>
      {loading && <p>Loading games...</p>}
      {error && <article>{error}</article>}
      <div className="grid-games-list">
        {data &&
          data.results.map((game) => <CardGame key={game.id} game={game} />)}
      </div>
    </>
  );
}