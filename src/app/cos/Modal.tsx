import { Modal, Box, Typography, TextField, Grid, Button } from "@mui/material";


type CosModalProps = {
  openModal: boolean;
  handleClose: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitNonRegisteredUser: () => void;
  formData: {
    email: string;
    name: string;
    surname: string;
    country: string;
    postalCode: string;
    city: string;
    address: string;
  };
};

const CosModal = ({
  openModal,
  handleClose,
  handleSubmit,
  handleChange,
  handleSubmitNonRegisteredUser,
  formData,
}: CosModalProps) => {
  return (
    <Modal
      className="modal-z-index"
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Înregistrare comanda
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nume"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Prenume"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tara"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cod postal"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Oras"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Adresa"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={handleSubmitNonRegisteredUser}
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "black",
                  "&:hover": { backgroundColor: "red" },
                }}
              >
                Trimite comanda
              </Button>
            </Grid>
          </Grid>
        </form>
        <Button onClick={handleClose} sx={{ mt: 2 }}>
          Închide
        </Button>
      </Box>
    </Modal>
  );
};

export default CosModal;