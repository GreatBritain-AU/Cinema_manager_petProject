import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Pagination, Tab, Tabs, Typography } from "@mui/material";

import ListRow from "../../Common/ListRow";

// Все жанры из MoviesList
const initialGenres = [
  { id: "g1", title: "Action" },
  { id: "g2", title: "Adventure" },
  { id: "g3", title: "Animation" },
  { id: "g4", title: "Biography" },
  { id: "g5", title: "Comedy" },
  { id: "g6", title: "Crime" },
  { id: "g7", title: "Drama" },
  { id: "g8", title: "Fantasy" },
  { id: "g9", title: "Music" },
  { id: "g10", title: "Mystery" },
  { id: "g11", title: "Sci-Fi" },
  { id: "g12", title: "Thriller" },
  { id: "g13", title: "Western" },
];

// Все уникальные страны из ActorsList и DirectorsList
const initialCountries = [
  { id: "c1", title: "Australia" },
  { id: "c2", title: "Austria" },
  { id: "c3", title: "Canada" },
  { id: "c4", title: "Chile" },
  { id: "c5", title: "Cuba" },
  { id: "c6", title: "Denmark" },
  { id: "c7", title: "France" },
  { id: "c8", title: "Hong Kong" },
  { id: "c9", title: "Ireland" },
  { id: "c10", title: "Japan" },
  { id: "c11", title: "Mexico" },
  { id: "c12", title: "New Zealand" },
  { id: "c13", title: "Puerto Rico" },
  { id: "c14", title: "South Africa" },
  { id: "c15", title: "South Korea" },
  { id: "c16", title: "Spain" },
  { id: "c17", title: "United Kingdom" },
  { id: "c18", title: "United States" },
];

// Локации из макета + доп. города
const initialLocations = [
  { id: "l1", title: "Munchen, Deutschland" },
  { id: "l2", title: "Paris, France" },
  { id: "l3", title: "Sydney, Australia" },
  { id: "l4", title: "New York, United States of America" },
  { id: "l5", title: "Toronto, Canada" },
  { id: "l6", title: "Tokyo, Japan" },
  { id: "l7", title: "London, United Kingdom" },
];

const ITEMS_PER_PAGE = 5;

export const ServicesList = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [page, setPage] = useState(1);

  const [genres, setGenres] = useState(initialGenres);
  const [countries, setCountries] = useState(initialCountries);
  const [locations, setLocations] = useState(initialLocations);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setPage(1);
  };

  const handleDelete = (id) => {
    if (tabIndex === 0)
      setGenres((prev) => prev.filter((item) => item.id !== id));
    if (tabIndex === 1)
      setCountries((prev) => prev.filter((item) => item.id !== id));
    if (tabIndex === 2)
      setLocations((prev) => prev.filter((item) => item.id !== id));
  };

  const getCurrentList = () => {
    if (tabIndex === 0) return genres;
    if (tabIndex === 1) return countries;
    return locations;
  };

  const getButtonText = () => {
    if (tabIndex === 0) return "ADD GENRE";
    if (tabIndex === 1) return "ADD COUNTRY";
    return "ADD LOCATION";
  };

  const currentList = getCurrentList();
  const totalPages = Math.ceil(currentList.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedList = currentList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

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
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "#ffffff", fontWeight: 600, fontSize: "1.7rem" }}
        >
          Service List
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
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
          {getButtonText()}
        </Button>
      </Box>

      <Box
        sx={{
          borderBottom: 1,
          borderColor: "rgba(255, 255, 255, 0.1)",
          marginBottom: "20px",
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          textColor="inherit"
          slotProps={{
            indicator: {
              style: {
                backgroundColor: "#798e91",
                height: "3px",
              },
            },
          }}
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#798e91 !important",
              height: "3px",
            },
            "& .MuiTab-root": {
              color: "#b0bec5",
              fontWeight: 600,
              fontSize: "0.85rem",
              "&.Mui-selected": {
                color: "#ffffff",
              },
            },
          }}
        >
          <Tab label="MOVIE GENRES" />
          <Tab label="COUNTRIES" />
          <Tab label="LOCATIONS" />
        </Tabs>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {paginatedList.length > 0 ? (
          paginatedList.map((item) => (
            <ListRow
              key={item.id}
              title={item.title}
              onEdit={() => console.log("Edit", item.id)}
              onDelete={() => handleDelete(item.id)}
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
            onChange={(e, val) => setPage(val)}
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

export default ServicesList;
