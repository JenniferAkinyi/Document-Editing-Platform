import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import animation from '../../assets/images/730_generated.jpg'
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setErrorMessage(null);
    
    try {
        navigate("/"); 
      } catch (error: any) {
        setErrorMessage("Failed to log in. Please check your credentials.");
      }
    };

  return (
    <section>
      <div className="login-image">
        <img src={ animation } alt="image" />
      </div>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Login</button>
          <p className="account">
            Don't have an account?{" "}
            <Link to="/register" className="signup-link">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
