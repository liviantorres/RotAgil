import React, { useState } from "react";
import Forms from "../components/Forms";
import axios from "axios";

const Register = () => {
  const [errors, setErrors] = useState([]);

  const handleRegister = async ({ name, email, password }) => {
    setErrors([]); 

    try {
      const response = await axios.post("http://localhost:8080/company", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        alert("Empresa cadastrada com sucesso!");
      }
    } catch (error) {
      const errorMessages = [];
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          error.response.data.errors.forEach(err => {
            errorMessages.push(err.message);
          });
        } else {
          errorMessages.push(error.response.data.message || error.message);
        }
      } else {
        errorMessages.push(error.message);
      }
      setErrors(errorMessages);
    }
  };

  return (
    <div>
      <Forms type="Register" onSubmit={handleRegister} errors={errors} />
    </div>
  );
};

export default Register;
