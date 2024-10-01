import './App.css';
import Navcomponent from './components/Nav';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/signup';
import Home from './components/home';
import Login from './components/login';
import Counter from './components/counter';
import Addproduct from './components/AddProduct';
import Products from './components/Products';
import ProductEdit from './components/productedit';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navcomponent />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addproduct" element={<ProtectedRoute><Addproduct /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/product_edit/:id" element={<ProtectedRoute><ProductEdit /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
