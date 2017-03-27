export default {
  currency: ["USD", "INR"],
  perPage: 5,
  operations: {
    $eq: "==",
    $ne: "!=",

    $gt: ">",
    $gte: ">=",

    $lt: "<",
    $lte: "<=",

    $in: ":",
    $nin: "!:",

    $and: "and",
    $or: "or",
  },
  yearTypes: {
    fy: "Financial Year",
    cal: "Calendar Year"
  },
  maxYears: 20,
  quarters: {
    1: "Quarter 1",
    2: "Quarter 2",
    3: "Quarter 3",
    4: "Quarter 4",
  },
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};
