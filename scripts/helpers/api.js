import Axios from "axios";

const baseUrl = "http://127.0.0.1:3000";

export default {
  login: (email, passwordHash) => {
    return Axios.post(`${baseUrl}/login`, {
      email: email,
      password: passwordHash,
    });
  },
  signUp: (email, passwordHash, currency) => {
    return Axios.post(`${baseUrl}/signup`, {
      email: email,
      password: passwordHash,
      currency: currency,
    });
  }
};
