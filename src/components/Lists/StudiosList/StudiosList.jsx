import React, { useState } from "react";

import DomainIcon from "@mui/icons-material/Domain";
import { Box, Button, Pagination, Typography } from "@mui/material";

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

const ITEMS_PER_PAGE = 10;

export const StudiosList = () => {
  const [studios, setStudios] = useState(initialStudios);
  const [page, setPage] = useState(1);

  const handleDelete = (id) => {
    setStudios((prev) => prev.filter((studio) => studio.id !== id));
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
          Studios list
        </Typography>

        <Button
          variant="contained"
          startIcon={<DomainIcon />}
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
          ADD STUDIO
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {currentStudios.length > 0 ? (
          currentStudios.map((studio) => (
            <ListRow
              key={studio.id}
              imageSrc={studio.logo}
              title={studio.title}
              subtitle={studio.location}
              onEdit={() => console.log("Edit", studio.id)}
              onDelete={() => handleDelete(studio.id)}
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

export default StudiosList;
