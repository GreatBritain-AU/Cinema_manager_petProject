import React, { useEffect, useState } from "react";

import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import UndoIcon from "@mui/icons-material/Undo";
import { Avatar, Box, IconButton, Typography } from "@mui/material";

export const ListRow = ({
  imageSrc,
  title,
  subtitle,
  onEdit,
  onDelete,
  isDeleting,
  onUndo,
  isPoster = false,
  duration = 5000,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isDeleting) {
      setTimeLeft(duration);
      return;
    }

    const intervalTime = 50;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= intervalTime) {
          clearInterval(timer);
          return 0;
        }
        return prev - intervalTime;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isDeleting, duration]);

  const progressPercent = (timeLeft / duration) * 100;
  const progressRatio = timeLeft / duration;

  const opacityValue =
    progressRatio > 0.6
      ? 0.85 + (progressRatio - 0.6) * 0.375
      : 0.05 + (progressRatio / 0.6) * 0.8;

  // Если это постер — высота 72px, если круглый аватар — 62px
  const rowHeight = isPoster ? "72px" : "62px";
  const rowBorderRadius = isPoster ? "10px" : "16px";

  if (isDeleting) {
    return (
      <Box
        onClick={onUndo}
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 16px",
          backgroundColor: "#2d2d2d",
          border: "1px solid #798e91",
          borderRadius: rowBorderRadius,
          height: rowHeight,
          boxSizing: "border-box",
          cursor: "pointer",
          overflow: "hidden",
          opacity: opacityValue,
          transition: "border-color 0.2s ease, opacity 0.1s linear",
          "&:hover": {
            borderColor: "#cbcecd",
            backgroundColor: "#333333",
            opacity: Math.max(opacityValue, 0.7),
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="body1"
            sx={{ color: "#ffffff", fontSize: "0.9rem" }}
          >
            {title} removed
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="body2"
            sx={{ color: "#798e91", fontSize: "0.8rem", fontWeight: 500 }}
          >
            Undo
          </Typography>
          <UndoIcon sx={{ color: "#798e91", fontSize: 16 }} />
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "3px",
            width: `${progressPercent}%`,
            backgroundColor: "#798e91",
            transition: "width 0.05s linear",
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isPoster ? "4px 16px 4px 6px" : "6px 16px 6px 8px",
        backgroundColor: "#2d2d2d",
        border: "1px solid #798e91",
        borderRadius: rowBorderRadius,
        height: rowHeight,
        boxSizing: "border-box",
        transition: "all 0.2s ease",
        "&:hover": {
          borderColor: "#cbcecd",
          boxShadow: "0 0 8px rgba(121, 142, 145, 0.4)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          overflow: "hidden",
        }}
      >
        <Avatar
          src={imageSrc}
          alt={title}
          variant={isPoster ? "rounded" : "circular"}
          sx={{
            // Увеличили размер кружка с 32px до 48px
            width: isPoster ? 42 : 48,
            height: isPoster ? 62 : 48,
            borderRadius: isPoster ? "6px" : "50%",
            bgcolor: "#1a1a1a",
            color: "#ffffff",
            fontSize: "1.1rem", // Сделали крупнее первую букву на случай отсутствия фото
            fontWeight: 600,
            flexShrink: 0,
            "& img": {
              objectFit: "cover",
            },
          }}
        >
          {title ? title[0] : ""}
        </Avatar>
        <Typography
          variant="body1"
          noWrap
          sx={{ color: "#ffffff", fontWeight: 400, fontSize: "0.95rem" }}
        >
          {title}
          {subtitle && (
            <Typography
              component="span"
              sx={{ color: "#b0bec5", fontSize: "0.85rem" }}
            >
              , {subtitle}
            </Typography>
          )}
        </Typography>
      </Box>

      <Box
        sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}
      >
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
