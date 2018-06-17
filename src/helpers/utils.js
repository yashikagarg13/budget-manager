import R from "ramda";
import jwt from "jsonwebtoken";
const bcrypt = require("bcrypt-nodejs");

import LocalStorage from "./local-storage";
import dbConfig from "../config/db";

export default {
  arrayToDict(array) {
    return R.reduce((dict, item) => {
      dict[item._id] = item;
      return dict;
    }, {}, array);
  },
  createToken(user, config={expiresIn: "7d"}) {
    return jwt.sign(user, dbConfig.secret, config);
  },
  createQuery(page, perPage, filters, sortBy, fields) {
    let query = [];
    if (R.type(filters) == "Object" && !R.isEmpty(filters)) {
      query.push( `filters=${JSON.stringify(filters)}`);
    }

    if (R.type(sortBy) == "Object" && !R.isEmpty(sortBy)) {
      query.push(`sort=${JSON.stringify(sortBy)}`);
    }

    if (R.type(fields) == "Array" && !R.isEmpty(fields)) {
      query.push(`fields=${R.join(",", fields)}`);
    }

    if (R.type(page) === "Number" && R.type(perPage) === "Number") {
      query.push(`perPage=${perPage}`);
      query.push(`page=${page}`);
    }

    return R.join("&", query);
  },
  generatePassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  },
  getHeaders() {
    return {
      "Authorization": this.getToken(),
    };
  },
  getToken () {
    return LocalStorage.get("token");
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
  redirectToLandingIfTokenExists (router) {
    const token = LocalStorage.get("token");
    if (!R.isEmpty(token) && R.type(token) == "String") {
      router.push("/landing");
    }
  },
  redirectToLoginIfTokenExpired (router) {
    const token = LocalStorage.get("token");
    if (R.isEmpty(token) || R.type(token) != "String") {
      router.push("/login");
    }
  },
  transformToPieChartData (data, total) {
    let labels = data
      .map(d => d.category ? d.category.title : "")
      .reduce((acc, d) => {
        return acc.indexOf(d) == -1 ? acc.concat([d]) : acc;
      }, []);
    let values = labels.map(label => data.filter(d => d.category && d.category.title === label).length);


    return labels
    .map((label, i) => ({
      label,
      value: ((values[i]/total) * 100).toFixed(1),
    }))
    .sort((a, b) => b.value - a.value);
  },
};