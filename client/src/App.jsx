import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import About from "./pages/About";
import RentOut from "./pages/RentOut";
import Register from "./pages/Register";
import axios from "axios";
import { Toaster } from "react-hot-toast";

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then(console.log);

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <div className="main-content">
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" index element={<IndexPage />} />
          <Route path="/about" index element={<About />} />
          <Route path="/rentout" index element={<RentOut />} />
          <Route path="/register" index element={<Register />} />
          <Route path="/login" index element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
