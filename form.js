import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

const UserForm = () => {
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    salary:" ",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const id = location?.state?.id;

  useEffect(() => {
    if (id) {
      const getUser = async () => {
        try {
          const res = await axios.post("http://localhost:8081/api/edit", { id });
          setData(res?.data?.data[0]);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      getUser();
    }
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const url = id ? "http://localhost:8081/api/update" : "http://localhost:8081/api/create";
      const payload = id ? { id, ...values } : values;
      const response = await axios.post(url, payload);

      if (response.status === 200) {
        console.log(id ? "Update successful!" : "Creation successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark vh-100 p-3">
      <div className="bg-white rounded shadow p-5 w-100" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4 text-primary">{id ? "Update User" : "Create User"}</h2>

        <Formik
          enableReinitialize
          initialValues={data}
          validate={(values) => {
            const errors = {};

            if (!values.name) errors.name = "Name is required";
            if (!values.phone) {
              errors.phone = "Phone number is required";
            } else if (!/^\d{10}$/.test(values.phone)) {
              errors.phone = "Phone number must be 10 digits";
            }
            if (!values.email) {
              errors.email = "Email is required";
            } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
              errors.email = "Invalid email format";
            }
            if (!values.age) {
              errors.age = "Age is required";
            } else if (isNaN(values.age)) {
              errors.age = "Age must be a number";
            }
            if (!values.gender) errors.gender = "Gender is required";

            if (!values.salary) errors.salary = "Salary is required";

            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit} className="d-flex flex-column">
              {["name", "phone", "email", "age", "gender", "salary"].map((field, idx) => (
                <div className="mb-3" key={idx}>
                  <label className="form-label text-capitalize">{field}</label>
                  <Field
                    type="text"
                    name={field}
                    className="form-control"
                    placeholder={`Enter ${field}`}
                  />
                  <ErrorMessage name={field} component="div" className="text-danger small mt-1" />
                </div>
              ))}

              <button
                type="submit"
                className="btn btn-primary w-100 mt-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (id ? "Updating..." : "Creating...") : id ? "Update User" : "Create User"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserForm;
