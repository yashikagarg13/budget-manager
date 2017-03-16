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
  logout () {

  },

  addExpenseEntry(expense) {
    return Axios.post(`${baseUrl}/expenseEntries?${Utils.getTokenQuery()}`, {expense})
      .then(response => this.isTokenExpired(response));
  },
  getExpenseEnteriesByUser () {
    const sortByDate = JSON.stringify({date: -1});
    return Axios.get(`${baseUrl}/expenseEntries?${Utils.getTokenQuery()}&fields=category&sort=${sortByDate}`)
    .then(response => this.isTokenExpired(response));
  },
  getExpenseEnteriesByCategoryAndUser (categoryId) {
    let query = JSON.stringify({category: categoryId});
    return Axios.get(`${baseUrl}/expenseEntries?${Utils.getTokenQuery()}&filters=${query}`)
      .then(response => this.isTokenExpired(response));
  },
  updateExpenseEntriesWithCategory(oldCategoryId, newCategoryId) {
    return Axios.put(`${baseUrl}/expenseEntries/updateCategory`, {
      oldCategoryId,
      newCategoryId,
      token: Utils.getToken(),
    })
      .then(response => this.isTokenExpired(response));
  },

  getExpenseCategoriesByUser () {
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
  deleteCategory (categoryId) {
    return Axios.delete(`${baseUrl}/expenseCategories/${categoryId}`, {
      data: {
        token: Utils.getToken(),
      },
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
