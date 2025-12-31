import { Box, Typography } from "@mui/material";
import { useGetAllGamesQuery } from "../services/gameService";
import CardGame from "../components/CardGame";

const Games = () => {
  const { data: games, isLoading } = useGetAllGamesQuery();

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}
    >
      <Typography>Juegos Actuales</Typography>

      {isLoading ? (
        <Typography>Cargando juegos...</Typography>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 3,
            padding: 2,
            alignItems: "stretch",
          }}
        >
          {games?.map((game) => (
            <CardGame key={game._id} game={game} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Games;
