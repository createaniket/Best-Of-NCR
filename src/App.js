import { GoogleLogin } from "@react-oauth/google";
import Home from "./components/Homepage/Home";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Privacypolicy from "./components/PrivacyPolicy/Privacypolicy";

function App() {
  const handleLoginSuccess = (credentialResponse) => {
    alert("Login Successful");
    console.log("Login Success:", credentialResponse);
  };

  const handleLoginFailure = () => {
    alert("Login failed");
    console.log("Login Failed");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
              />
            }
          />

<Route path="/privacy-policy" element={<Privacypolicy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
