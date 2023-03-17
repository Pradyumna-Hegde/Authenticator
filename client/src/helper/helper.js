import axios from "axios";

axios.defaults.baseURL = REACT_APP_SERVER_DOMAIN;

// Make API requests

// authenticate function.
async function authenticate(username) {
  try {
    return await axios.post("/api/v1/authenticate", { username });
  } catch (error) {
    return { error: "username doesn't exist" };
  }
}

// Get user details.
async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/v1/users/${username}`);
    return { data };
  } catch (error) {
    return { error: `password doesn't match` };
  }
}

// register user function.
async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`/api/v1/register`, credentials);
    return msg;
  } catch (error) {
    return { error };
  }
}

// login function.
async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post("/api/v1/login", {
        username,
        password,
      });
      return data;
    }
  } catch (error) {
    return { error };
  }
}

// update function.
async function updatePassword(response) {
  try {
    const token = localStorage.getItem(token);
    const data = await axios.put("/api/v1/updateUser", response, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data };
  } catch (error) {
    return { error };
  }
}

// Generate OTP.
async function generateOTP(username) {
  try {
    const {
      data: { user },
      status,
    } = await axios.get("/api/v1/generateOTP", {
      params: { username },
    });
  } catch (error) {
    return { error };
  }
}

// Verify OTP function
async function verifyOTP({ username, user }) {
  try {
    await axios.get("/api/v1/verifyOTP", { params: { username, code } });
    return data;
  } catch (error) {
    return { error };
  }
}

// Reset Password function
async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.put("/api/v1/resetPassword", {
      username,
      password,
    });
    return { data, status };
  } catch (error) {
    return { error };
  }
}

export {
  authenticate,
  getUser,
  registerUser,
  verifyPassword,
  updatePassword,
  generateOTP,
};
