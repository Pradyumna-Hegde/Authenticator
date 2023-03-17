import axios from "axios";

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
  } catch (error) {
    return { error };
  }
}

export { authenticate, getUser, registerUser, verifyPassword };
