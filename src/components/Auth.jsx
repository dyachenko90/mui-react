import { useEffect, useState } from "react";
import { getAuth, signOut, signInWithRedirect} from "firebase/auth";
import { useDispatch } from "react-redux";
import { app, googleAuthProvider } from "../firebase";
import { logIn, logOut } from "../store/authSlice";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton, Box, Avatar, Tooltip, Menu, MenuItem } from "@mui/material";
import { useAuth } from '../hooks/use-auth';

export const AuthProvider = () => {
  
  const [anchorEl, setAnchorEl] = useState(null); 
  const { isAuth, displayName } = useAuth();
  
  const auth = getAuth(app);

  const dispatch = useDispatch();
  
  
  useEffect(() => {
    if (isAuth) {
      setAnchorEl(null);
    }
  }, [isAuth]);



useEffect(() => {
  auth.onAuthStateChanged((maybeUser) => {
    if (maybeUser != null) {
      const userData = {
        displayName: maybeUser.displayName,
        uid: maybeUser.uid,
        email: maybeUser.email,
      };
      dispatch(logIn(userData));
    } else {
      dispatch(logOut());
    }
  });
}, [auth, dispatch])


  const handleLogIn = () => {
      signInWithRedirect(auth, googleAuthProvider)
        .then((credentials) => dispatch(logIn(credentials.user)))
        .catch((e) => console.error(e));
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(logOut());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null); 
  };

  return isAuth ? (
    <Box sx={{display: 'flex', alignItems: 'center', gap: '0.5rem', p: '0.5rem'}}>
        <Tooltip title={displayName}>
          <Avatar sx={{ bgcolor: '#ff9800'}} onClick={handleMenuOpen}>
            {isAuth && displayName.split(' ').length >= 2 ?
            displayName.split(' ')[0][0] + displayName.split(' ')[1][0] :
            displayName[0]+displayName[1]
            }
          </Avatar>
        </Tooltip>
        <Menu 
        anchorEl={anchorEl} 
        open={Boolean(anchorEl)} 
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        >
        {isAuth && (
          <MenuItem onClick={handleLogOut} sx={{display: 'flex', gap: '0.5rem'}}>
            <LogoutIcon color="action" /> Logout
          </MenuItem>
        )}
      </Menu>
  </Box>
  ) : (
    <IconButton rel="noopener" color="inherit" onClick={handleLogIn}>
      <LoginIcon />
    </IconButton>
  );
};
