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
  }
};
