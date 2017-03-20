export default {
  currency: ["USD", "INR"],
  perPage: 2,
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
