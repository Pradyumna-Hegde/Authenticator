import React from "react";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { validateResetPassword } from "../helper/validate";

import styles from "../styles/username.module.css";

const Reset = () => {
  const {
    glass,
    title,
    h4,
    pageDescription,
    textbox,
    btn,
    smallRoute,
    smallRouteSpan,
    smallRouteLink,
  } = styles;

  const formik = useFormik({
    initialValues: {
      new_password: "",
      confirm_password: "",
    },
    validate: validateResetPassword,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={glass}>
          <div className={title}>
            <h4 className={h4}>Authenticator</h4>
            <span className={pageDescription}>Enter new password</span>
          </div>

          <form className="py-10" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("new_password")}
                className={textbox}
                type="password"
                placeholder="New Password"
              />
              <input
                {...formik.getFieldProps("confirm_password")}
                className={textbox}
                type="password"
                placeholder="Confirm Password"
              />
              <button className={btn} type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
