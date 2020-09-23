import React, { useState, useEffect } from 'react';
import AuthAPI from "../services/authAPI";
import Field from "../components/forms/Field";
import { toast } from "react-toastify";
import AuthContext from "../contexts/AuthContext";

const CreatePage = ({ history }) => {

    const [credentials, setCredentials] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        category: ""
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
    /**
     * LINK:https://www.pluralsight.com/guides/how-to-use-geolocation-call-in-reactjs
     */
    navigator.geolocation.getCurrentPosition(function (position) {
    alert("Latitude is :"+position.coords.latitude);
    alert("Longitude is :"+ position.coords.longitude);
        []
    });
    return (<>
        <form onSubmit={handleSubmit}>
            <Field
                label="Titre"
                name="title"
                value={credentials.title}
                onChange={handleChange}
                placeholder="Titre"
                error={error}
            />
            <Field
                label="Description"
                name="description"
                value={credentials.description}
                onChange={handleChange}
                placeholder="description"
                error={error}
            />
            <Field
                label="Categorie"
                name="category"
                value={credentials.category}
                onChange={handleChange}
                placeholder="email"
                error={error}
            />
            <Field
                label="Prix"
                name="price"
                value={credentials.price}
                onChange={handleChange}
                placeholder="1 000 Fcfa"
                error={error}
            />
            <Field
                label="Location"
                name="location"
                value={credentials.location}
                onChange={handleChange}
                placeholder="lieu"
                error={error}
            />
            <button type="submit">Publier</button>
    </form>
    </>);
}
 
export default CreatePage;