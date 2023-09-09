import React from "react";
import { Formik } from "formik";
import RegisterForm, { registerSchema } from "../components/Auth/RegisterForm";
import useAuthCalls from "../hooks/useAuthCalls";

const Register = () => {
  const { register } = useAuthCalls();
  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          first_name: "",
          last_name: "",
          email: "",
          image: "",
          bio: "",
          city: "",
          password: "",
        }}
        validationSchema={registerSchema}
        onSubmit={(values, actions) => {
          register({ ...values, password2: values.password });
          actions.resetForm();
          actions.setSubmitting(false);
        }}
        component={(props) => <RegisterForm {...props} />}
      ></Formik>
    </div>
  );
};

export default Register;
