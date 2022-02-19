const db = require("./db");
const crypto = require("./crypto");

module.exports.check = async (req, type = "no_auth") => {
  const cookie = req.cookies.ev_auth;
  if (cookie) {
    const json = JSON.parse(crypto.decrypt(cookie));
    if (json && typeof json === "object" && json.id) {
      let reqReturn = false;
      const result = await db.queryOne(
        "SELECT id FROM ev_users WHERE id = ?",
        json.id
      );
      if (result) {
        if (type == "auth") reqReturn = true;
      } else {
        if (type != "auth") reqReturn = true;
      }
      return reqReturn;
    } else {
      if (type == "auth") return false;
      else return true;
    }
  } else {
    if (type == "auth") return false;
    else return true;
  }
};

module.exports.getCurrentUser = async (req) => {
  if (await this.check(req)) return false;
  return JSON.parse(crypto.decrypt(req.cookies.ev_auth));
};
