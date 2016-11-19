  import Axios from "axios";

const baseUrl = "http://127.0.0.1:8080";

export default {
  login: (email, passwordHash) => {
    return Axios.post(`${baseUrl}/authenticate`, {
      email: email,
      password: passwordHash,
    })
    .then(response => response.data);
  },
  signUp: (email, passwordHash, currency) => {
    return Axios.post(`${baseUrl}/signup`, {
      email: email,
      password: passwordHash,
      currency: currency,
    })
    .then(response => response.data);
  }
};
