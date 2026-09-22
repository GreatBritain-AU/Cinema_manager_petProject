import React, { useState } from "react";

import MovieIcon from "@mui/icons-material/Movie";
import { Box, Button, Pagination, Typography } from "@mui/material";

import ListRow from "../../Common/ListRow";

const initialMovies = [
  // 2000
  {
    id: "1",
    title: "Gladiator",
    year: "2000",
    genre: "Action, Drama",
    poster: "/images/gladiator.jpg",
  },
  {
    id: "2",
    title: "Memento",
    year: "2000",
    genre: "Mystery, Thriller",
    poster: "/images/memento.jpg",
  },
  // 2001
  {
    id: "3",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: "2001",
    genre: "Fantasy, Adventure",
    poster: "/images/lotr1.jpg",
  },
  {
    id: "4",
    title: "Spirited Away",
    year: "2001",
    genre: "Animation, Adventure",
    poster: "/images/spirited.jpg",
  },
  // 2002
  {
    id: "5",
    title: "The Lord of the Rings: The Two Towers",
    year: "2002",
    genre: "Fantasy, Adventure",
    poster: "/images/lotr2.jpg",
  },
  {
    id: "6",
    title: "Catch Me If You Can",
    year: "2002",
    genre: "Biography, Crime",
    poster: "/images/catchme.jpg",
  },
  // 2003
  {
    id: "7",
    title: "The Lord of the Rings: The Return of the King",
    year: "2003",
    genre: "Fantasy, Adventure",
    poster: "/images/lotr3.jpg",
  },
  {
    id: "8",
    title: "Pirates of the Caribbean: The Curse of the Black Pearl",
    year: "2003",
    genre: "Action, Adventure",
    poster: "/images/pirates1.jpg",
  },
  // 2004
  {
    id: "9",
    title: "Eternal Sunshine of the Spotless Mind",
    year: "2004",
    genre: "Drama, Sci-Fi",
    poster: "/images/eternalsunshine.jpg",
  },
  {
    id: "10",
    title: "Spider-Man 2",
    year: "2004",
    genre: "Action, Sci-Fi",
    poster: "/images/spiderman2.jpg",
  },
  // 2005
  {
    id: "11",
    title: "Batman Begins",
    year: "2005",
    genre: "Action, Crime",
    poster: "/images/batmanbegins.jpg",
  },
  {
    id: "12",
    title: "Star Wars: Episode III - Revenge of the Sith",
    year: "2005",
    genre: "Action, Sci-Fi",
    poster: "/images/sw3.jpg",
  },
  // 2006
  {
    id: "13",
    title: "The Departed",
    year: "2006",
    genre: "Crime, Drama",
    poster: "/images/departed.jpg",
  },
  {
    id: "14",
    title: "The Prestige",
    year: "2006",
    genre: "Drama, Mystery",
    poster: "/images/prestige.jpg",
  },
  // 2007
  {
    id: "15",
    title: "No Country for Old Men",
    year: "2007",
    genre: "Crime, Drama",
    poster: "/images/nocountry.jpg",
  },
  {
    id: "16",
    title: "There Will Be Blood",
    year: "2007",
    genre: "Drama",
    poster: "/images/therewillbeblood.jpg",
  },
  // 2008
  {
    id: "17",
    title: "The Dark Knight",
    year: "2008",
    genre: "Action, Crime",
    poster: "/images/darkknight.jpg",
  },
  {
    id: "18",
    title: "WALL-E",
    year: "2008",
    genre: "Animation, Sci-Fi",
    poster: "/images/walle.jpg",
  },
  // 2009
  {
    id: "19",
    title: "Avatar",
    year: "2009",
    genre: "Action, Sci-Fi",
    poster: "/images/avatar.jpg",
  },
  {
    id: "20",
    title: "Inglourious Basterds",
    year: "2009",
    genre: "Adventure, Drama",
    poster: "/images/basterds.jpg",
  },
  // 2010
  {
    id: "21",
    title: "Inception",
    year: "2010",
    genre: "Action, Sci-Fi",
    poster: "/images/inception.jpg",
  },
  {
    id: "22",
    title: "The Social Network",
    year: "2010",
    genre: "Biography, Drama",
    poster: "/images/socialnetwork.jpg",
  },
  // 2011
  {
    id: "23",
    title: "The Intouchables",
    year: "2011",
    genre: "Biography, Comedy",
    poster: "/images/intouchables.jpg",
  },
  {
    id: "24",
    title: "Drive",
    year: "2011",
    genre: "Action, Drama",
    poster: "/images/drive.jpg",
  },
  // 2012
  {
    id: "25",
    title: "Django Unchained",
    year: "2012",
    genre: "Drama, Western",
    poster: "/images/django.jpg",
  },
  {
    id: "26",
    title: "The Avengers",
    year: "2012",
    genre: "Action, Sci-Fi",
    poster: "/images/avengers.jpg",
  },
  // 2013
  {
    id: "27",
    title: "The Wolf of Wall Street",
    year: "2013",
    genre: "Biography, Comedy",
    poster: "/images/wolfwallstreet.jpg",
  },
  {
    id: "28",
    title: "Interstellar",
    year: "2014",
    genre: "Adventure, Sci-Fi",
    poster: "/images/interstellar.jpg",
  },
  // 2014
  {
    id: "29",
    title: "Whiplash",
    year: "2014",
    genre: "Drama, Music",
    poster: "/images/whiplash.jpg",
  },
  {
    id: "30",
    title: "The Grand Budapest Hotel",
    year: "2014",
    genre: "Adventure, Comedy",
    poster: "/images/budapesthotel.jpg",
  },
  // 2015
  {
    id: "31",
    title: "Mad Max: Fury Road",
    year: "2015",
    genre: "Action, Adventure",
    poster: "/images/madmax.jpg",
  },
  {
    id: "32",
    title: "The Revenant",
    year: "2015",
    genre: "Action, Adventure",
    poster: "/images/revenant.jpg",
  },
  // 2016
  {
    id: "33",
    title: "La La Land",
    year: "2016",
    genre: "Comedy, Drama",
    poster: "/images/lalaland.jpg",
  },
  {
    id: "34",
    title: "Arrival",
    year: "2016",
    genre: "Drama, Sci-Fi",
    poster: "/images/arrival.jpg",
  },
  // 2017
  {
    id: "35",
    title: "Blade Runner 2049",
    year: "2017",
    genre: "Action, Drama",
    poster: "/images/bladerunner2049.jpg",
  },
  {
    id: "36",
    title: "Dunkirk",
    year: "2017",
    genre: "Action, Drama",
    poster: "/images/dunkirk.jpg",
  },
  // 2018
  {
    id: "37",
    title: "Avengers: Infinity War",
    year: "2018",
    genre: "Action, Sci-Fi",
    poster: "/images/infinitywar.jpg",
  },
  {
    id: "38",
    title: "Spider-Man: Into the Spider-Verse",
    year: "2018",
    genre: "Animation, Action",
    poster: "/images/spiderverse.jpg",
  },
  // 2019
  {
    id: "39",
    title: "Parasite",
    year: "2019",
    genre: "Drama, Thriller",
    poster: "/images/parasite.jpg",
  },
  {
    id: "40",
    title: "Joker",
    year: "2019",
    genre: "Crime, Drama",
    poster: "/images/joker.jpg",
  },
  // 2020
  {
    id: "41",
    title: "Tenet",
    year: "2020",
    genre: "Action, Sci-Fi",
    poster: "/images/tenet.jpg",
  },
  {
    id: "42",
    title: "Soul",
    year: "2020",
    genre: "Animation, Adventure",
    poster: "/images/soul.jpg",
  },
  // 2021
  {
    id: "43",
    title: "Dune: Part One",
    year: "2021",
    genre: "Action, Adventure",
    poster: "/images/dune1.jpg",
  },
  {
    id: "44",
    title: "Spider-Man: No Way Home",
    year: "2021",
    genre: "Action, Adventure",
    poster: "/images/nowayhome.jpg",
  },
  // 2022
  {
    id: "45",
    title: "The Batman",
    year: "2022",
    genre: "Action, Crime",
    poster: "/images/thebatman.jpg",
  },
  {
    id: "46",
    title: "Everything Everywhere All at Once",
    year: "2022",
    genre: "Action, Adventure",
    poster: "/images/eeaao.jpg",
  },
  // 2023
  {
    id: "47",
    title: "Oppenheimer",
    year: "2023",
    genre: "Biography, Drama",
    poster: "/images/oppenheimer.jpg",
  },
  {
    id: "48",
    title: "Poor Things",
    year: "2023",
    genre: "Comedy, Drama",
    poster: "/images/poorthings.jpg",
  },
  // 2024
  {
    id: "49",
    title: "Dune: Part Two",
    year: "2024",
    genre: "Action, Adventure",
    poster: "/images/dune2.jpg",
  },
  {
    id: "50",
    title: "Gladiator II",
    year: "2024",
    genre: "Action, Drama",
    poster: "/images/gladiator2.jpg",
  },
  // 2025
  {
    id: "51",
    title: "Superman",
    year: "2025",
    genre: "Action, Sci-Fi",
    poster: "/images/superman.jpg",
  },
  {
    id: "52",
    title: "Avatar: Fire and Ash",
    year: "2025",
    genre: "Action, Sci-Fi",
    poster: "/images/avatar3.jpg",
  },
  // 2026
  {
    id: "53",
    title: "The Batman Part II",
    year: "2026",
    genre: "Action, Crime",
    poster: "/images/batman2.jpg",
  },
  {
    id: "54",
    title: "Avengers: Doomsday",
    year: "2026",
    genre: "Action, Sci-Fi",
    poster: "/images/doomsday.jpg",
  },
];

