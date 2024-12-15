import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; 
import "./HomePage.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Homepage() {
  const navigate = useNavigate(); 

  return (
    <div className="container">
      <div className="content">
        <h1>Welcome to To-do app</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form Data:", values);
            alert("Form Submitted Successfully!");
            
            navigate("/dashboard");
          }}
        >
          {() => (
            <Form className="form">
              <div className="form-group">
                <Field
                  type="email"
                  name="email"
                  placeholder="email ID"
                  className="input-field"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="form-group">
                <Field
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input-field"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>

              <button type="submit" className="submit-button">
                Sign in to continue
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Homepage;
