import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { closeSnackbar } from "../store/snackbarSlice";

export const Snack = () => {

  const dispatch = useDispatch()
  const isOpenSnack = useSelector(state => state.snackbar.isOpenSnack)
  const message = useSelector(state => state.snackbar.message)
  
  const handleCloseSnack = () => {
    dispatch(closeSnackbar());
  };
  
    return (
    <Snackbar 
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        open={isOpenSnack}
        onClose={handleCloseSnack}
        autoHideDuration={2000}
    >
        <Alert severity='success' sx={{fontSize: '1rem'}} variant='outlined'>
          {message}
        </Alert>
    </Snackbar>
  )
}
