import { useParams } from "react-router";
import Chatbox from "../../components/Chatbox";
import useFetchSolution from "../../hook/useFetchSolution";

export default function GamePage() {
  const { id } = useParams();

  const initialUrl = `https://api.rawg.io/api/games/${id}?key=99f68e36476944c2b38238304f43349d`;
  const { data, loading, error } = useFetchSolution(initialUrl);

  if (loading) return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
  if (error) return <div className="alert alert-error"><span>{error}</span></div>;

  return (
  <div className="max-w-6xl mx-auto px-6 lg:px-12 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Left Column: Info + Image */}
    <div className="lg:col-span-2 space-y-6">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img
            src={data?.background_image}
            alt={data?.name}
            className="w-full max-h-[400px] object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold">{data?.name}</h2>
          <p className="text-sm text-gray-500">Released: {data?.released}</p>
          <p className="badge badge-success w-fit">Rating: {data?.rating}</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">About the Game</h3>
            <p className="text-base leading-relaxed">{data?.description_raw}</p>
          </div>
        </div>
      </div>
    </div>

    {/* Right Column: Chat */}
    <div className="card bg-base-200 shadow-lg h-full">
      <div className="card-body">
        <h3 className="card-title">Community Chat</h3>
        <Chatbox data={data} />
      </div>
    </div>
  </div>
);
}