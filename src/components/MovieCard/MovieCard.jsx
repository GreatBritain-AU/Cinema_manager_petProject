import { useState } from "react";
import { Box, Button, Card, Divider, Typography } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";

function MovieCard() {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <Box
      sx={{
        maxWidth: "750px",
        margin: "0 auto",
        marginTop: "120px", 
      }}
    >
      <Card
        sx={{
          padding: "24px",
          backgroundColor: "#242424",
          color: "white",
          borderRadius: "8px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
          height: "auto", // Автоматическая высота под любой размер текста
        }}
      >
        <Box sx={{ display: "flex", gap: "15px", mb: 4 }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            sx={{
              flex: 1,
              backgroundColor: "#29abe2",
              color: "#111",
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px",
            }}
          >
            TO MOVIES
          </Button>

          <Button
            variant="contained"
            startIcon={<EditIcon />}
            sx={{
              flex: 1,
              backgroundColor: "#ffad22",
              color: "#111",
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px",
            }}
          >
            EDIT
          </Button>

          <Button
            variant="contained"
            startIcon={<AddBoxIcon />}
            sx={{
              flex: 1,
              backgroundColor: "#63c568",
              color: "#111",
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px",
            }}
          >
            ADD MOVIE
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", gap: 3 }}>
            <Typography
              onClick={() => setActiveTab("about")}
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: activeTab === "about" ? "#29abe2" : "#888",
                borderBottom: activeTab === "about" ? "3px solid #29abe2" : "3px solid transparent",
                pb: 1,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              ABOUT THE MOVIE
            </Typography>

            <Typography
              onClick={() => setActiveTab("trailer")}
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: activeTab === "trailer" ? "#29abe2" : "#888",
                borderBottom: activeTab === "trailer" ? "3px solid #29abe2" : "3px solid transparent",
                pb: 1,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              MOVIE TRAILER
            </Typography>
          </Box>

          <Typography sx={{ fontSize: "12px", color: "#666", pb: 1 }}>
            Updated at: 13-08-2024 14:46
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: "#333", mb: 3 }} />

        {activeTab === "about" && (
          <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
            <Box
              component="img"
              src="https://tmdb.org"
              alt="The Shawshank Redemption"
              sx={{
                width: "240px",
                height: "360px",
                objectFit: "cover",
                borderRadius: "4px",
                backgroundColor: "#222",
                flexShrink: 0,
              }}
            />

            <Box sx={{ flex: 1, minWidth: 0, height: "auto" }}>
              <Typography
                sx={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  mb: 1.5,
                  lineHeight: 1.1,
                }}
              >
                The Shawshank Redemption
              </Typography>

              <Typography sx={{ fontSize: "16px", mb: 1.5, color: "#fff" }}>
                <b>Movie year:</b> 1994
              </Typography>

              <Typography sx={{ fontSize: "16px", mb: 3, color: "#fff" }}>
                <b>Genre:</b> Drama
              </Typography>

              <Typography sx={{ fontSize: "16px", mb: 3, color: "#fff" }}>
                <b>Studios:</b>{" "}
                <span style={{ borderBottom: "1px dashed #fff" }}>
                  Columbia Pictures
                </span>
                ,{" "}
                <span style={{ borderBottom: "1px dashed #fff" }}>
                  Warner Bros.
                </span>
              </Typography>

              <Typography sx={{ fontSize: "16px", mb: 3, color: "#fff" }}>
                <b>Directors:</b>{" "}
                <span style={{ borderBottom: "1px dashed #fff" }}>
                  Frank Darabont
                </span>
              </Typography>

              <Typography sx={{ fontSize: "16px", mb: 4, color: "#fff" }}>
                <b>Actors:</b>{" "}
                <span style={{ borderBottom: "1px dashed #fff" }}>
                  Morgan Freeman
                </span>
                ,{" "}
                <span style={{ borderBottom: "1px dashed #fff" }}>Tim Robbins</span>
                ,{" "}
                <span style={{ borderBottom: "1px dashed #fff" }}>
                  William Sadler
                </span>
              </Typography>

              <Typography
                sx={{
                  fontSize: "15px",
                  lineHeight: 1.6,
                  textAlign: "justify",
                  color: "#e0e0e0",
                  whiteSpace: "normal", 
                  overflow: "visible",  
                }}
              >
                In early 1947, Portland, Maine banker Andy Dufresne arrives at
                Shawshank State Prison to serve two consecutive life sentences for
                murdering his wife and her lover. He is befriended by Ellis "Red"
                Redding, a contraband smuggler serving a life sentence, who procures
                a rock hammer and a large poster of Rita Hayworth for Andy. Assigned
                to work in the prison laundry, Andy is frequently raped by "the
                Sisters" prison gang and their leader, Bogs Diamond. In 1949, Andy
                overhears the captain of the guard complaining about being taxed on
                an inheritance and helps him legally shelter the money. After being
                nearly beaten to death by Bogs, Andy is reassigned to the prison library
                to assist elderly inmate Brooks Hatlen, a pretext to manage financial
                matters for other prison staff, guards from other prisons, and the
                warden himself.
              </Typography>
            </Box>
          </Box>
        )}

        {activeTab === "trailer" && (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%", 
              backgroundColor: "#000",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <Box
              component="iframe"
              src="https://youtu.be/NmzuHjWmXOc?si=51QQwZfdTk4n1P11" 
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </Box>
        )}
      </Card>
    </Box>
  );
}

export default MovieCard;











