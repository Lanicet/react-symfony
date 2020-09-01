import React, { useState, useContext } from "react";
import AuthAPI from "../services/authAPI";

import Field from "../components/forms/Field";
import { toast } from "react-toastify";
import AuthContext from "../contexts/AuthContext";

const LoginPage = ({ history }) => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");

  // handle Field
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
    setCredentials({ ...credentials, [name]: value });
  };

  // handle submit 
  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await AuthAPI.authenticate(credentials);
      setError("");
      setIsAuthenticated(true);
      toast.success("You are now connected!");
      history.replace("/home");
    } catch (error) {
      setError(
        "No account has this email address or the information does not match!"
        );
        console.log(error);
      toast.error("An error has occurred");
    }
  };

  return (
    <>
      <h1>Connection to the app</h1>

      <form onSubmit={handleSubmit}>
        <Field
          label="Email"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="email"
          error={error}
        />

        <Field
          name="password"
          label="Your password"
          value={credentials.password}
          onChange={handleChange}
          type="password"
          error=""
        />

        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
