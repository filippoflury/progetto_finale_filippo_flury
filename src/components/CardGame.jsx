import LazyLoadGameImage from "./LazyLoadGameImage";
import { Link } from "react-router";
import ToggleFavorite from "./ToggleFavorite";

export default function CardGame({ game }) {
  const genres = game.genres.map((genre) => genre.name).join(", ");
  const { background_image: image } = game;

  return (
    <article key={game.id} style={{ position: "relative" }}>
      <div style={{ position: "relative" }}>
        <LazyLoadGameImage image={image} />
        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
          <ToggleFavorite data={game} />
        </div>
      </div>
      <strong>{game.name}</strong>
      <small>{genres}</small>
      <p>{game.released}</p>
      <button>
        <Link to={`/games/${game.slug}/${game.id}`}>Dettagli</Link>
      </button>
    </article>
  );
}