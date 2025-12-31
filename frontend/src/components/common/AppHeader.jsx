import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const AppHeader = ({ onAddGame }) => {
  return (
    <HeaderContainer>
      <Button color="inherit" onClick={onAddGame}>
        Agregar juego
      </Button>
    </HeaderContainer>
  );
};

export default AppHeader;
