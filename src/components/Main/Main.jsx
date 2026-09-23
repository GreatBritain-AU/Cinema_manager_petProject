import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const menuItems = [
  { label: "Home", icon: <HomeOutlinedIcon /> },
  { label: "Movies", icon: <MovieOutlinedIcon /> },
  { label: "Actors", icon: <PeopleAltOutlinedIcon /> },
  { label: "Directors", icon: <PersonOutlineOutlinedIcon /> },
  { label: "Studios", icon: <BusinessOutlinedIcon /> },
  { label: "Service", icon: <SettingsOutlinedIcon /> },
];

export default function Main({ children }) {
  const [selected, setSelected] = useState("Home");

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        minWidth: 0,
        backgroundColor: "#3d3d3d",
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
            backgroundColor: "#2d2d2d",
            color: "#fff",
            borderRight: "none",
            boxSizing: "border-box",
            top: "115px", 
            height: "auto",
            boxShadow: "none",
            borderRadius: 2,
          },
        }}
      >
        <List disablePadding sx={{ pt: 1 }}>
          {menuItems.map(({ label, icon }) => {
            const isSelected = selected === label;

            return (
              <ListItem key={label} disablePadding>
                <ListItemButton
                  selected={isSelected}
                  onClick={() => setSelected(label)}
                  sx={{
                    px: 2.5,
                    py: 1.35,
                    color: "#fff",
                    "&.Mui-selected": {
                      backgroundColor: "rgba(13, 13, 13, 0.69)",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.04)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isSelected ? "#ffffff" : "#d8d8d8",
                    }}
                  >
                    {icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      fontSize: 18,
                      fontWeight: 500,
                      lineHeight: 1.2,
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
          padding: "0 20px 20px 20px", 
          minWidth: 0,
          height: "fit-content" 
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
