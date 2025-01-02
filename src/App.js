
import Home from "./components/Homepage/Home";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Privacypolicy from "./components/PrivacyPolicy/Privacypolicy";
import Login from "./components/Login/Login";
import Singleshop from "./components/pages/Singleshop";

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/shop/:id" element={<Singleshop />} />

          <Route path="/login" element={  <Login />   } />

          <Route path="/privacy-policy" element={<Privacypolicy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
