import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";

export default function GenrePage() {
  const { genre } = useParams();
  const [page, setPage] = useState(1);

  const baseUrl = `https://api.rawg.io/api/games?key=99f68e36476944c2b38238304f43349d&dates=2024-01-01,2024-12-31&genres=${genre}`;
  const { data, loading, error, updateUrl } = useFetchSolution(`${baseUrl}&page=${page}`);

  useEffect(() => {
    setPage(1); 
  }, [genre]);

  useEffect(() => {
    updateUrl(`${baseUrl}&page=${page}`);
  }, [page, baseUrl, updateUrl]);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <>
      <h2 className="text-3xl font-bold mb-6 capitalize">Genre: {genre}</h2>

      {loading && <p>Loading games...</p>}
      {error && <article>{error}</article>}

      <div className="grid-games-list">
        {data && data.results.map((game) => (
          <CardGame key={game.id} game={game} />
        ))}
      </div>

      {/* pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="btn btn-outline"
        >
          Previous
        </button>
        <span className="self-center text-lg font-medium">Page {page}</span>
        <button
          onClick={handleNext}
          className="btn btn-outline"
        >
          Next
        </button>
      </div>
    </>
  );
}