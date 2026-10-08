import { useState } from "react";

import {
  Autocomplete,
  Box,
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RestartAltIcon from "@mui/icons-material/FormatAlignJustify";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BusinessIcon from "@mui/icons-material/Business";
import SaveIcon from "@mui/icons-material/Save";

const steps = [
  "General",
  "Directors",
  "Actors",
  "Studios",
  "Storyline",
];

const genreOptions = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
];

const peopleOptions = [
  "Christopher Nolan",
  "Steven Spielberg",
  "James Cameron",
  "Martin Scorsese",
  "Quentin Tarantino",
  "Matthew McConaughey",
  "Anne Hathaway",
  "Leonardo DiCaprio",
  "Tom Hanks",
  "Brad Pitt",
  "Robert Downey Jr.",
  "Emma Stone",
];

const studioOptions = [
  "Warner Bros.",
  "Universal Pictures",
  "Paramount Pictures",
  "20th Century Studios",
  "Sony Pictures",
  "Walt Disney Pictures",
  "Marvel Studios",
  "Netflix",
];

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    backgroundColor: "#242424",

    "& fieldset": {
      borderColor: "#777",
    },

    "&:hover fieldset": {
      borderColor: "#aaa",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#90caf9",
    },
  },

  "& .MuiInputLabel-root": {
    color: "#aaa",
  },

  "& .MuiSvgIcon-root": {
    color: "#fff",
  },

  "& .MuiInputBase-input::placeholder": {
    color: "#aaa",
    opacity: 1,
  },
};

