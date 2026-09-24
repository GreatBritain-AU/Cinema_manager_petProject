import React, { useEffect, useRef, useState } from "react";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Button, Collapse, Pagination, Typography } from "@mui/material";

import { fetchPersonImage } from "../../../services/tmdb";

import ListRow from "../../Common/ListRow";

const actorPhotos = import.meta.glob(
  "../../../assets/images/actors/*.{png,jpg,jpeg,svg,webp}",
  { eager: true, as: "url" },
);

const getActorPhoto = (fileName) =>
  actorPhotos[`../../../assets/images/actors/${fileName}`];

const initialActors = [
  {
    id: "1",
    full_name: "Leonardo DiCaprio",
    country: "United States",
    photo: getActorPhoto("dicaprio.jpg"),
  },
  {
    id: "2",
    full_name: "Brad Pitt",
    country: "United States",
    photo: getActorPhoto("pitt.jpg"),
  },
  {
    id: "3",
    full_name: "Tom Hanks",
    country: "United States",
    photo: getActorPhoto("hanks.jpg"),
  },
  {
    id: "4",
    full_name: "Keanu Reeves",
    country: "Canada",
    photo: getActorPhoto("reeves.jpg"),
  },
  {
    id: "5",
    full_name: "Robert Downey Jr.",
    country: "United States",
    photo: getActorPhoto("downey.jpg"),
  },
  {
    id: "6",
    full_name: "Christian Bale",
    country: "United Kingdom",
    photo: getActorPhoto("bale.jpg"),
  },
  {
    id: "7",
    full_name: "Hugh Jackman",
    country: "Australia",
    photo: getActorPhoto("jackman.jpg"),
  },
  {
    id: "8",
    full_name: "Ryan Gosling",
    country: "Canada",
    photo: getActorPhoto("gosling.jpg"),
  },
  {
    id: "9",
    full_name: "Cillian Murphy",
    country: "Ireland",
    photo: "/images/murphy.jpg",
  },
  {
    id: "10",
    full_name: "Mads Mikkelsen",
    country: "Denmark",
    photo: "/images/mikkelsen.jpg",
  },
  {
    id: "11",
    full_name: "Javier Bardem",
    country: "Spain",
    photo: "/images/bardem.jpg",
  },
  {
    id: "12",
    full_name: "Christoph Waltz",
    country: "Austria",
    photo: "/images/waltz.jpg",
  },
  {
    id: "13",
    full_name: "Jackie Chan",
    country: "Hong Kong",
    photo: "/images/chan.jpg",
  },
  {
    id: "14",
    full_name: "Pedro Pascal",
    country: "Chile",
    photo: "/images/pascal.jpg",
  },
  {
    id: "15",
    full_name: "Morgan Freeman",
    country: "United States",
    photo: "/images/freeman.jpg",
  },
  {
    id: "16",
    full_name: "Denzel Washington",
    country: "United States",
    photo: "/images/washington.jpg",
  },
  {
    id: "17",
    full_name: "Johnny Depp",
    country: "United States",
    photo: "/images/depp.jpg",
  },
  {
    id: "18",
    full_name: "Tom Cruise",
    country: "United States",
    photo: "/images/cruise.jpg",
  },
  {
    id: "19",
    full_name: "Matthew McConaughey",
    country: "United States",
    photo: "/images/mcconaughey.jpg",
  },
  {
    id: "20",
    full_name: "Joaquin Phoenix",
    country: "Puerto Rico",
    photo: "/images/phoenix.jpg",
  },
  {
    id: "21",
    full_name: "Scarlett Johansson",
    country: "United States",
    photo: "/images/johansson.jpg",
  },
  {
    id: "22",
    full_name: "Margot Robbie",
    country: "Australia",
    photo: "/images/robbie.jpg",
  },
  {
    id: "23",
    full_name: "Cate Blanchett",
    country: "Australia",
    photo: "/images/blanchett.jpg",
  },
  {
    id: "24",
    full_name: "Penélope Cruz",
    country: "Spain",
    photo: "/images/cruz.jpg",
  },
  {
    id: "25",
    full_name: "Charlize Theron",
    country: "South Africa",
    photo: "/images/theron.jpg",
  },
  {
    id: "26",
    full_name: "Marion Cotillard",
    country: "France",
    photo: "/images/cotillard.jpg",
  },
  {
    id: "27",
    full_name: "Meryl Streep",
    country: "United States",
    photo: "/images/streep.jpg",
  },
  {
    id: "28",
    full_name: "Viola Davis",
    country: "United States",
    photo: "/images/davis.jpg",
  },
  {
    id: "29",
    full_name: "Florence Pugh",
    country: "United Kingdom",
    photo: "/images/pugh.jpg",
  },
  {
    id: "30",
    full_name: "Ana de Armas",
    country: "Cuba",
    photo: "/images/dearmas.jpg",
  },
];

const ITEMS_PER_PAGE = 8;
const UNDO_TIMEOUT_MS = 5000;
const COLLAPSE_ANIMATION_MS = 300;

// Обертка для строки актера с динамическим фетчем аватара из TMDB
const ActorRowItem = ({ actor, isDeleting, onDelete, onUndo }) => {
  const [photoUrl, setPhotoUrl] = useState(actor.photo || null);

  useEffect(() => {
    let isMounted = true;
    fetchPersonImage(actor.full_name).then((url) => {
      if (isMounted && url) {
        setPhotoUrl(url);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [actor.full_name]);

  return (
    <ListRow
      imageSrc={photoUrl}
      title={actor.full_name}
      subtitle={actor.country}
      isDeleting={isDeleting}
      duration={UNDO_TIMEOUT_MS}
      onEdit={() => console.log("Edit", actor.id)}
      onDelete={onDelete}
      onUndo={onUndo}
    />
  );
};

export const ActorsList = () => {
  const [actors, setActors] = useState(initialActors);
  const [page, setPage] = useState(1);
  const [deletingIds, setDeletingIds] = useState([]);
  const [collapsingIds, setCollapsingIds] = useState([]);

  const timersRef = useRef({});

  const handleDeleteRequest = (id) => {
    setDeletingIds((prev) => [...prev, id]);

    timersRef.current[id] = setTimeout(() => {
      setCollapsingIds((prev) => [...prev, id]);

      setTimeout(() => {
        setActors((prevActors) =>
          prevActors.filter((actor) => actor.id !== id),
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

  const totalPages = Math.ceil(actors.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentActors = actors.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
          Actors list
        </Typography>

        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
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
          ADD ACTOR
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {currentActors.length > 0 ? (
          currentActors.map((actor) => (
            <Collapse
              key={actor.id}
              in={!collapsingIds.includes(actor.id)}
              timeout={COLLAPSE_ANIMATION_MS}
              unmountOnExit
            >
              <ActorRowItem
                actor={actor}
                isDeleting={deletingIds.includes(actor.id)}
                onDelete={() => handleDeleteRequest(actor.id)}
                onUndo={() => handleUndoDelete(actor.id)}
              />
            </Collapse>
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

export default ActorsList;
