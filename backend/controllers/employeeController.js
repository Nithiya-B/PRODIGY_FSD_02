const Employee = require("../models/employeeModel");

module.exports = {
  getAll: async (req, res) => {
    try {
      const employees = await Employee.getAll();
      res.json(employees);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { name, email, phone, department, designation, salary } = req.body;

      const result = await Employee.create({
        name,
        email,
        phone,
        department,
        designation,
        salary,
      });

      res.json({ message: "Employee added", id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      await Employee.update(id, req.body);

      res.json({ message: "Employee updated" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      await Employee.delete(id);

      res.json({ message: "Employee deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
