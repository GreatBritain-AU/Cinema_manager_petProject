import { useState } from "react";

import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import MovieCard from "./components/MovieCard/MovieCard.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CinemaService from "./components/CinemaService/CinemaService.jsx";

import Box from "@mui/material/Box";

import "./App.css";

function App() {
  const [showCinemaService, setShowCinemaService] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#555",
      }}
    >
      <Header />

      <Main>
        {!showCinemaService ? (
          <MovieCard
            onAddMovie={() => setShowCinemaService(true)}
            onEditMovie={() => setShowCinemaService(true)}
          />
        ) : (
          <CinemaService
            onClose={() => setShowCinemaService(false)}
            onSave={() => setShowCinemaService(false)}
          />
        )}
      </Main>

      <Footer />
    </Box>
  );
}

export default App;
