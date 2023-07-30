import React, {useState} from "react";
import { Typography, Modal, Box, TextField, Button, 
  // Avatar 
} from "@mui/material";
// import {user} from './users'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid white",
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

const LogInModal = ({ open, setOpen }) => {

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(`login: ${login}`, `password: ${password}`)
    setLogin('')
    setPassword('')
    setOpen(false)
  }


  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
          Авторізація
        </Typography>
        {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
        <form
          // onSubmit={handleSubmit}
          style={{ mt: "2rem" }}
        >
          <TextField
            label="Логін"
            name="login"
            value={login}
              onChange={(e) => setLogin(e.target.value)}
            //   error={!!errors.firstName}
            //   helperText={errors.firstName}
            sx={{ mt: "1rem" }}
            fullWidth
            required
          />
          <TextField
            label="Пароль"
            name="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            //   error={!!errors.lastName}
            //   helperText={errors.lastName}
            sx={{ mt: "1rem" }}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: "1rem" }}
            onClick={handleSubmit}
            //   disabled={!formValid}
          >
           Увійти
           {/* <Avatar sx={{bgcolor: 'orange'}}>JL</Avatar> */}
          </Button>
        </form>
        {/* </Typography> */}
      </Box>
    </Modal>
  );
};

export default LogInModal;
