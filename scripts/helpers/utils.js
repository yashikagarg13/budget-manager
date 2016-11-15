import bCrypt from "bcryptjs";

export default {
  createHash: (password) => bCrypt.hashSync(password, bCrypt.genSaltSync(10), null),
}
