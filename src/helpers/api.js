import Axios from "axios";
import Utils from "./utils";
import LocalStorage from "./local-storage";

const baseUrl = "http://127.0.0.1:8080/api";

export default {
  login (email, passwordHash) {
    return Axios.post(`${baseUrl}/authenticate`, {
      email: email,
      password: passwordHash,
    })
    .then(response => response.data);
  },
  signUp (email, passwordHash, currency) {
    return Axios.post(`${baseUrl}/signup`, {
      email: email,
      password: passwordHash,
      currency: currency,
    })
    .then(response => response.data);
  },
  isTokenExpired (response) {
    const data = response.data;
    if (data.success == false) {
      LocalStorage.remove("token");
      return data;
    } else {
      return data;
    }
  },
  setupForUser () {
    return Axios.get(`${baseUrl}/setup?${Utils.getTokenQuery()}`)
    .then(response => this.isTokenExpired(response));
  },
  getExpenseEnteriesByUser () {
    return Axios.get(`${baseUrl}/expenseEntries?${Utils.getTokenQuery()}`)
    .then(response => this.isTokenExpired(response));
  },
  getExpensCategoriesByUser () {
    return Axios.get(`${baseUrl}/expenseCategories?${Utils.getTokenQuery()}`)
    .then(response => this.isTokenExpired(response));
  },
  addCategory (title) {
    return Axios.post(`${baseUrl}/expenseCategories`, {
      title: title,
      token: Utils.getToken(),
    })
    .then(response => this.isTokenExpired(response));
  },
  updateCategory(category) {
    return Axios.put(`${baseUrl}/expenseCategories/${category._id}`, {
      title: category.title,
      token: Utils.getToken(),
    })
    .then(response => this.isTokenExpired(response));
  }
};
