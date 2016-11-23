import R from "ramda";
import LocalStorage from "./local-storage";

export default {
  getToken: () => {
    const token = LocalStorage.get("token");
    return `token=${token}`;
  },
  redirectToLandingIfTokenExists: (router) => {
    const token = LocalStorage.get("token");
    if (!R.isEmpty(token) && R.type(token) == "String") {
      router.push("/landing");
    }
  },
  redirectToLoginIfTokenExpired: (router) => {
    const token = LocalStorage.get("token");
    if (R.isEmpty(token) || R.type(token) != "String") {
      router.push("/login");
    }
  },
}
