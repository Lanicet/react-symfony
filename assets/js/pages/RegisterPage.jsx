import React, { useState } from "react";
import Field from "./../components/forms/Field";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { USERS_API } from "../services/configs";


const RegisterPage = ({ history }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  // Gestion des changements des inputs dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  // Gestion de la soumission
  const handleSubmit = async event => {
    event.preventDefault();

    const apiErrors = {};

    if (user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm =
        "Your password confirmation does not match the original password";
      setErrors(apiErrors);
      toast.error("Errors in your form!");
      return;
    }

    try {
      await USERS_API.register(user);
      setErrors({});

      // TODO : Flash success
      toast.success(
        "You are now registered, you can connect!"
      );
      history.replace("/login");
    } catch (error) {
      const { violations } = error.response.data;

      if (violations) {
        violations.forEach(violation => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
      }
      toast.error("Errors in your form!");
    }
  };

  return (
    <>
      <h1>Sign</h1>
      <form onSubmit={handleSubmit}>
        <Field
          name="firstName"
          label="First name"
          placeholder="Your first name"
          error={errors.firstName}
          value={user.firstName}
          onChange={handleChange}
        />
        <Field
          name="lastName"
          label="Last name"
          placeholder="Your last name"
          error={errors.lastName}
          value={user.lastName}
          onChange={handleChange}
        />
        <Field
          name="email"
          label="E-mail adress"
          placeholder="Your email address"
          type="email"
          error={errors.email}
          value={user.email}
          onChange={handleChange}
        />
        <Field
          name="password"
          label="Password"
          type="password"
          placeholder="Your password"
          error={errors.password}
          value={user.password}
          onChange={handleChange}
        />
        <Field
          name="passwordConfirm"
          label="Confirm password"
          type="password"
          placeholder="Confirm your password"
          error={errors.passwordConfirm}
          value={user.passwordConfirm}
          onChange={handleChange}
        />

        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Confirmation
          </button>
          <Link to="/login" className="btn btn-link">
          I already have an account
          </Link>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;
