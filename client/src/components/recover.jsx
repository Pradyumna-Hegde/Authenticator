import React from "react";
import { Toaster } from "react-hot-toast";

import styles from "../styles/username.module.css";

const Recover = () => {
  const {
    glass,
    title,
    h4,
    pageDescription,
    textbox,
    btn,
    smallRoute,
    smallRouteSpan,
    smallRouteButton,
  } = styles;

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={glass}>
          <div className={title}>
            <h4 className={h4}>Authenticator</h4>
            <span className={pageDescription}>Enter the OTP</span>
          </div>

          <form className="pt-10">
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit OTP sent to your email address
                </span>
                <input className={textbox} type="OTP" placeholder="Password" />
              </div>
              <button className={btn} type="submit">
                Recover
              </button>
            </div>
          </form>

          <div className={smallRoute}>
            <span className={smallRouteSpan}>
              can't get OTP?{" "}
              <button className={smallRouteButton}>Resend OTP</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recover;
