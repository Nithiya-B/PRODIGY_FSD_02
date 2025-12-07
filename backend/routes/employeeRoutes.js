const express = require("express");
const router = express.Router();
const { getEmployees, getEmployeeById, addEmployee, updateEmployee, deleteEmployee } = require("../controllers/employeeController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", verifyToken, getEmployees);
router.get("/:id", verifyToken, getEmployeeById);
router.post("/", verifyToken, addEmployee);
router.put("/:id", verifyToken, updateEmployee);
router.delete("/:id", verifyToken, deleteEmployee);

module.exports = router;

