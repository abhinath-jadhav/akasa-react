import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { SignupSchema } from "../ValidationScema/SignupSchema";
import { axiosNoAuth } from "../utils/axios";

import { SubFooter } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../Store/Feature/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  });
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axiosNoAuth.post("/auth/register", values);

      //console.log("Response:", response.data);
      const data = response.data;

      if (data.status == 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("session", data.user);
        dispatch(setAuth(true));
        navigate("/");
        resetForm();
      } else {
        alert(data.error);
      }
    } catch (error) {
      // Handle error
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[600px] lg:py-0">
        <div className="w-full bg-slate-900 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-[#FFFFFF] md:text-2xl dark:text-white">
              Create new account
            </h1>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-lg font-medium text-secondary"
                      >
                        Email ID
                      </label>

                      <Field
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="name@company.com"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-white font-light text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-lg font-medium text-secondary dark:text-white"
                      >
                        Password
                      </label>

                      <Field
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-white font-light text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-lg font-medium text-secondary dark:text-white"
                      >
                        Confirm Password
                      </label>

                      <Field
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-white font-light text-sm mt-1"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full text-secondary border-2 border-secondary hover:bg-secondary hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 text-center"
                    >
                      Register
                    </button>
                    <p className="text-md font-light text-white ">
                      Already have account{" "}
                      <Link
                        to="/login"
                        className="font-semibold text-lg text-secondary"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <SubFooter
        desc={"Dont want to register ?? Check out delicious meals."}
        button={"Explore now"}
        to={"/"}
      />
    </section>
  );
};

export default Register;
