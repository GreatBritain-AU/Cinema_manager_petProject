import Box from "@mui/material/Box";

import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import MovieCard from "./components/Lists/MoviesList/MovieCard.jsx";
import Main from "./components/Main/Main.jsx";

import "./App.css";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Main>
        <MovieCard />
      </Main>
      <Footer />
    </Box>
  );
}

export default App;
