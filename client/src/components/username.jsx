import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { validateUserName } from "../helper/validate";

import styles from "../styles/username.module.css";

const UserName = () => {
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

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: validateUserName,
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
            <span className={pageDescription}>Enter the username</span>
          </div>

          <form className="py-2" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} className={profile_img} alt="avatar" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("username")}
                className={textbox}
                type="text"
                placeholder="User Name"
              />
              <button className={btn} type="submit">
                Login
              </button>
            </div>
          </form>

          <div className={smallRoute}>
            <span className={smallRouteSpan}>
              Not a Member?{" "}
              <Link className={smallRouteLink} to="/register">
                Register Now
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserName;
