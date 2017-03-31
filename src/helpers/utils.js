import R from "ramda";
import jwt from "jwt-simple";
const bcrypt = require("bcrypt-nodejs");

import LocalStorage from "./local-storage";
import dbConfig from "../config/db";

export default {
  createToken(user) {
    return jwt.encode(user, dbConfig.secret);
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
  getHeaders() {
    return {
      "Authorization": this.getToken(),
    };
  },
  generatePassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
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
  }
};