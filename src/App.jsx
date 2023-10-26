//import styles from "./App.module.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { MovieDetails } from "./pages/MovieDetails";
import { Home } from "./pages/Home";
import { LandingPage } from "./pages/LandingPage"

export function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      </main>
    </Router>
  );
}
