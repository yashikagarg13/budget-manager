import localStorage from "localStorage";

let LocalStorage = {
  get: (key) => localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null,
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  remove: (key) => localStorage.removeItem(key),
};

export default LocalStorage;