const ITEMS_PER_PAGE = 10;

export const MoviesList = () => {
  const [movies, setMovies] = useState(initialMovies);
  const [page, setPage] = useState(1);

  const handleDelete = (id) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentMovies = movies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "680px",
        backgroundColor: "#2d2d2d",
        borderRadius: "10px",
        padding: "24px 28px",
        boxSizing: "border-box",
        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "#ffffff", fontWeight: 600, fontSize: "1.7rem" }}
        >
          Movies list
        </Typography>

        <Button
          variant="contained"
          startIcon={<MovieIcon />}
          sx={{
            backgroundColor: "#798e91",
            color: "#0c1c2c",
            fontWeight: 700,
            textTransform: "uppercase",
            fontSize: "0.78rem",
            padding: "7px 16px",
            borderRadius: "4px",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#cbcecd",
              boxShadow: "none",
            },
          }}
        >
          ADD MOVIE
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {currentMovies.length > 0 ? (
          currentMovies.map((movie) => (
            <ListRow
              key={movie.id}
              imageSrc={movie.poster}
              title={movie.title}
              subtitle={`${movie.year} • ${movie.genre}`}
              onEdit={() => console.log("Edit", movie.id)}
              onDelete={() => handleDelete(movie.id)}
            />
          ))
        ) : (
          <Typography sx={{ color: "#b0bec5", textAlign: "center", py: 4 }}>
            Nothing here yet
          </Typography>
        )}
      </Box>

      {totalPages > 1 && (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "24px" }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#ffffff",
                "&.Mui-selected": {
                  backgroundColor: "#798e91",
                  color: "#0c1c2c",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#cbcecd",
                  },
                },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default MoviesList;
