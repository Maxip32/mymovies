import { useSearchParams } from "react-router-dom";
import { MoviesGrid } from "../components/MoviesGrid";
import { useDebounce } from "../hooks/useDebounce";
import { NavBar } from "../components/NavBar";

export function Home() {
  const [query] = useSearchParams();
  const search = query.get("search");

  const debouncedSearch = useDebounce(search, 300);
  return (
    <div>
      <NavBar />
      <MoviesGrid key={debouncedSearch} search={debouncedSearch} />
    </div>
  );
}