function CinemaService({ onClose, onSave }) {
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    year: "",
    poster: "",
    trailer: "",
    directors: [],
    actors: [],
    studios: [],
    storyline: "",
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // =========================
  // DIRECTORS
  // =========================

  const addDirector = () => {
    setFormData((prev) => ({
      ...prev,
      directors: [
        ...prev.directors,
        {
          id: Date.now(),
          name: "",
        },
      ],
    }));
  };

  const changeDirector = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      directors: prev.directors.map((item) =>
        item.id === id
          ? {
              ...item,
              name: value || "",
            }
          : item
      ),
    }));
  };

  const removeDirector = (id) => {
    setFormData((prev) => ({
      ...prev,
      directors: prev.directors.filter(
        (item) => item.id !== id
      ),
    }));
  };

  // =========================
  // ACTORS
  // =========================

  const addActor = () => {
    setFormData((prev) => ({
      ...prev,
      actors: [
        ...prev.actors,
        {
          id: Date.now(),
          name: "",
        },
      ],
    }));
  };

  const changeActor = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      actors: prev.actors.map((item) =>
        item.id === id
          ? {
              ...item,
              name: value || "",
            }
          : item
      ),
    }));
  };

  const removeActor = (id) => {
    setFormData((prev) => ({
      ...prev,
      actors: prev.actors.filter(
        (item) => item.id !== id
      ),
    }));
  };

  // =========================
  // STUDIOS
  // =========================

  const addStudio = () => {
    setFormData((prev) => ({
      ...prev,
      studios: [
        ...prev.studios,
        {
          id: Date.now(),
          name: "",
        },
      ],
    }));
  };

  const changeStudio = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      studios: prev.studios.map((item) =>
        item.id === id
          ? {
              ...item,
              name: value || "",
            }
          : item
      ),
    }));
  };

  const removeStudio = (id) => {
    setFormData((prev) => ({
      ...prev,
      studios: prev.studios.filter(
        (item) => item.id !== id
      ),
    }));
  };

  // =========================
  // NAVIGATION
  // =========================

  const handleNext = () => {
    setActiveStep((prev) =>
      Math.min(prev + 1, steps.length - 1)
    );
  };

  const handleBack = () => {
    if (activeStep === 0) {
      onClose();
      return;
    }

    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setFormData({
      title: "",
      genre: "",
      year: "",
      poster: "",
      trailer: "",
      directors: [],
      actors: [],
      studios: [],
      storyline: "",
    });

    setActiveStep(0);
  };

  const handleSave = () => {
    const movie = {
      ...formData,

      directors: formData.directors.filter(
        (item) => item.name
      ),

      actors: formData.actors.filter(
        (item) => item.name
      ),

      studios: formData.studios.filter(
        (item) => item.name
      ),
    };

    if (onSave) {
      onSave(movie);
    } else {
      onClose();
    }
  };

  // =========================
  // GENERAL
  // =========================

  const renderGeneral = () => (
    <Box>
      <Typography
        sx={{
          color: "#fff",
          marginBottom: 1,
          fontSize: 14,
        }}
      >
        Movie title
      </Typography>

      <TextField
        fullWidth
        size="small"
        value={formData.title}
        onChange={(e) =>
          updateField("title", e.target.value)
        }
        sx={inputStyle}
      />

      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          marginTop: 1.5,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              color: "#fff",
              marginBottom: 1,
              fontSize: 14,
            }}
          >
            Genre movie
          </Typography>

          <Autocomplete
            size="small"
            options={genreOptions}
            value={formData.genre || null}
            onChange={(event, value) =>
              updateField("genre", value || "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                sx={inputStyle}
              />
            )}
          />
        </Box>

        <Box sx={{ width: 95 }}>
          <Typography
            sx={{
              color: "#fff",
              marginBottom: 1,
              fontSize: 14,
            }}
          >
            Release year
          </Typography>

          <TextField
            fullWidth
            size="small"
            type="number"
            value={formData.year}
            onChange={(e) =>
              updateField("year", e.target.value)
            }
            sx={inputStyle}
          />
        </Box>
      </Box>

      <Typography
        sx={{
          color: "#fff",
          marginTop: 1.5,
          marginBottom: 1,
          fontSize: 14,
        }}
      >
        Poster URL
      </Typography>

      <TextField
        fullWidth
        size="small"
        value={formData.poster}
        onChange={(e) =>
          updateField("poster", e.target.value)
        }
        sx={inputStyle}
      />

      <Typography
        sx={{
          color: "#fff",
          marginTop: 1.5,
          marginBottom: 1,
          fontSize: 14,
        }}
      >
        Trailer URL (Youtube only)
      </Typography>

      <TextField
        fullWidth
        size="small"
        value={formData.trailer}
        onChange={(e) =>
          updateField("trailer", e.target.value)
        }
        sx={inputStyle}
      />
    </Box>
  );

  // =========================
  // DIRECTORS
  // =========================

  const renderDirectors = () => (
    <Box>
      <Typography
        variant="h6"
        sx={{
          color: "#fff",
          marginBottom: 2,
        }}
      >
        Directors
      </Typography>

      <Box
        sx={{
          border: "1px solid #ddd",
          borderRadius: 1,
          padding: 1.5,
        }}
      >
        {formData.directors.map((director) => (
          <Box
            key={director.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              marginBottom: 1,
            }}
          >
            <Autocomplete
              size="small"
              fullWidth
              options={peopleOptions}
              value={director.name || null}
              onChange={(event, value) =>
                changeDirector(
                  director.id,
                  value
                )
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Director"
                  sx={inputStyle}
                />
              )}
            />

            <IconButton
              onClick={() =>
                removeDirector(director.id)
              }
              sx={{
                color: "#f44336",
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Button
          variant="contained"
          size="small"
          onClick={addDirector}
          sx={{
            marginTop: 1,
            backgroundColor: "#90caf9",
            color: "#222",

            "&:hover": {
              backgroundColor: "#64b5f6",
            },
          }}
        >
          ADD DIRECTOR
        </Button>
      </Box>
    </Box>
  );

  // =========================
  // ACTORS
  // =========================

  const renderActors = () => (
    <Box>
      <Typography
        variant="h6"
        sx={{
          color: "#fff",
          marginBottom: 2,
        }}
      >
        Actors
      </Typography>

      <Box
        sx={{
          border: "1px solid #ddd",
          borderRadius: 1,
          padding: 1.5,
        }}
      >
        {formData.actors.map((actor) => (
          <Box
            key={actor.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              marginBottom: 1,
            }}
          >
            <Autocomplete
              size="small"
              fullWidth
              options={peopleOptions}
              value={actor.name || null}
              onChange={(event, value) =>
                changeActor(
                  actor.id,
                  value
                )
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Actor"
                  sx={inputStyle}
                />
              )}
            />

            <IconButton
              onClick={() =>
                removeActor(actor.id)
              }
              sx={{
                color: "#f44336",
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Button
          variant="contained"
          size="small"
          startIcon={<PersonAddIcon />}
          onClick={addActor}
          sx={{
            marginTop: 1,
            backgroundColor: "#90caf9",
            color: "#222",

            "&:hover": {
              backgroundColor: "#64b5f6",
            },
          }}
        >
          ADD ACTOR
        </Button>
      </Box>
    </Box>
  );

  // =========================
  // STUDIOS
  // =========================

  const renderStudios = () => (
    <Box>
      <Typography
        variant="h6"
        sx={{
          color: "#fff",
          marginBottom: 2,
        }}
      >
        Studios
      </Typography>

      <Box
        sx={{
          border: "1px solid #ddd",
          borderRadius: 1,
          padding: 1.5,
        }}
      >
        {formData.studios.map((studio) => (
          <Box
            key={studio.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              marginBottom: 1,
            }}
          >
            <Autocomplete
              size="small"
              fullWidth
              options={studioOptions}
              value={studio.name || null}
              onChange={(event, value) =>
                changeStudio(
                  studio.id,
                  value
                )
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Studio"
                  sx={inputStyle}
                />
              )}
            />

            <IconButton
              onClick={() =>
                removeStudio(studio.id)
              }
              sx={{
                color: "#f44336",
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Button
          variant="contained"
          size="small"
          startIcon={<BusinessIcon />}
          onClick={addStudio}
          sx={{
            marginTop: 1,
            backgroundColor: "#90caf9",
            color: "#222",

            "&:hover": {
              backgroundColor: "#64b5f6",
            },
          }}
        >
          ADD STUDIO
        </Button>
      </Box>
    </Box>
  );

  // =========================
  // STORYLINE
  // =========================

  const renderStoryline = () => (
    <Box>
      <Typography
        variant="h6"
        sx={{
          color: "#fff",
          marginBottom: 2,
        }}
      >
        Storyline
      </Typography>

      <TextField
        fullWidth
        multiline
        minRows={10}
        value={formData.storyline}
        onChange={(e) =>
          updateField(
            "storyline",
            e.target.value
          )
        }
        placeholder="Brief storyline of the movie..."
        sx={inputStyle}
      />
    </Box>
  );

  // =========================
  // CURRENT STEP
  // =========================

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return renderGeneral();

      case 1:
        return renderDirectors();

      case 2:
        return renderActors();

      case 3:
        return renderStudios();

      case 4:
        return renderStoryline();

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: 4,
        paddingBottom: 3,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: 350,
          minHeight: 620,

          backgroundColor: "#242424",
          color: "#fff",

          padding: 2.5,
          borderRadius: 1,

          boxSizing: "border-box",
        }}
      >
        {/* TITLE */}

        <Typography
          variant="h5"
          align="center"
          sx={{
            fontWeight: 400,
            marginBottom: 3,
          }}
        >
          Cinema service
        </Typography>

        {/* STEPPER */}

        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            marginBottom: 3,

            "& .MuiStepLabel-label": {
              color: "#aaa",
              fontSize: 13,
            },

            "& .MuiStepLabel-label.Mui-active": {
              color: "#fff",
            },

            "& .MuiStepLabel-label.Mui-completed": {
              color: "#fff",
            },

            "& .MuiStepIcon-root": {
              color: "#777",
            },

            "& .MuiStepIcon-root.Mui-active": {
              color: "#90caf9",
            },

            "& .MuiStepIcon-root.Mui-completed": {
              color: "#90caf9",
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* CONTENT */}

        {renderStep()}

        {/* BUTTONS */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            marginTop: 3,
          }}
        >
          <Button
            variant="contained"
            size="small"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{
              backgroundColor: "#ffb300",
              color: "#222",

              "&:hover": {
                backgroundColor: "#ffa000",
              },
            }}
          >
            BACK
          </Button>

          {activeStep < steps.length - 1 ? (
            <Button
              variant="contained"
              size="small"
              endIcon={<ArrowForwardIcon />}
              onClick={handleNext}
              sx={{
                backgroundColor: "#90caf9",
                color: "#222",

                "&:hover": {
                  backgroundColor: "#64b5f6",
                },
              }}
            >
              NEXT
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{
                backgroundColor: "#4caf50",
                color: "#fff",

                "&:hover": {
                  backgroundColor: "#388e3c",
                },
              }}
            >
              SAVE
            </Button>
          )}

          <Button
            variant="contained"
            size="small"
            startIcon={<RestartAltIcon />}
            onClick={handleReset}
            sx={{
              backgroundColor: "#f44336",
              color: "#fff",

              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
          >
            RESET
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default CinemaService;


