import R from "ramda";
import LocalStorage from "./local-storage";

export default {
  getToken () {
    return LocalStorage.get("token");
  },
  getTokenQuery () {
    const token = this.getToken();
    return `token=${token}`;
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
      .map(d => d.category.title)
      .reduce((acc, d) => {
        return acc.indexOf(d) == -1 ? acc.concat([d]) : acc;
      }, []);
    let values = labels.map(label => data.filter(d => d.category.title === label).length);


    return labels
    .map((label, i) => ({
      label,
      value: ((values[i]/total) * 100).toFixed(1),
    }))
    .sort((a, b) => b.value - a.value);
  }
};