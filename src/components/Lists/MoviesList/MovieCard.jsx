import { useEffect, useState } from "react";

import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Card, Divider, Typography } from "@mui/material";

import { fetchMovieDetails } from "../../../services/tmdb";

function MovieCard({ movie, onBack, onEdit, onAddMovie }) {
  const [activeTab, setActiveTab] = useState("about");
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!movie?.title) return;

    let isMounted = true;
    fetchMovieDetails(movie.title, movie.year).then((data) => {
      if (isMounted && data) {
        setDetails(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [movie?.title, movie?.year]);

  const posterUrl =
    details?.poster ||
    movie?.poster ||
    "https://via.placeholder.com/240x360?text=No+Poster";
  const directors =
    details?.directors ||
    (Array.isArray(movie?.directors)
      ? movie.directors.join(", ")
      : movie?.directors) ||
    "—";
  const actors =
    (details?.cast && details.cast.map((a) => a.name).join(", ")) ||
    (Array.isArray(movie?.actors) ? movie.actors.join(", ") : movie?.actors) ||
    "—";
  const studiosText = details?.studios || movie?.studios || "—";
  const overview =
    details?.overview || movie?.description || "No description available.";

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "680px",
        margin: "0 auto",
      }}
    >
      <Card
        sx={{
          padding: "24px",
          backgroundColor: "#242424",
          color: "white",
          borderRadius: "8px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
          height: "auto",
        }}
      >
        <Box sx={{ display: "flex", gap: "15px", mb: 4 }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            sx={{
              flex: 1,
              backgroundColor: "#29abe2",
              color: "#111",
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px",
            }}
          >
            TO MOVIES
          </Button>

          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={onEdit}
            sx={{
              flex: 1,
              backgroundColor: "#ffad22",
              color: "#111",
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px",
            }}
          >
            EDIT
          </Button>

          <Button
            variant="contained"
            startIcon={<AddBoxIcon />}
            onClick={onAddMovie}
            sx={{
              flex: 1,
              backgroundColor: "#63c568",
              color: "#111",
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px",
            }}
          >
            ADD MOVIE
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", gap: 3 }}>
            <Typography
              onClick={() => setActiveTab("about")}
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: activeTab === "about" ? "#29abe2" : "#888",
                borderBottom:
                  activeTab === "about"
                    ? "3px solid #29abe2"
                    : "3px solid transparent",
                pb: 1,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              ABOUT THE MOVIE
            </Typography>

            <Typography
              onClick={() => setActiveTab("trailer")}
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: activeTab === "trailer" ? "#29abe2" : "#888",
                borderBottom:
                  activeTab === "trailer"
                    ? "3px solid #29abe2"
                    : "3px solid transparent",
                pb: 1,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              MOVIE TRAILER
            </Typography>
          </Box>

          <Typography sx={{ fontSize: "12px", color: "#666", pb: 1 }}>
            Updated at: {movie?.updatedAt || "13-08-2024 14:46"}
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: "#333", mb: 3 }} />

        {activeTab === "about" && (
          <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
            <Box
              component="img"
              src={posterUrl}
              alt={movie?.title || "Movie Poster"}
              sx={{
                width: "240px",
                height: "360px",
                objectFit: "cover",
                borderRadius: "4px",
                backgroundColor: "#222",
                flexShrink: 0,
              }}
            />

            <Box sx={{ flex: 1, minWidth: 0, height: "auto" }}>
              <Typography
                sx={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  mb: 1.5,
                  lineHeight: 1.1,
                }}
              >
                {movie?.title || "Untitled Movie"}
              </Typography>

              <Typography sx={{ fontSize: "16px", mb: 1.5, color: "#fff" }}>
                <b>Movie year:</b> {movie?.year || "—"}
              </Typography>

              <Typography sx={{ fontSize: "16px", mb: 3, color: "#fff" }}>
                <b>Genre:</b> {movie?.genre || "—"}
              </Typography>

              <Typography sx={{ fontSize: "16px", mb: 3, color: "#fff" }}>
                <b>Studios:</b>{" "}
                <span style={{ borderBottom: "1px dashed #fff" }}>
                  {studiosText}
                </span>
              </Typography>

              <Typography sx={{ fontSize: "16px", mb: 3, color: "#fff" }}>
                <b>Directors:</b>{" "}
                <span style={{ borderBottom: "1px dashed #fff" }}>
                  {directors}
                </span>
              </Typography>

              <Typography sx={{ fontSize: "16px", mb: 4, color: "#fff" }}>
                <b>Actors:</b>{" "}
                <span style={{ borderBottom: "1px dashed #fff" }}>
                  {actors}
                </span>
              </Typography>

              <Typography
                sx={{
                  fontSize: "15px",
                  lineHeight: 1.6,
                  textAlign: "justify",
                  color: "#e0e0e0",
                  whiteSpace: "normal",
                  overflow: "visible",
                }}
              >
                {overview}
              </Typography>
            </Box>
          </Box>
        )}

        {activeTab === "trailer" && (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%",
              backgroundColor: "#000",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <Box
              component="iframe"
              src={
                movie?.trailerUrl || "https://www.youtube.com/embed/NmzuHjWmXOc"
              }
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </Box>
        )}
      </Card>
    </Box>
  );
}

export default MovieCard;
