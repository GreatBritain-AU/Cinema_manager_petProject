import React, { useEffect, useRef, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Collapse,
  Pagination,
  Typography,
  useTheme,
} from "@mui/material";

import { fetchCompanyLogo } from "../../../services/tmdb";

import ListRow from "../../Common/ListRow";

const initialStudios = [
  {
    id: "1",
    title: "Warner Bros. Pictures",
    location: "Burbank, California, USA",
    logo: "/images/warner.jpg",
  },
  {
    id: "2",
    title: "Universal Pictures",
    location: "Universal City, California, USA",
    logo: "/images/universal.jpg",
  },
  {
    id: "3",
    title: "Paramount Pictures",
    location: "Los Angeles, California, USA",
    logo: "/images/paramount.jpg",
  },
  {
    id: "4",
    title: "Walt Disney Pictures",
    location: "Burbank, California, USA",
    logo: "/images/disney.jpg",
  },
  {
    id: "5",
    title: "Columbia Pictures (Sony)",
    searchName: "Columbia Pictures",
    location: "Culver City, California, USA",
    logo: "/images/columbia.jpg",
  },
  {
    id: "6",
    title: "20th Century Studios",
    location: "Los Angeles, California, USA",
    logo: "/images/20thcentury.jpg",
  },
  {
    id: "7",
    title: "Lionsgate Films",
    searchName: "Lionsgate",
    location: "Santa Monica, California, USA",
    logo: "/images/lionsgate.jpg",
  },
  {
    id: "8",
    title: "A24",
    location: "New York City, New York, USA",
    logo: "/images/a24.jpg",
  },
  {
    id: "9",
    title: "Metro-Goldwyn-Mayer (MGM)",
    searchName: "Metro-Goldwyn-Mayer",
    location: "Beverly Hills, California, USA",
    logo: "/images/mgm.jpg",
  },
  {
    id: "10",
    title: "Legendary Entertainment",
    location: "Burbank, California, USA",
    logo: "/images/legendary.jpg",
  },
  {
    id: "11",
    title: "Marvel Studios",
    location: "Burbank, California, USA",
    logo: "/images/marvel.jpg",
  },
  {
    id: "12",
    title: "Pixar Animation Studios",
    searchName: "Pixar",
    location: "Emeryville, California, USA",
    logo: "/images/pixar.jpg",
  },
  {
    id: "13",
    title: "DreamWorks Animation",
    location: "Glendale, California, USA",
    logo: "/images/dreamworks.jpg",
  },
  {
    id: "14",
    title: "Studio Ghibli",
    location: "Koganei, Tokyo, Japan",
    logo: "/images/ghibli.jpg",
  },
  {
    id: "15",
    title: "Blumhouse Productions",
    location: "Los Angeles, California, USA",
    logo: "/images/blumhouse.jpg",
  },
];

const ITEMS_PER_PAGE = 8;
const UNDO_TIMEOUT_MS = 5000;
const COLLAPSE_ANIMATION_MS = 300;

const StudioRowItem = ({ studio, isDeleting, onDelete, onUndo }) => {
  const [logoUrl, setLogoUrl] = useState(studio.logo || null);

  useEffect(() => {
    let isMounted = true;
    fetchCompanyLogo(studio.searchName || studio.title).then((url) => {
      if (isMounted && url) {
        setLogoUrl(url);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [studio.searchName, studio.title]);

  return (
    <ListRow
      imageSrc={logoUrl}
      imageFit="contain"
      title={studio.title}
      subtitle={studio.location}
      isDeleting={isDeleting}
      duration={UNDO_TIMEOUT_MS}
      onEdit={() => console.log("Edit", studio.id)}
      onDelete={onDelete}
      onUndo={onUndo}
    />
  );
};

export const StudiosList = () => {
  const theme = useTheme();
  const [studios, setStudios] = useState(initialStudios);
  const [page, setPage] = useState(1);
  const [deletingIds, setDeletingIds] = useState([]);
  const [collapsingIds, setCollapsingIds] = useState([]);

  const timersRef = useRef({});

  const handleDeleteRequest = (id) => {
    setDeletingIds((prev) => [...prev, id]);

    timersRef.current[id] = setTimeout(() => {
      setCollapsingIds((prev) => [...prev, id]);

      setTimeout(() => {
        setStudios((prevStudios) =>
          prevStudios.filter((studio) => studio.id !== id),
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

  const totalPages = Math.ceil(studios.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentStudios = studios.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
          Studios list
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
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
          ADD STUDIO
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {currentStudios.length > 0 ? (
          currentStudios.map((studio) => (
            <Collapse
              key={studio.id}
              in={!collapsingIds.includes(studio.id)}
              timeout={COLLAPSE_ANIMATION_MS}
              unmountOnExit
            >
              <StudioRowItem
                studio={studio}
                isDeleting={deletingIds.includes(studio.id)}
                onDelete={() => handleDeleteRequest(studio.id)}
                onUndo={() => handleUndoDelete(studio.id)}
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

export default StudiosList;
