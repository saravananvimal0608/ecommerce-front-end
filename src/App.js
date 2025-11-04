import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddAndEditUser from "./users/RegisterUser";
import LoginUser from './users/LoginUser';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import PrivateRouter from './components/PrivateRouter';
import Products from './components/Products';
import About from './components/AboutUs';
import SingleProduct from './components/SingleProduct';
import 'swiper/css';
import 'swiper/css/navigation';
import Profile from './components/Profile';
import CheckToken from './components/CheckToken';
import IsAdmin from './components/IsAdmin'
import AdminLayout from './components/admin/AdminLayout'
import AddCategory from './components/admin/AddCategory'
import ViewCategory from './components/admin/ViewCategory'
import AddProduct from './components/admin/AddProduct'
import Viewproduct from './components/admin/ViewProducts'
import Dashboard from './components/admin/Dashboard'
import NotFound from './components/NotFound'
import ScrollToP from './components/ScrollTop'
import CartPage from './components/Carts'
import Address from './components/Address';

function AppWrapper() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!isAuthPage && <CheckToken />}
      <Routes>
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<AddAndEditUser />} />
        <Route path="/admin" element={<IsAdmin><AdminLayout /></IsAdmin>}>
          <Route index element={<> <Dashboard /> </>} />
          <Route path="addcategory" element={<AddCategory />} />
          <Route path="viewcategory" element={<ViewCategory />} />
          <Route path="editcategory/:id" element={<AddCategory />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="viewproduct" element={<Viewproduct />} />
          <Route path="editproduct/:id" element={<AddProduct />} />
        </Route>
        <Route path="/" element={<PrivateRouter><Layout /></PrivateRouter>}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/editprofile/:id" element={<AddAndEditUser />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="address" element={<Address />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes >
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToP />
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
