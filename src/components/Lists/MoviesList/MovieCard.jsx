import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";

import { fetchMovieDetails } from "../../../services/tmdb";

function MovieCard({ movie, onBack, onEdit, onAddMovie }) {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("about");
  const [details, setDetails] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!movie?.title) return;

    let isMounted = true;
    setDetails(null);
    setIsLoaded(false);

    fetchMovieDetails(movie.title, movie.year).then((data) => {
      if (!isMounted) return;
      if (data) {
        setDetails(data);
      }
      setIsLoaded(true);
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
  const trailerSrc =
    movie?.trailerUrl ||
    (details?.trailerKey
      ? `https://www.youtube.com/embed/${details.trailerKey}?rel=0`
      : null);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "760px",
        margin: "0 auto",
      }}
    >
      <Card
        sx={{
          padding: "28px",
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: "16px",
          boxShadow: theme.palette.custom.cardShadow,
          border: `1px solid ${theme.palette.custom.cardBorder}`,
          transition: "all 0.3s ease",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            sx={{
              flex: 1,
              borderColor: theme.palette.divider,
              color: theme.palette.text.primary,
              fontSize: "13px",
              fontWeight: 600,
              borderRadius: "8px",
              textTransform: "uppercase",
              py: "10px",
              "&:hover": {
                borderColor: theme.palette.text.secondary,
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            To Movies
          </Button>

          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={onEdit}
            sx={{
              flex: 1,
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
              fontSize: "13px",
              fontWeight: 700,
              borderRadius: "8px",
              boxShadow: "none",
              textTransform: "uppercase",
              py: "10px",
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                filter: "brightness(0.9)",
                boxShadow: "none",
              },
            }}
          >
            Edit
          </Button>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddMovie}
            sx={{
              flex: 1,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontSize: "13px",
              fontWeight: 700,
              borderRadius: "8px",
              boxShadow: "none",
              textTransform: "uppercase",
              py: "10px",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
                boxShadow: "none",
              },
            }}
          >
            Add Movie
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <Box sx={{ display: "flex", gap: 3 }}>
            <Typography
              onClick={() => setActiveTab("about")}
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color:
                  activeTab === "about"
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                borderBottom:
                  activeTab === "about"
                    ? `3px solid ${theme.palette.primary.main}`
                    : "3px solid transparent",
                pb: 1,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              About the movie
            </Typography>

            <Typography
              onClick={() => setActiveTab("trailer")}
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color:
                  activeTab === "trailer"
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                borderBottom:
                  activeTab === "trailer"
                    ? `3px solid ${theme.palette.primary.main}`
                    : "3px solid transparent",
                pb: 1,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Movie trailer
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: "12px",
              color: theme.palette.text.secondary,
              pb: 1,
            }}
          >
            Updated at: {movie?.updatedAt || "13-08-2024 14:46"}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: theme.palette.divider, mb: 3 }} />

        {activeTab === "about" && (
          <Box
            sx={{
              display: "flex",
              gap: 4,
              alignItems: "flex-start",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box
              component="img"
              src={posterUrl}
              alt={movie?.title || "Movie Poster"}
              sx={{
                width: { xs: "100%", sm: "220px" },
                height: { xs: "auto", sm: "330px" },
                maxHeight: "360px",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow: "0px 6px 16px rgba(0,0,0,0.2)",
                flexShrink: 0,
              }}
            />

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  color: theme.palette.text.primary,
                }}
              >
                {movie?.title || "Untitled Movie"}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.2,
                  mb: 3,
                  "& p": {
                    fontSize: "15px",
                    color: theme.palette.text.primary,
                    margin: 0,
                  },
                  "& b": {
                    color: theme.palette.text.secondary,
                    marginRight: "6px",
                  },
                }}
              >
                <Typography>
                  <b>Movie year:</b> {movie?.year || "—"}
                </Typography>
                <Typography>
                  <b>Genre:</b> {movie?.genre || "—"}
                </Typography>
                <Typography>
                  <b>Studios:</b> {studiosText}
                </Typography>
                <Typography>
                  <b>Directors:</b> {directors}
                </Typography>
                <Typography>
                  <b>Actors:</b> {actors}
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: theme.palette.text.secondary,
                }}
              >
                {overview}
              </Typography>
            </Box>
          </Box>
        )}

        {/* ТРЕЙЛЕР */}
        {activeTab === "trailer" &&
          (trailerSrc ? (
            <Box
              sx={{
                position: "relative",
                width: "100%",
                paddingTop: "56.25%",
                backgroundColor: "#000",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Box
                component="iframe"
                src={trailerSrc}
                title={`${movie?.title || "Movie"} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "240px",
                borderRadius: "10px",
                backgroundColor: theme.palette.custom.surfaceAlt,
                border: `1px solid ${theme.palette.custom.itemBorder}`,
              }}
            >
              <Typography sx={{ color: theme.palette.text.secondary }}>
                {isLoaded ? "Trailer not found" : "Loading trailer…"}
              </Typography>
            </Box>
          ))}
      </Card>
    </Box>
  );
}

export default MovieCard;
