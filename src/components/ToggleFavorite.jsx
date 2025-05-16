import { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import FavoritesContext from "../context/FavoritesContext"; // <-- Add this

export default function ToggleFavorite({ data }) {
  const { session } = useContext(SessionContext);
  const { favorites, addFavorites, removeFavorites } = useContext(FavoritesContext);

  const isFavorite = favorites.find((el) => el.game_id === data.id);

  const addFavorite = async () => {
    const { data: inserted, error } = await supabase
      .from("favorites")
      .insert([
        {
          user_id: session?.user.id,
          game_id: data.id,
          game_name: data.name,
          game_image: data.background_image,
        },
      ])
      .select();

    if (error) {
      alert(error.message);
    } else {
      addFavorites(inserted); // Use your context method
      alert("Added to favorites 👍🏻!");
    }
  };

  const removeFavorite = async () => {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("game_id", data.id)
      .eq("user_id", session?.user.id);

    if (error) {
      alert(error.message);
    } else {
      removeFavorites(data.id); // Use your context method
      alert("Removed from favorites 👎🏻");
    }
  };

  return (
    <button onClick={isFavorite ? removeFavorite : addFavorite}>
      {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
    </button>
  );
}