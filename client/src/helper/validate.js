import { toast } from "react-hot-toast";

const SPECIAL_CHARS = /[^<>{}\"|;:.,~!?@#$%=&*]()+-/; //*]*$/;

// validate login page username.
export async function validateUserName(values) {
  const errors = verifyUserName({}, values);
  return errors;
}

// validate password.
export async function validatePassword(values) {
  const errors = verifyPassword({}, values);
  return errors;
}

// validate Reset password.
export async function validateResetPassword(values) {
  const errors = verifyPassword({}, values);

  if (values.new_password !== values.confirm_password)
    errors.exist = toast.error("Password does not match ...!");

  return errors;
}

// validate Registration.
export async function validateRegistration(values) {
  const errors = verifyUserName({}, values);
  verifyPassword(errors, values);
  verifyEmail(errors, values);

  return errors;
}

// validate Profile.
export async function validateProfile(values) {
  const errors = verifyEmail({}, values);
  return errors;
}

// verify password.
function verifyPassword(errors = {}, values) {
  if (!values.password) {
    errors.password = toast.error("Password Required ...!");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Wrong Password ...!");
  } else if (values.password.length < 6) {
    errors.password = toast.error(
      "Password must be more than 6 characters long ...!"
    );
  } else if (SPECIAL_CHARS.test(values.password)) {
    errors.password = toast.error("Password must have special characters ...!");
  }

  return errors;
}

// validate username.
function verifyUserName(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("username required ....!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid username ....!");
  }
  return error;
}

// validate email.
function verifyEmail(error = {}, values) {
  if (!values.email) error.email = toast.error("Email Required ...!");
  else if (values.email.includes(" "))
    error.email = toast.error("Wrong Email ...!");

  return error;
}
