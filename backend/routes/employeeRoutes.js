const express = require("express");
const router = express.Router();
const { getAll, create, update, delete: del } = require("../controllers/employeeController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, getAll);
router.post("/", auth, create);
router.put("/:id", auth, update);
router.delete("/:id", auth, del);

module.exports = router;
