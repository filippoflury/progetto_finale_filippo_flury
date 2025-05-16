import { useContext } from "react";
import SessionContext from "../../context/SessionContext";
import FavoritesContext from "../../context/FavoritesContext";
import { FaTrashAlt } from "react-icons/fa";

export default function ProfilePage() {
  const { session } = useContext(SessionContext);
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">
        Ciao 👋🏻 {session?.user.user_metadata.first_name}
      </h2>

      <h3 className="text-xl font-semibold mb-6 text-base-content/80">
        Questi sono i tuoi giochi preferiti:
      </h3>

      {favorites.length === 0 ? (
        <div className="text-base-content/70 italic">
          Non hai ancora aggiunto giochi ai preferiti.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((game) => (
            <div
              key={game.game_id}
              className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <figure className="h-48 overflow-hidden">
                <img
                  src={game.game_image}
                  alt={game.game_name}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body p-4 flex flex-col">
                <h2 className="card-title text-lg">{game.game_name}</h2>
                {game.released && (
                  <p className="text-xs text-gray-500 mb-2">Rilasciato: {game.released}</p>
                )}
                <div className="mt-auto">
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => removeFavorite(game.game_id)}
                    title="Rimuovi dai preferiti"
                  >
                    <FaTrashAlt />
                    <span className="hidden sm:inline ml-1">Rimuovi</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}