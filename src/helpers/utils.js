import LocalStorage from "./local-storage";

export default {
  getToken: () => {
    const token = LocalStorage.get("sessionId");
    return `token=${token}`;
  },
}
