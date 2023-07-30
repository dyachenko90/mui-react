import { Outlet } from "react-router-dom"
import Header from "./Header"
import Cart from './Cart';
import { Snack } from './Snack';
import { Container } from '@mui/material';


const App = () => {
 
    return (
        <>
            <Header />
            <Cart /> 
            <Container sx={{mt: '1rem', }}>
                <Outlet />
            </Container>
            <Snack />
        </>
      )
    }

export default App;


