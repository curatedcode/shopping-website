import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element={<NavBar />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="*" element={<NotFound />}/>
      </Routes>    
    </BrowserRouter>
    </>
  );
}

export default App;
