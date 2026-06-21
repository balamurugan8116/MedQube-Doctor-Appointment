const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect, authorize } = require("../middleware/auth");

// GET /api/users  — admin only: list all users
router.get("/", protect, authorize("admin"), async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json({ users });
});

// GET /api/users/doctors — anyone logged in: list all doctors (for booking page)
router.get("/doctors", protect, async (req, res) => {
  const doctors = await User.find({ role: "doctor", isActive: true }).select(
    "name email specialty experience room"
  );
  res.json({ doctors });
});

// PATCH /api/users/:id/deactivate — admin only
router.patch("/:id/deactivate", protect, authorize("admin"), async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ user });
});

// PATCH /api/users/:id/activate — admin only
router.patch("/:id/activate", protect, authorize("admin"), async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive: true },
    { new: true }
  );
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ user });
});

module.exports = router;
