import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { validateRegistration } from "../helper/validate";
import convertToBase64 from "../helper/convert";

import styles from "../styles/username.module.css";
import extend from "../styles/profile.module.css";

const Profile = () => {
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
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      address: "",
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
        <div className={`${glass} ${extend.glass}`}>
          <div className={title}>
            <h4 className={h4}>Authenticator</h4>
            <span className={pageDescription}>Update your profile</span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={`${profile_img} ${extend.profile_img}`}
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
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("firstname")}
                  className={`${textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="First Name"
                />
                <input
                  {...formik.getFieldProps("lastname")}
                  className={`${textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Last Name"
                />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("mobile")}
                  className={`${textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Mobile Number"
                />
                <input
                  {...formik.getFieldProps("email")}
                  className={`${textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Email"
                />
              </div>

              <input
                {...formik.getFieldProps("address")}
                className={`${textbox} ${extend.textbox}`}
                type="text"
                placeholder="Address"
              />
              <button className={btn} type="submit">
                Signin
              </button>
            </div>
          </form>

          <div className={smallRoute}>
            <span className={smallRouteSpan}>
              come back later?{" "}
              <Link className={smallRouteLink} to="/">
                Logout
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
