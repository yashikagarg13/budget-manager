import Axios from "axios";
import Utils from "./utils";

const baseUrl = "http://127.0.0.1:8080/api";

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
  setupForUser: () => {
    return Axios.get(`${baseUrl}/setup?${Utils.getToken()}`)
    .then(response => response.data);
  },
  getExpenseEnteriesByUser: () => {
    return Axios.get(`${baseUrl}/expenseEntries?${Utils.getToken()}`)
    .then(response => response.data);
  },
  getExpensCategoriesByUser: () => {
    return Axios.get(`${baseUrl}/expenseCategories?${Utils.getToken()}`)
    .then(response => response.data);
  },
};
