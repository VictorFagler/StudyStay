import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import About from "./pages/About";
import RentOut from "./pages/RentOut";

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then(console.log);

function App() {
  return (
    <div className="App">
      <div className="main-content">
        <Routes>
          <Route path="/" index element={<IndexPage />} />
          <Route path="/login" index element={<Login />} />
          <Route path="/about" index element={<About />} />
          <Route path="/rentout" index element={<RentOut />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
