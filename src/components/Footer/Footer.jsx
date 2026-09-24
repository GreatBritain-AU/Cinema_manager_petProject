import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        minHeight: 63,
        px: 3,
        py: 2,
        gap: 0.5,
        // footerBg может быть градиентом, поэтому именно `background`
        background: theme.palette.custom.footerBg,
        borderTop: `1px solid ${theme.palette.custom.barBorder}`, // Линия над подвалом
        transition: "border-color 0.3s ease",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: 13,
          color: theme.palette.custom.onBar, // Основной текст
        }}
      >
        You can find out all information regarding the cinema's operations by
        calling +38 (066) 947-47-32
      </Typography>

      <Typography
        variant="body2"
        sx={{
          fontSize: 13,
          color: theme.palette.custom.onBarMuted, // Второстепенный текст
        }}
      >
        Copyright 2026 Cinema Manager
      </Typography>
    </Box>
  );
}
