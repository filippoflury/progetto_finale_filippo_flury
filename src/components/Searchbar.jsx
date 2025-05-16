import { useState } from "react";
import { useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";

export default function Searchbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [ariaInvalid, setAriaInvalid] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${search}`);
      setSearch("");
    } else {
      setAriaInvalid(true);
    }
  };

  return (
    <form onSubmit={handleSearch} className="grid grid-cols-4 w-full overflow-hidden rounded-xl">
  <input
    type="text"
    name="search"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder={ariaInvalid ? "Cerca qualcosa..." : "Cerca un gioco..."}
    aria-invalid={ariaInvalid}
    className="col-span-3 px-4 py-3 text-base bg-base-200 text-base-content placeholder:text-base-content/60 focus:outline-none rounded-l-xl"
  />
  <button
    type="submit"
    className="col-span-1 flex items-center justify-center px-4 py-3 bg-lime-500 text-white hover:bg-lime-600 transition-colors rounded-r-xl"
  >
    <FaSearch className="text-lg" />
  </button>
</form>
  );
}