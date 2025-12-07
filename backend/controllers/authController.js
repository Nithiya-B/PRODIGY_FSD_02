const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;

      const hashed = await bcrypt.hash(password, 10);
      await Admin.createAdmin(username, hashed);

      res.json({ message: "Admin registered successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const admin = await Admin.findAdminByUsername(username);
      if (!admin) return res.status(400).json({ error: "User not found" });

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(400).json({ error: "Invalid password" });

      const token = jwt.sign(
        { id: admin.id, username: admin.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
