const db = require("../config/db");

// Get all employees
exports.getEmployees = (req, res) => {
    db.query("SELECT * FROM employees", (err, results) => {
        if (err) return res.status(500).json({ message: "Server Error" });
        res.json(results);
    });
};

// Get single employee
exports.getEmployeeById = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM employees WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ message: "Server Error" });
        if (results.length === 0) return res.status(404).json({ message: "Employee not found" });
        res.json(results[0]);
    });
};

// Add employee
exports.addEmployee = (req, res) => {
    const { name, email, phone, department, designation, salary } = req.body;
    const sql = "INSERT INTO employees (name, email, phone, department, designation, salary) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [name, email, phone, department, designation, salary], (err) => {
        if (err) return res.status(500).json({ message: "Error adding employee" });
        res.json({ message: "Employee added successfully" });
    });
};

// Update employee
exports.updateEmployee = (req, res) => {
    const { id } = req.params;
    const { name, email, phone, department, designation, salary } = req.body;
    const sql = "UPDATE employees SET name=?, email=?, phone=?, department=?, designation=?, salary=? WHERE id=?";
    db.query(sql, [name, email, phone, department, designation, salary, id], (err) => {
        if (err) return res.status(500).json({ message: "Error updating employee" });
        res.json({ message: "Employee updated successfully" });
    });
};

// Delete employee
exports.deleteEmployee = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM employees WHERE id=?", [id], (err) => {
        if (err) return res.status(500).json({ message: "Error deleting employee" });
        res.json({ message: "Employee deleted successfully" });
    });
};

