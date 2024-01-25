import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { Container } from "react-bootstrap";

import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import Home from "./components/Home";
import DeatilsOfProduct from "./components/views/DeatilsOfProduct";
import ShoppingCarts from "./components/views/ShoppingCarts";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Profile from "./components/views/Profile";
import Shipping from "./components/views/Shipping";
import Payment from "./components/views/Payment";
import PlaceOrder from "./components/views/PlaceOrder";
import OrderDetails from "./components/views/OrderDetails";

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <main>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/product/:id" element={<DeatilsOfProduct />} exact />
            <Route
              path="/ShoppingCarts/:id?/:qty?"
              element={<ShoppingCarts />}
              exact
            />
            <Route path="https://frontend-for-ecommerce.onrender.com/login" element={<Login />} exact />
            <Route path="https://frontend-for-ecommerce.onrender.com/register" element={<Register />} exact />
            <Route path="https://frontend-for-ecommerce.onrender.com/profile" element={<Profile />} exact />
            <Route path="https://frontend-for-ecommerce.onrender.com/shipping" element={<Shipping />} exact />
            <Route path="https://frontend-for-ecommerce.onrender.com/payment" element={<Payment />} exact />
            <Route path="https://frontend-for-ecommerce.onrender.com/placeOrder" element={<PlaceOrder />} exact />
            <Route path="https://frontend-for-ecommerce.onrender.com/orders/:id" element={<OrderDetails />} exact />
          </Routes>
        </main>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
