import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Routes, Route, Navigate } from 'react-router-dom';
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Orders from "./pages/Orders";
import { useSelector } from "react-redux";
import NotFound from "./pages/NotFound";

const App = () => {

  const userState = useSelector((state) => state.user);
  const user = userState.currentUser;

  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:category' element={<ProductList />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/success' element={user ? <Success /> : <Navigate to="/"/>} />
        <Route path='/cancel' element={user ? <Cancel /> : <Navigate to="/"/> } />
        <Route path='/orders' element={user ? <Orders /> : <Navigate to="/"/> } />
        <Route path='/register' element={user ? <Navigate to="/"/> : <Register />} />
        <Route path='/login' element={user ? <Navigate to="/"/> : <Login />} />
        <Route path='*' element={ <NotFound/> } />
      </Routes>
  );
}

export default App;
