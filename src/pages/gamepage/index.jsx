import { useParams } from "react-router";
import Chatbox from "../../components/Chatbox";
import useFetchSolution from "../../hook/useFetchSolution";

export default function GamePage() {
  const { id } = useParams();

  const initialUrl = `https://api.rawg.io/api/games/${id}?key=99f68e36476944c2b38238304f43349d`;
  const { data, loading, error } = useFetchSolution(initialUrl);

  if (loading) return <p>Loading...</p>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="style-gamepage">
      <div className="style-game-info">
        <p>{data?.released}</p>
        <h2>{data?.name}</h2>
        <p>Rating: {data?.rating}</p>
        <p>About:</p>
        <p>{data?.description_raw}</p>
      </div>

      <div className="style-game-image">
        <img src={data?.background_image} alt={data?.name} />
      </div>

      <div className="style-chatbox">
        <Chatbox data={data} />
      </div>
    </div>
  );
}