import React from "react";

import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, IconButton, Typography } from "@mui/material";

export const ListRow = ({ imageSrc, title, subtitle, onEdit, onDelete }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 16px",
        backgroundColor: "#2d2d2d",
        border: "1px solid #798e91",
        borderRadius: "24px",
        transition: "all 0.2s ease",
        "&:hover": {
          borderColor: "#cbcecd",
          boxShadow: "0 0 8px rgba(121, 142, 145, 0.4)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          src={imageSrc}
          alt={title}
          sx={{
            width: 38,
            height: 38,
            bgcolor: "#1a1a1a",
            color: "#ffffff",
            fontSize: "0.9rem",
          }}
        >
          {title ? title[0] : ""}
        </Avatar>
        <Typography
          variant="body1"
          sx={{ color: "#ffffff", fontWeight: 400, fontSize: "0.95rem" }}
        >
          {title}
          {subtitle && (
            <Typography
              component="span"
              sx={{ color: "#b0bec5", fontSize: "0.9rem" }}
            >
              , {subtitle}
            </Typography>
          )}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <IconButton
          size="small"
          onClick={onEdit}
          sx={{ color: "#ffffff", "&:hover": { color: "#528212" } }}
        >
          <EditIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <IconButton
          size="small"
          onClick={onDelete}
          sx={{ color: "#ffffff", "&:hover": { color: "#d4849a" } }}
        >
          <CancelIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ListRow;
