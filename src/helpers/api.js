import Axios from "axios";
import Utils from "./utils";
import LocalStorage from "./local-storage";

const baseUrl = "http://127.0.0.1:8080/api";

export default {
  successHandler(response, router, cb, validateToken = true) {
    if (validateToken) {
      Utils.redirectToLoginIfTokenExpired(router);
    }
    if (!response.success && response.message) {
      LocalStorage.set("alert", {
        type: "error",
        message: response.message,
      });
      return null;
    } else {
      if (response.message) {
        LocalStorage.set("alert", {
          type: "success",
          message: response.message,
        });
      }
      return cb(response);
    }
  },
  errorHandler (error, router, cb, validateToken = true) {
    if (validateToken) {
      Utils.redirectToLoginIfTokenExpired(router);
    }
    LocalStorage.set("alert", {
      type: "error",
      message: error.message,
    });
    return cb(error);
  },

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
  requestResetPasswordLink (email) {
    return Axios.post(`${baseUrl}/authenticate/requestResetPasswordLink`, {email})
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
  updateCurrency (currency) {
    return Axios.put(`${baseUrl}/users/updateCurrency`, {currency}, {
      headers: Utils.getHeaders(),
    })
      .then(response => Utils.isTokenExpired(response));
  },
  updatePassword (password) {
    return Axios.put(`${baseUrl}/users/updatePassword`, {password}, {
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

  getExpenseCategories () {
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
