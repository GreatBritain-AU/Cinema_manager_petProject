import { useState } from "react";

import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import ActorsList from "../Lists/ActorsList/ActorsList.jsx";
import DirectorsList from "../Lists/DirectorsList/DirectorsList.jsx";
import MoviesList from "../Lists/MoviesList/MoviesList.jsx";
import ServicesList from "../Lists/ServicesList/ServicesList.jsx";
import StudiosList from "../Lists/StudiosList/StudiosList.jsx";

const menuItems = [
  { label: "Home", icon: <HomeOutlinedIcon /> },
  { label: "Movies", icon: <MovieOutlinedIcon /> },
  { label: "Actors", icon: <PeopleAltOutlinedIcon /> },
  { label: "Directors", icon: <PersonOutlineOutlinedIcon /> },
  { label: "Studios", icon: <BusinessOutlinedIcon /> },
  { label: "Service", icon: <SettingsOutlinedIcon /> },
];

export default function Main() {
  const [selected, setSelected] = useState("Home");
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        minWidth: 0,
        backgroundColor: theme.palette.background.default,
        pt: "120px",
        pb: 4,
        px: 3,
        transition: "background-color 0.3s ease",
      }}
    >
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          marginLeft: "15px",
          "& .MuiDrawer-paper": {
            position: "sticky",
            width: 240,
            backgroundColor: theme.palette.custom.sidebar,
            color: theme.palette.custom.sidebarText,
            border: `1px solid ${theme.palette.custom.cardBorder}`,
            boxSizing: "border-box",
            top: "115px",
            height: "auto",
            boxShadow: theme.palette.custom.cardShadow,
            borderRadius: 2,
            transition: "background-color 0.3s ease, border-color 0.3s ease",
          },
        }}
      >
        <List disablePadding sx={{ py: 1 }}>
          {menuItems.map(({ label, icon }) => {
            const isSelected = selected === label;

            return (
              <ListItem key={label} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={isSelected}
                  onClick={() => setSelected(label)}
                  sx={{
                    px: 2.5,
                    py: 1.2,
                    mx: 1,
                    borderRadius: 1.5,
                    color: theme.palette.custom.sidebarText,
                    "&.Mui-selected": {
                      backgroundColor: theme.palette.custom.sidebarSelected,
                      color: theme.palette.custom.sidebarIconSelected,
                      fontWeight: 600,
                      "& .MuiListItemIcon-root": {
                        color: theme.palette.custom.sidebarIconSelected,
                      },
                      "&:hover": {
                        backgroundColor: theme.palette.custom.sidebarSelected,
                      },
                    },
                    "&:hover": {
                      backgroundColor: theme.palette.custom.sidebarHover,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isSelected
                        ? theme.palette.custom.sidebarIconSelected
                        : theme.palette.custom.sidebarIcon,
                    }}
                  >
                    {icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: isSelected ? 600 : 500,
                      lineHeight: 1.2,
                      color: isSelected
                        ? theme.palette.custom.sidebarIconSelected
                        : theme.palette.custom.sidebarText,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          pr: "240px",
        }}
      >
        {selected === "Home" && (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h5" color="text.secondary">
              Home Page (In Development)
            </Typography>
          </Box>
        )}
        {selected === "Actors" && <ActorsList />}
        {selected === "Directors" && <DirectorsList />}
        {selected === "Movies" && <MoviesList />}
        {selected === "Studios" && <StudiosList />}
        {selected === "Service" && <ServicesList />}
      </Box>
    </Box>
  );
}
