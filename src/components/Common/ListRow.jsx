import React, { useEffect, useState } from "react";

import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import UndoIcon from "@mui/icons-material/Undo";
import {
  alpha,
  Avatar,
  Box,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";

export const ListRow = ({
  imageSrc,
  title,
  subtitle,
  onEdit,
  onDelete,
  isDeleting,
  onUndo,
  isPoster = false,
  imageFit = "cover", // "contain" — для логотипов студий
  icon = null, // иконка вместо буквы, если нет картинки (например, жанры)
  duration = 5000,
}) => {
  const theme = useTheme();
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
          backgroundColor: theme.palette.custom.surfaceAlt,
          border: `1px solid ${theme.palette.error.light || theme.palette.divider}`,
          borderRadius: rowBorderRadius,
          height: rowHeight,
          boxSizing: "border-box",
          cursor: "pointer",
          overflow: "hidden",
          opacity: opacityValue,
          transition:
            "border-color 0.2s ease, opacity 0.1s linear, background-color 0.2s ease",
          "&:hover": {
            borderColor: theme.palette.error.main,
            backgroundColor: theme.palette.action.hover,
            opacity: Math.max(opacityValue, 0.7),
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.primary, fontSize: "0.9rem" }}
          >
            {title} removed
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.primary.main,
              fontSize: "0.8rem",
              fontWeight: 600,
            }}
          >
            Undo
          </Typography>
          <UndoIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "3px",
            width: `${progressPercent}%`,
            backgroundColor: theme.palette.primary.main,
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
        // Строка списка — отдельный уровень поверхности внутри белой карточки
        backgroundColor: theme.palette.custom.surfaceAlt,
        border: `1px solid ${theme.palette.custom.itemBorder}`,
        borderRadius: rowBorderRadius,
        height: rowHeight,
        boxSizing: "border-box",
        transition: "all 0.2s ease",
        "&:hover": {
          borderColor: theme.palette.primary.main,
          backgroundColor: theme.palette.action.hover,
          boxShadow: `0 2px 8px ${
            theme.palette.mode === "dark"
              ? "rgba(0, 0, 0, 0.4)"
              : "rgba(0, 0, 0, 0.08)"
          }`,
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
            width: isPoster ? 42 : 48,
            height: isPoster ? 62 : 48,
            borderRadius: isPoster ? "6px" : "50%",
            // Для логотипов — нейтральный фон, чтобы и белые, и тёмные были видны
            bgcolor: icon
              ? alpha(theme.palette.primary.main, 0.14)
              : imageFit === "contain"
                ? "#78909C"
                : theme.palette.action.selected,
            color: icon
              ? theme.palette.primary.main
              : theme.palette.text.primary,
            fontSize: "1.1rem",
            fontWeight: 600,
            flexShrink: 0,
            "& img": {
              objectFit: imageFit,
              boxSizing: "border-box",
              padding: imageFit === "contain" ? "5px" : 0,
            },
          }}
        >
          {icon || (title ? title[0] : "")}
        </Avatar>
        <Typography
          variant="body1"
          noWrap
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 500,
            fontSize: "0.95rem",
          }}
        >
          {title}
          {subtitle && (
            <Typography
              component="span"
              sx={{ color: theme.palette.text.secondary, fontSize: "0.85rem" }}
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
          sx={{
            color: theme.palette.text.secondary,
            "&:hover": { color: theme.palette.primary.main },
          }}
        >
          <EditIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <IconButton
          size="small"
          onClick={onDelete}
          sx={{
            color: theme.palette.text.secondary,
            "&:hover": { color: theme.palette.error.main },
          }}
        >
          <CancelIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ListRow;
