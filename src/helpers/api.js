  import Axios from "axios";
  import LocalStorage from "./local-storage";

const baseUrl = "http://127.0.0.1:8080/api";
const token = LocalStorage.get("sessionId");
const tokenQuery = `token=${token}`;

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
  },
  getExpenseEnteriesByUser: (userId) => {
    return Axios.get(`${baseUrl}/expenseEntries?${tokenQuery}`)
    .then(response => response.data);
  },
};
