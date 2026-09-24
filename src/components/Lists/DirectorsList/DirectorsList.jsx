import React, { useEffect, useRef, useState } from "react";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Box,
  Button,
  Collapse,
  Pagination,
  Typography,
  useTheme,
} from "@mui/material";

import { fetchPersonImage } from "../../../services/tmdb";

import ListRow from "../../Common/ListRow";

const initialDirectors = [
  {
    id: "1",
    full_name: "Christopher Nolan",
    country: "United Kingdom",
    photo: "/images/nolan.jpg",
  },
  {
    id: "2",
    full_name: "Quentin Tarantino",
    country: "United States",
    photo: "/images/tarantino.jpg",
  },
  {
    id: "3",
    full_name: "Steven Spielberg",
    country: "United States",
    photo: "/images/spielberg.jpg",
  },
  {
    id: "4",
    full_name: "Martin Scorsese",
    country: "United States",
    photo: "/images/scorsese.jpg",
  },
  {
    id: "5",
    full_name: "Denis Villeneuve",
    country: "Canada",
    photo: "/images/villeneuve.jpg",
  },
  {
    id: "6",
    full_name: "David Fincher",
    country: "United States",
    photo: "/images/fincher.jpg",
  },
  {
    id: "7",
    full_name: "James Cameron",
    country: "Canada",
    photo: "/images/cameron.jpg",
  },
  {
    id: "8",
    full_name: "Ridley Scott",
    country: "United Kingdom",
    photo: "/images/scott.jpg",
  },
  {
    id: "9",
    full_name: "Alfred Hitchcock",
    country: "United Kingdom",
    photo: "/images/hitchcock.jpg",
  },
  {
    id: "10",
    full_name: "Stanley Kubrick",
    country: "United States",
    photo: "/images/kubrick.jpg",
  },
  {
    id: "11",
    full_name: "Hayao Miyazaki",
    country: "Japan",
    photo: "/images/miyazaki.jpg",
  },
  {
    id: "12",
    full_name: "Guillermo del Toro",
    country: "Mexico",
    photo: "/images/deltoro.jpg",
  },
  {
    id: "13",
    full_name: "Wes Anderson",
    country: "United States",
    photo: "/images/anderson.jpg",
  },
  {
    id: "14",
    full_name: "Akira Kurosawa",
    country: "Japan",
    photo: "/images/kurosawa.jpg",
  },
  {
    id: "15",
    full_name: "Francis Ford Coppola",
    country: "United States",
    photo: "/images/coppola.jpg",
  },
  {
    id: "16",
    full_name: "Bong Joon-ho",
    country: "South Korea",
    photo: "/images/bong.jpg",
  },
  {
    id: "17",
    full_name: "Peter Jackson",
    country: "New Zealand",
    photo: "/images/jackson.jpg",
  },
  {
    id: "18",
    full_name: "Tim Burton",
    country: "United States",
    photo: "/images/burton.jpg",
  },
  {
    id: "19",
    full_name: "Coen Brothers",
    searchName: "Joel Coen",
    country: "United States",
    photo: "/images/coen.jpg",
  },
  {
    id: "20",
    full_name: "Guy Ritchie",
    country: "United Kingdom",
    photo: "/images/ritchie.jpg",
  },
  {
    id: "21",
    full_name: "Greta Gerwig",
    country: "United States",
    photo: "/images/gerwig.jpg",
  },
  {
    id: "22",
    full_name: "Taika Waititi",
    country: "New Zealand",
    photo: "/images/waititi.jpg",
  },
  {
    id: "23",
    full_name: "Paul Thomas Anderson",
    country: "United States",
    photo: "/images/pta.jpg",
  },
  {
    id: "24",
    full_name: "Darren Aronofsky",
    country: "United States",
    photo: "/images/aronofsky.jpg",
  },
  {
    id: "25",
    full_name: "Alejandro G. Iñárritu",
    country: "Mexico",
    photo: "/images/inarritu.jpg",
  },
  {
    id: "26",
    full_name: "Park Chan-wook",
    country: "South Korea",
    photo: "/images/park.jpg",
  },
  {
    id: "27",
    full_name: "Pedro Almodóvar",
    country: "Spain",
    photo: "/images/almodovar.jpg",
  },
  {
    id: "28",
    full_name: "David Lynch",
    country: "United States",
    photo: "/images/lynch.jpg",
  },
  {
    id: "29",
    full_name: "George Lucas",
    country: "United States",
    photo: "/images/lucas.jpg",
  },
  {
    id: "30",
    full_name: "Lana & Lilly Wachowski",
    searchName: "Lana Wachowski",
    country: "United States",
    photo: "/images/wachowski.jpg",
  },
];

