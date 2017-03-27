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
    q1: "Quarter 1",
    q2: "Quarter 2",
    q3: "Quarter 3",
    q4: "Quarter 4",
  },
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};
