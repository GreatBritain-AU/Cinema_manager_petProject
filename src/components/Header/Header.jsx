import { useState } from "react";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import cinemaLogo from "../../assets/cinema_meneger_icon.png";
import { useAppTheme } from "../../styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.custom.searchBg,
  "&:hover": {
    backgroundColor: theme.palette.custom.searchBgHover,
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  transition: "background-color 0.3s ease",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.custom.onBarMuted,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.custom.onBar,
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    "&::placeholder": {
      color: theme.palette.custom.onBarMuted,
      opacity: 1,
    },
    [theme.breakpoints.up("sm")]: {
      width: "18ch",
      "&:focus": {
        width: "26ch",
      },
    },
  },
}));

function Header() {
  const theme = useTheme();
  const { themeName, setThemeName } = useAppTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const changeTheme = (newTheme) => {
    setThemeName(newTheme);
    handleMouseLeave();
  };

  const getCurrentIcon = () => {
    if (themeName === "space") return <AutoAwesomeIcon />;
    if (themeName === "gray") return <DarkModeIcon />;
    return <LightModeIcon />;
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: theme.palette.custom.headerBg,
        borderBottom: `1px solid ${theme.palette.custom.barBorder}`,
        color: theme.palette.custom.onBar,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: "border-color 0.3s ease",
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "-1px",
          height: "3px",
          backgroundColor: theme.palette.custom.accentLine,
        },
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <img src={cinemaLogo} alt="logo" width={110} />
          </Typography>
        </Box>

        <Box sx={{ flex: 2, display: "flex", justifyContent: "center" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Box>

        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
              position: "relative",
              display: "inline-block",
              // Невидимая зона вокруг иконки (создает буфер в 15px со всех сторон)
              "&::before": {
                content: '""',
                position: "absolute",
                top: -15,
                bottom: -15,
                left: -15,
                right: -15,
                zIndex: 1,
              },
            }}
          >
            <IconButton
              sx={{ color: theme.palette.custom.onBar }}
              aria-controls={open ? "theme-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              {getCurrentIcon()}
            </IconButton>

            <Menu
              id="theme-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMouseLeave}
              slotProps={{
                root: {
                  sx: { pointerEvents: "none" },
                },
              }}
              MenuListProps={{
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
                "aria-labelledby": "basic-button",
              }}
              sx={{
                "& .MuiPaper-root": {
                  pointerEvents: "auto",
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  mt: 0.5,
                  overflow: "visible",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: -7,
                    left: 0,
                    right: 0,
                    height: 7,
                    backgroundColor: "transparent",
                  },
                },
              }}
            >
              <MenuItem
                onClick={() => changeTheme("light")}
                selected={themeName === "light"}
                sx={{ gap: 1.5 }}
              >
                <LightModeIcon fontSize="small" /> Light
              </MenuItem>

              <MenuItem
                onClick={() => changeTheme("gray")}
                selected={themeName === "gray"}
                sx={{ gap: 1.5 }}
              >
                <DarkModeIcon fontSize="small" /> Gray
              </MenuItem>

              <MenuItem
                onClick={() => changeTheme("space")}
                selected={themeName === "space"}
                sx={{ gap: 1.5 }}
              >
                <AutoAwesomeIcon fontSize="small" /> Space
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
