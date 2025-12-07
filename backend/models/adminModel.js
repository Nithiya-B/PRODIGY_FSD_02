const db = require("../config/db");

module.exports = {
  createAdmin: (username, hashedPassword) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO admins (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        (err, result) => (err ? reject(err) : resolve(result))
      );
    });
  },

  findAdminByUsername: (username) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM admins WHERE username = ?",
        [username],
        (err, results) => (err ? reject(err) : resolve(results[0]))
      );
    });
  },
};
