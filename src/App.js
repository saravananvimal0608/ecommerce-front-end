import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddAndEditUser from "./users/RegisterUser"
import LoginUser from './users/LoginUser'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'
import Home from './components/Home'
import PrivateRouter from './components/PrivateRouter'
import Products from './components/Products'
import Carts from './components/Carts'
import SingleProduct from './components/SingleProduct'

// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<AddAndEditUser />} />
        <Route path="/" element={<PrivateRouter> <Layout /> </PrivateRouter >}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/carts" element={<Carts />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter >
  );
}

export default App;
