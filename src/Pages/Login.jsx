import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../ValidationScema/LoginScema";
import { Link, useNavigate } from "react-router-dom";
import { axiosNoAuth } from "../utils/axios";
import { Container, SubFooter } from "../Components";
import { CartApi, validUser } from "../utils";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../Store/Feature/authSlice";

const Login = () => {
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const items = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
    if (validUser()) {
      dispatch(setAuth(true));
      navigate("/");
    }
  });
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axiosNoAuth.post("/auth/sign-in", values);

      const data = response.data;
      //console.log(data.token);
      if (data.status == 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("session", data.user);
        dispatch(setAuth(true));
        if (items && items.langth > 0) {
          await CartApi.saveCart(items);
        }
        navigate("/");
        resetForm();
      } else {
        Swal.fire({
          title: "Authentication Failed",
          text: data.error,
          icon: "error",
          confirmButtonText: "Retry",
        });
      }
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: "Authentication Failed",
        text: error.message,
        icon: "error",
        confirmButtonText: "Retry",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="my-2">
      <Container>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[600px] lg:py-0">
          <div className="w-full bg-slate-900 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-[#FFFFFF] md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="space-y-4 md:space-y-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-lg font-medium text-secondary dark:text-white"
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
                      <div className="flex items-center justify-between">
                        <Link
                          to="/"
                          className="text-sm text-secondary hover:underline dark:text-primary-500"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full text-secondary border-2 border-secondary hover:bg-secondary hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Sign in
                      </button>
                      <p className="text-md font-light text-white">
                        Don’t have an account yet?{" "}
                        <Link
                          to="/register"
                          className="font-semibold text-lg text-secondary"
                        >
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </Container>
      <SubFooter
        desc={"Dont want to login ?? Check out delicious meals."}
        button={"Explore now"}
        to={"/"}
      />
    </section>
  );
};

export default Login;
