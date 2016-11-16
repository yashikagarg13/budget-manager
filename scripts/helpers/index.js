console.log(require("./utils"), require("./utils").default);

export default {
  Utils: require("./utils").default,
  LocalStorage: require("./local-storage").default,
  Constants: require("./constants").default,
  API: require("./api").default,
};
