import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { validateRegistration } from "../helper/validate";
import convertToBase64 from "../helper/convert";

import styles from "../styles/username.module.css";

const Register = () => {
  const {
    glass,
    title,
    h4,
    pageDescription,
    profile_img,
    textbox,
    btn,
    smallRoute,
    smallRouteSpan,
    smallRouteLink,
  } = styles;

  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: validateRegistration,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      values = Object.assign(values, { profile: file || "" });
      console.log(values);
    },
  });

  // formik doesn't support file upload. for that we have created below handler.
  const onUpload = async (event) => {
    const base64 = await convertToBase64(event.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={glass}>
          <div className={title}>
            <h4 className={h4}>Authenticator</h4>
            <span className={pageDescription}>Enter the credentials</span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={profile_img}
                  alt="avatar"
                />
              </label>
              <input
                type="file"
                id="profile"
                name="profile"
                onChange={onUpload}
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("username")}
                className={textbox}
                type="text"
                placeholder="username"
              />
              <input
                {...formik.getFieldProps("email")}
                className={textbox}
                type="text"
                placeholder="email"
              />
              <input
                {...formik.getFieldProps("password")}
                className={textbox}
                type="password"
                placeholder="password"
              />
              <button className={btn} type="submit">
                Sign in
              </button>
            </div>
          </form>

          <div className={smallRoute}>
            <span className={smallRouteSpan}>
              Already have an account?{" "}
              <Link className={smallRouteLink} to="/">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
