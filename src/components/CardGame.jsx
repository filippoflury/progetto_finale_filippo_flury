import { Link } from "react-router";
import ToggleFavorite from "./ToggleFavorite";

export default function CardGame({ game }) {
  const genres = game.genres.map((genre) => genre.name).join(", ");
  const { background_image: image } = game;

  return (
    <div className="card bg-base-100 m-4 shadow-sm rounded-xl overflow-hidden relative">
      <figure className="relative">
        <img
          src={image}
          alt={game.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 z-10">
          <ToggleFavorite data={game} />
        </div>
      </figure>
      <div className="card-body p-4 flex flex-col">
        <h2 className="card-title flex justify-between items-center">
          {game.name}
          {/* Example of a badge - you can customize or remove */}
          {/* <div className="badge badge-secondary">NEW</div> */}
        </h2>
        <p className="text-sm text-gray-500 flex-grow">{genres}</p>
        <p className="text-xs text-gray-400">{game.released}</p>
        <div className="card-actions mt-4">
          <Link to={`/games/${game.slug}/${game.id}`} className="btn btn-primary">
            Dettagli
          </Link>
        </div>
      </div>
    </div>
  );
}