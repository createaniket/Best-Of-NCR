import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";
import "./Login.css";
import { signup, login } from "../../Services/AuthServices";

import BestofNCRLOGO  from '../assets/images/bestofncr.png'

const Login = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleLoginSuccess = (credentialResponse) => {
    console.log("im here")
    alert("Login Successful");
    console.log("Login Success:", credentialResponse.credential);

    handleGoogleLogin(credentialResponse.credential);
   
  };

  const handleGoogleLogin = async (credential) => {
    try {
      const response = await axios.post(`${baseUrl}/user/google-login`, {
        credential,
      });
      const { token, user } = response.data;

      // Save token locally for authentication
      localStorage.setItem("authToken", token);

      console.log("Login successful:", user);
      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error.response.data);
    }
  };

  const handleLoginFailure = () => {
    alert("Login failed");
    console.log("Login Failed");
  };

  const responseFacebook = (response) => {
    console.log("Facebook response:", response);
    if (response.accessToken) {
      // Handle successful login
      console.log("User info:", response.name, response.email);
    } else {
      // Handle login failure
      console.error("Facebook login failed.");
    }
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [formType, setFormType] = useState("login");
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading indicator
    if (formType === "signup") {
      await handleSignup();
    } else {
      await handleLogin();
    }
    setIsLoading(false); // Stop loading indicator after submission completes
  };

  const handleSignup = async () => {
    try {
      const data = await signup(name, email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("expiresIn", data.expiresIn);
      toast.success("Signup successful"); // Show success toast
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again."); // Show error toast
    }
  };

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("expiresIn", data.expiresIn);
      toast.success("Login successful"); // Show success toast
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials."); // Show error toast
    }
  };

  const handleSignupClick = () => {
    setFormType("signup");
  };

  const handleLoginClick = () => {
    setFormType("login");
  };

  return (
    <div>
      <div className={`allinloginsignup ${isLoading ? "faded-content" : ""}`}>
        <div className="loginonform" style={{textAlign:"center"}}>
          <img src={BestofNCRLOGO} alt=""  />
          <div className="wrapper">
            <div className="title-text">
              <div
                className={`title ${formType === "login" ? "login" : "signup"}`}
              >
                {formType === "login" ? "Login Form" : "Signup Form"}
              </div>
            </div>
            <div className="form-container">
              <div className="slide-controls">
                <input
                  type="radio"
                  name="slide"
                  id="login"
                  checked={formType === "login"}
                  onChange={handleLoginClick}
                />
                <input
                  type="radio"
                  name="slide"
                  id="signup"
                  checked={formType === "signup"}
                  onChange={handleSignupClick}
                />
                <label
                  htmlFor="login"
                  className="slide login"
                  onClick={handleLoginClick}
                >
                  Login
                </label>
                <label
                  htmlFor="signup"
                  className="slide signup"
                  onClick={handleSignupClick}
                >
                  Signup
                </label>
                <div className="slider-tab"></div>
              </div>
              {isLoading && <Loader />}{" "}
              {/* Render Loader when isLoading is true */}
              <div className="form-inner">
                <form onSubmit={handleFormSubmit}>
                  {formType === "signup" && (
                    <div className="field">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <div className="field">
                    <input
                      type="text"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="field">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {formType === "signup" && (
                    <div className="field">
                      <input
                        type="password"
                        placeholder="Confirm password"
                        required
                        // Implement confirm password logic if needed
                      />
                    </div>
                  )}
                  <div className="field btn">
                    <div className="btn-layer"></div>
                    <input
                      type="submit"
                      value={formType === "login" ? "Login" : "Signup"}
                    />
                  </div>
                  {formType === "login" && (
                    <div className="pass-link">
                      <a href="/">Forgot password?</a>
                    </div>
                  )}
                  <div className="signup-link">
                    {formType === "login" ? (
                      <>
                        <FacebookLogin
                          appId="2152207445229096" // Replace with your App ID
                          autoLoad={false}
                          fields="name,email,picture"
                          callback={responseFacebook}
                          icon="fa-facebook"
                        />

                        <GoogleLogin
                          onSuccess={handleLoginSuccess}
                          onError={handleLoginFailure}
                        />
                      </>
                    ) : (
                      <>
                        <FacebookLogin
                          appId="2152207445229096" // Replace with your App ID
                          autoLoad={false}
                          fields="name,email,picture"
                          callback={responseFacebook}
                          icon="fa-facebook"
                        />

                        <GoogleLogin
                          onSuccess={handleLoginSuccess}
                          onError={handleLoginFailure}
                        />
                      </>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
