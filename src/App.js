import { GoogleLogin } from '@react-oauth/google';
import Home from './components/Homepage/Home';

function App() {

  const handleLoginSuccess = (credentialResponse) => {
    alert("Login Successful")
    console.log("Login Success:", credentialResponse);
  };

  const handleLoginFailure = () => {

    alert("Login failed")
    console.log("Login Failed");
  };

  return (
    <div className="App">
      
      <Home />
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    
    </div>
  );
}

export default App;
