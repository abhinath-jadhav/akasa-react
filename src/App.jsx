import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Admin,
  Cart,
  Foods,
  Home,
  Layout,
  Login,
  Menu,
  NotFound,
  Register,
} from "./Pages";
import Payment from "./Pages/Payment";
import Order from "./Pages/Order";
import Auth from "./Pages/Auth";
import { EmptyCart } from "./Components";
import Inventory from "./Pages/Inventory";
const App = () => {
  return (
    <Router>
      <div className="max-w-screen-sm md:max-w-full">
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/emptycart" element={<EmptyCart />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/auth" element={<Auth />}>
              <Route path="orders" element={<Order />} />
              <Route path="payment" element={<Payment />} />
            </Route>

            <Route path="/admin" element={<Admin />}>
              <Route path="foods" element={<Foods />} />
              <Route path="inventory" element={<Inventory />} />
            </Route>
          </Route>
          {/* 404 Route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
