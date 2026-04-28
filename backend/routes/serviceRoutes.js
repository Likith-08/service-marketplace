const express = require("express");
const router = express.Router();

const { createService, getServices, getServiceById, deleteService,updateService,toggleStatus,getPublicServices  } = require("../controllers/serviceController");
const protect = require("../middleware/authMiddleware");

// Create Service
router.post("/create", protect, createService);

router.get("/public", getPublicServices);

// Get All Services
router.get("/", protect, getServices);

// Get Single Service
router.get("/:id", getServiceById);

// ✅ ADD THIS LINE (VERY IMPORTANT)
router.delete("/:id", protect, deleteService);

router.put("/:id", protect, updateService);

router.put("/:id/toggle", protect, toggleStatus);


module.exports = router;