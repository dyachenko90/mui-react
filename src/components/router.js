import { Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import App from './App'
import GoodsList from './GoodsList'
import GoodCard from './GoodCard'
import Order from './Order'
import Registration from './Registration'


export const router = createBrowserRouter(createRoutesFromElements(

    <Route path='/' element={<App />}>
      <Route index element={<GoodsList />} />
      <Route path='products/:id' element={<GoodCard />} />
      <Route path='order' element={<Order />} />
      <Route path='auth' element={<Registration />} />
    </Route>

))

