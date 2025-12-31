import { Box, Typography } from "@mui/material";

const CardGame = ({ game }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        gap: "10px",
        backgroundColor: "#ffffff",
        boxShadow: 3,
      }}
    >
      <Typography variant="h5">{game?.name}</Typography>

      <Box
        sx={{
          width: "100%",
          height: "250px",
          borderRadius: 2,
          overflow: "hidden",
          backgroundColor: "#f2f2f2",
          boxShadow: 3,
        }}
      >
        <img
          src={`data:image/png;base64,${game?.imageBase64}`}
          alt={game.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6">{game?.creationDate}</Typography>

        <Typography variant="h6">{game?.categoryType}</Typography>
      </Box>
    </Box>
  );
};

export default CardGame;
