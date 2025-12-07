const db = require("../config/db");

module.exports = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM employees ORDER BY id DESC", (err, results) =>
        err ? reject(err) : resolve(results)
      );
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM employees WHERE id = ?", [id], (err, results) =>
        err ? reject(err) : resolve(results[0])
      );
    });
  },

  create: (data) => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO employees SET ?", data, (err, result) =>
        err ? reject(err) : resolve(result)
      );
    });
  },

  update: (id, data) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE employees SET ? WHERE id = ?",
        [data, id],
        (err, result) => (err ? reject(err) : resolve(result))
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM employees WHERE id = ?", [id], (err, result) =>
        err ? reject(err) : resolve(result)
      );
    });
  },
};
