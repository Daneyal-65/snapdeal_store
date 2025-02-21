import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { handleLoginOrRegister } from "../api/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Register
  const nav = useNavigate();
  // Common initial values for both forms
  const initialValues = {
    email: "",
    password: "",
  };

  // Validation schema for both forms
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Handle form submission for both login and register
  const handleSubmit = async (values) => {
    const _url = isLogin ? "login" : "register";
    const res = await handleLoginOrRegister(
      values.email,
      values.password,
      _url
    );
    if (res.error) {
      toast.error(res.error, {
        position: "top-center",
        autoClose: 5000,
      });
    } else {
      toast.success(
        isLogin ? "🦄 Login Successful!" : "🦄 Registration Successful!",
        {
          position: "top-center",
          autoClose: 5000,
        }
      );
      nav("/");
      window.location.reload();
    }
    initialValues.email = "";
    initialValues.password = "";
  };

  return (
    <div
      className="flex items-center justify-center min-h-[400px] bg-white "
      style={{ borderTop: "1px solid red" }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          {isLogin ? "Login to Snapdeal" : "Register to Snapdeal"}
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Email Field */}
              <div className="mb-4">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Toggle Between Login and Register */}
        <div className="mt-4 text-center">
          {isLogin ? (
            <>
              <p>
                Don't have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-500 hover:underline"
                >
                  Register here
                </button>
              </p>
            </>
          ) : (
            <>
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-500 hover:underline"
                >
                  Login here
                </button>
              </p>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
