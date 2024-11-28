import { GoogleLogin } from '@react-oauth/google';
import Home from './components/Homepage/Home';

function App() {

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);
  };

  const handleLoginFailure = () => {
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
