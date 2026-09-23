
import Header from './components/Header/Header.jsx';
import Main from './components/Main/Main.jsx';
import MovieCard from './components/MovieCard/MovieCard.jsx';
import Footer from './components/Footer/Footer.jsx';
import Box from "@mui/material/Box";
import MovieCard from "./components/MovieCard/MovieCard.jsx";

import './App.css'

function App() {

  return (
    <Box 
      sx={{
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    "& > div:first-of-type": {
      flexGrow: 0,
    },
  }}
    >
      <Header />
      <Main>
      <MovieCard />
      </Main>
      <Footer />
    </Box>
  )
}

export default App
