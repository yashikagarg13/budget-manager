export default {
  typeCastValue: (value, type) => {
    if (type == "number") {
      return Number(value);
    } else {
      return value;
    }
  },
};