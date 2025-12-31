import {
  Box,
  Button,
  Divider,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useCreateGameMutation } from "../../services/gameService";
import { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { CATEGORY } from "../../constants/category";

const ModalContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

const AddGameModal = ({ open, handleClose }) => {
  const [createGame, { error, isError, isSuccess, isLoading }] =
    useCreateGameMutation();

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
    if (isError) alert(error?.data?.message);
  }, [error, isSuccess, handleClose, isError]);

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalContent>
        <Typography variant="h6">Agregar Juego</Typography>

        <Divider sx={{ my: 2 }} />

        <Formik
          initialValues={{
            name: "",
            creationDate: "",
            categoryType: "",
          }}
          onSubmit={(values) => {
            createGame(values);
          }}
        >
          {({ values, handleChange }) => (
            <Form>
              <Box display="flex" flexDirection="column" gap={2}>
                <Field
                  as={TextField}
                  name="name"
                  label="Nombre del juego"
                  value={values.name}
                  onChange={handleChange}
                />

                <Field
                  as={TextField}
                  type="date"
                  name="creationDate"
                  value={values.creationDate}
                  onChange={handleChange}
                />

                <Field
                  as={TextField}
                  select
                  name="categoryType"
                  label="Categoría"
                  value={values.categoryType}
                  onChange={handleChange}
                >
                  {Object.entries(CATEGORY).map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Field>

                <Box display="flex" justifyContent="flex-end" gap={1}>
                  <Button onClick={handleClose}>Cancelar</Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Guardando..." : "Guardar"}
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default AddGameModal;
