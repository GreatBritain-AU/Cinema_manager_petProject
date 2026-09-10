import { MovieCreationRounded } from "@mui/icons-material";
import "./MovieCard.css";

function MovieDetails() {
  return (
    <div className="movie-details">
      <h1 className="movie-title">Title</h1>

      <div className="movie-content">
        <div className="movie-poster">
          Movie img
        </div>

        <div className="movie-info">
          <h2>Movie definition</h2>

          <p>
            <span>Stars</span>
            Tom Hanks, Brad Pitt
          </p>

          <p>
            <span>Director</span>
            Christopher Nolan
          </p>

          <p>
            <span>Studio</span>
            Warner Bros.
          </p>

          <p>
            <span>Poster</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;