const ITEMS_PER_PAGE = 8;
const UNDO_TIMEOUT_MS = 5000;
const COLLAPSE_ANIMATION_MS = 300;

const DirectorRowItem = ({ director, isDeleting, onDelete, onUndo }) => {
  const [photoUrl, setPhotoUrl] = useState(director.photo || null);

  useEffect(() => {
    let isMounted = true;
    fetchPersonImage(director.searchName || director.full_name).then((url) => {
      if (isMounted && url) {
        setPhotoUrl(url);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [director.searchName, director.full_name]);

  return (
    <ListRow
      imageSrc={photoUrl}
      title={director.full_name}
      subtitle={director.country}
      isDeleting={isDeleting}
      duration={UNDO_TIMEOUT_MS}
      onEdit={() => console.log("Edit", director.id)}
      onDelete={onDelete}
      onUndo={onUndo}
    />
  );
};

export const DirectorsList = () => {
  const theme = useTheme();
  const [directors, setDirectors] = useState(initialDirectors);
  const [page, setPage] = useState(1);
  const [deletingIds, setDeletingIds] = useState([]);
  const [collapsingIds, setCollapsingIds] = useState([]);

  const timersRef = useRef({});

  const handleDeleteRequest = (id) => {
    setDeletingIds((prev) => [...prev, id]);

    timersRef.current[id] = setTimeout(() => {
      setCollapsingIds((prev) => [...prev, id]);

      setTimeout(() => {
        setDirectors((prevDirectors) =>
          prevDirectors.filter((director) => director.id !== id),
        );
        setDeletingIds((prev) => prev.filter((item) => item !== id));
        setCollapsingIds((prev) => prev.filter((item) => item !== id));
        delete timersRef.current[id];
      }, COLLAPSE_ANIMATION_MS);
    }, UNDO_TIMEOUT_MS);
  };

  const handleUndoDelete = (id) => {
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
    setDeletingIds((prev) => prev.filter((item) => item !== id));
    setCollapsingIds((prev) => prev.filter((item) => item !== id));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(directors.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentDirectors = directors.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "680px",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: "12px",
        padding: "24px 28px",
        boxSizing: "border-box",
        boxShadow: theme.palette.custom.cardShadow,
        border: `1px solid ${theme.palette.custom.cardBorder}`,
        margin: "0 auto",
        transition: "all 0.3s ease",
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
        <Typography variant="h5" sx={{ fontWeight: 600, fontSize: "1.7rem" }}>
          Directors list
        </Typography>

        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            fontWeight: 700,
            fontSize: "12px",
            padding: "8px 16px",
            borderRadius: "6px",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              boxShadow: "none",
            },
          }}
        >
          ADD DIRECTOR
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {currentDirectors.length > 0 ? (
          currentDirectors.map((director) => (
            <Collapse
              key={director.id}
              in={!collapsingIds.includes(director.id)}
              timeout={COLLAPSE_ANIMATION_MS}
              unmountOnExit
            >
              <DirectorRowItem
                director={director}
                isDeleting={deletingIds.includes(director.id)}
                onDelete={() => handleDeleteRequest(director.id)}
                onUndo={() => handleUndoDelete(director.id)}
              />
            </Collapse>
          ))
        ) : (
          <Typography
            sx={{
              color: theme.palette.text.secondary,
              textAlign: "center",
              py: 4,
            }}
          >
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
                color: theme.palette.text.primary,
                "&.Mui-selected": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
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

export default DirectorsList;
