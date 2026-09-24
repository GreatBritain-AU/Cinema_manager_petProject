import React, { useRef, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import AnimationIcon from "@mui/icons-material/Animation";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ExploreIcon from "@mui/icons-material/Explore";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import GavelIcon from "@mui/icons-material/Gavel";
import LandscapeIcon from "@mui/icons-material/Landscape";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ScienceIcon from "@mui/icons-material/Science";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import {
  Box,
  Button,
  Collapse,
  Pagination,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";

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
// code это двухбуквенный код страны (ISO), по нему берётся флаг
const initialCountries = [
  { id: "c1", title: "Australia", code: "au" },
  { id: "c2", title: "Austria", code: "at" },
  { id: "c3", title: "Canada", code: "ca" },
  { id: "c4", title: "Chile", code: "cl" },
  { id: "c5", title: "Cuba", code: "cu" },
  { id: "c6", title: "Denmark", code: "dk" },
  { id: "c7", title: "France", code: "fr" },
  { id: "c8", title: "Hong Kong", code: "hk" },
  { id: "c9", title: "Ireland", code: "ie" },
  { id: "c10", title: "Japan", code: "jp" },
  { id: "c11", title: "Mexico", code: "mx" },
  { id: "c12", title: "New Zealand", code: "nz" },
  { id: "c13", title: "Puerto Rico", code: "pr" },
  { id: "c14", title: "South Africa", code: "za" },
  { id: "c15", title: "South Korea", code: "kr" },
  { id: "c16", title: "Spain", code: "es" },
  { id: "c17", title: "United Kingdom", code: "gb" },
  { id: "c18", title: "United States", code: "us" },
];

const initialLocations = [
  { id: "l1", title: "Munchen, Deutschland", countryCode: "de" },
  { id: "l2", title: "Paris, France", countryCode: "fr" },
  { id: "l3", title: "Sydney, Australia", countryCode: "au" },
  { id: "l4", title: "New York, United States of America", countryCode: "us" },
  { id: "l5", title: "Toronto, Canada", countryCode: "ca" },
  { id: "l6", title: "Tokyo, Japan", countryCode: "jp" },
  { id: "l7", title: "London, United Kingdom", countryCode: "gb" },
];

const genreIcons = {
  Action: LocalFireDepartmentIcon,
  Adventure: ExploreIcon,
  Animation: AnimationIcon,
  Biography: MenuBookIcon,
  Comedy: SentimentVerySatisfiedIcon,
  Crime: GavelIcon,
  Drama: TheaterComedyIcon,
  Fantasy: AutoFixHighIcon,
  Music: MusicNoteIcon,
  Mystery: PsychologyIcon,
  "Sci-Fi": ScienceIcon,
  Thriller: FlashOnIcon,
  Western: LandscapeIcon,
};

// Флаг страны по коду (flagcdn.com)
const getFlagUrl = (code) =>
  code ? `https://flagcdn.com/w80/${code}.png` : null;

const ITEMS_PER_PAGE = 7;
const UNDO_TIMEOUT_MS = 5000;
const COLLAPSE_ANIMATION_MS = 300;

export const ServicesList = () => {
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);
  const [page, setPage] = useState(1);

  const [genres, setGenres] = useState(initialGenres);
  const [countries, setCountries] = useState(initialCountries);
  const [locations, setLocations] = useState(initialLocations);

  const [deletingIds, setDeletingIds] = useState([]);
  const [collapsingIds, setCollapsingIds] = useState([]);

  const timersRef = useRef({});

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setPage(1);
  };

  const handleDeleteRequest = (id) => {
    const tabAtDelete = tabIndex;

    setDeletingIds((prev) => [...prev, id]);

    timersRef.current[id] = setTimeout(() => {
      setCollapsingIds((prev) => [...prev, id]);

      setTimeout(() => {
        if (tabAtDelete === 0)
          setGenres((prev) => prev.filter((item) => item.id !== id));
        if (tabAtDelete === 1)
          setCountries((prev) => prev.filter((item) => item.id !== id));
        if (tabAtDelete === 2)
          setLocations((prev) => prev.filter((item) => item.id !== id));

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

  const getRowVisual = (item) => {
    if (tabIndex === 0) {
      const GenreIcon = genreIcons[item.title] || MovieOutlinedIcon;
      return { icon: <GenreIcon /> };
    }
    if (tabIndex === 1) {
      return { imageSrc: getFlagUrl(item.code) };
    }
    return { imageSrc: item.coatOfArms || getFlagUrl(item.countryCode) };
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
          marginBottom: "20px",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, fontSize: "1.7rem" }}>
          Service List
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
          {getButtonText()}
        </Button>
      </Box>

      <Box
        sx={{
          borderBottom: 1,
          borderColor: theme.palette.divider,
          marginBottom: "20px",
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          textColor="inherit"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: theme.palette.primary.main,
              height: "3px",
            },
            "& .MuiTab-root": {
              color: theme.palette.text.secondary,
              fontWeight: 600,
              fontSize: "0.85rem",
              "&.Mui-selected": {
                color: theme.palette.primary.main,
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
            <Collapse
              key={item.id}
              in={!collapsingIds.includes(item.id)}
              timeout={COLLAPSE_ANIMATION_MS}
              unmountOnExit
            >
              <ListRow
                {...getRowVisual(item)}
                title={item.title}
                isDeleting={deletingIds.includes(item.id)}
                duration={UNDO_TIMEOUT_MS}
                onEdit={() => console.log("Edit", item.id)}
                onDelete={() => handleDeleteRequest(item.id)}
                onUndo={() => handleUndoDelete(item.id)}
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
            onChange={(e, val) => setPage(val)}
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

export default ServicesList;
