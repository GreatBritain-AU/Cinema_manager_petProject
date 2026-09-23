import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
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
        gap: 0.5,
        backgroundColor: "#211e1e",
        color: "#fff",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Typography 
        variant="body2"
        sx={{
            fontSize: 13,
        }}
      >
        You can find out all information regarding the cinema's operations by calling +38 (066) 947-47-32 
      </Typography>

      <Typography 
        variant="body2" 
        color="rgba(255,255,255,0.6)"
        sx={{
                fontSize: 13,
        }}
      >
        Copyright 2026 Cinema Manager
      </Typography>

      <Typography 
        variant="body2" 
        color="rgba(255,255,255,0.6)"
        sx={{
            fontSize: 13,
        }}
      >
        Copyright 
      </Typography>
    </Box>
  );
}