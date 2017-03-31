import Axios from "axios";
import Utils from "./utils";

const baseUrl = "http://127.0.0.1:8080/api";

export default {
  login (email, passwordHash) {
    return Axios.post(`${baseUrl}/authenticate`, {
      email: email,
      password: passwordHash,
    })
    .then(response => response.data);
  },
  loginWithFB () {
    return Axios.get(`${baseUrl}/authenticate/facebook`)
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
  setupForUser () {
    return Axios.get(`${baseUrl}/setup`, {
      headers: Utils.getHeaders(),
    })
    .then(response => Utils.isTokenExpired(response));
  },

  addExpenseEntry (expense) {
    return Axios.post(
      `${baseUrl}/expenseEntries`,
      {expense},
      {headers: Utils.getHeaders()})
      .then(response => Utils.isTokenExpired(response));
  },
  getExpenseEntry (expenseId) {
    return Axios.get(`${baseUrl}/expenseEntries/${expenseId}`, {
      headers: Utils.getHeaders(),
    })
      .then(response => Utils.isTokenExpired(response));
  },
  updateExpenseEntry (expenseId, expense) {
    return Axios.put(
      `${baseUrl}/expenseEntries/${expenseId}`,
      {expense},
      {headers: Utils.getHeaders()})
      .then(response => Utils.isTokenExpired(response));
  },
  removeExpenseEntry (expenseId) {
    return Axios.delete(`${baseUrl}/expenseEntries/${expenseId}`, {
      headers: Utils.getHeaders(),
    })
      .then(response => Utils.isTokenExpired(response));
  },

  getExpenseEntries (perPage, page) {
    const sortByDate = JSON.stringify({date: -1});
    let query = `fields=category&sort=${sortByDate}&perPage=${perPage}&page=${page}`;

    return Axios.get(`${baseUrl}/expenseEntries?${query}`, {
      headers: Utils.getHeaders(),
    })
    .then(response => Utils.isTokenExpired(response));
  },
  getExpenseEntriesByCategory (categoryId) {
    let query = JSON.stringify({category: categoryId});
    return Axios.get(`${baseUrl}/expenseEntries?filters=${query}`, {
      headers: Utils.getHeaders(),
    })
      .then(response => Utils.isTokenExpired(response));
  },
  getExpenseEntriesByDate (filters) {
    let query = JSON.stringify(filters);
    return Axios.get(`${baseUrl}/expenseEntries?filters=${query}&fields=category`, {
      headers: Utils.getHeaders(),
    })
      .then(response => Utils.isTokenExpired(response));
  },
  deleteAllExpensesByCategory(oldCategoryId) {
    return Axios.delete(`${baseUrl}/expenseEntries/byCategory?oldCategoryId=${oldCategoryId}`, {
      headers: Utils.getHeaders(),
    })
      .then(response => Utils.isTokenExpired(response));
  },
  updateExpenseEntriesWithCategory(oldCategoryId, newCategoryId) {
    return Axios.put(`${baseUrl}/expenseEntries/updateCategory`, {
      oldCategoryId,
      newCategoryId,
    }, {
      headers: Utils.getHeaders(),
    })
      .then(response => Utils.isTokenExpired(response));
  },

  getExpenseCategoriesByUser () {
    return Axios.get(`${baseUrl}/expenseCategories`, {
      headers: Utils.getHeaders(),
    })
    .then(response => Utils.isTokenExpired(response));
  },
  addCategory (title) {
    return Axios.post(`${baseUrl}/expenseCategories`, {
      title: title,
    }, {
      headers: Utils.getHeaders(),
    })
    .then(response => Utils.isTokenExpired(response));
  },
  deleteCategory (categoryId) {
    return Axios.delete(`${baseUrl}/expenseCategories/${categoryId}`, {
      headers: Utils.getHeaders(),
    })
    .then(response => Utils.isTokenExpired(response));
  },
  updateCategory(category) {
    return Axios.put(`${baseUrl}/expenseCategories/${category._id}`, {
      title: category.title,
    }, {
      headers: Utils.getHeaders(),
    })
    .then(response => Utils.isTokenExpired(response));
  }
};
