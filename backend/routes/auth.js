const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const { protect } = require("../middleware/auth");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/register
// Public signup — always creates a "patient" account.
// Doctor and admin accounts are created separately by an admin
// (see POST /api/auth/create-staff, protected route below).
// ─────────────────────────────────────────────────────────────────────────────
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: "patient",
    });

    const token = generateToken(user._id, user.role);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/login
// Single login endpoint for all roles — role comes from the stored user record,
// not from anything the client sends, so the frontend doesn't need to know it.
// ─────────────────────────────────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (!user.isActive) {
      return res.status(403).json({ message: "This account has been deactivated. Contact admin." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id, user.role);
    const safeUser = user.toJSON(); // password stripped by schema transform

    res.json({ token, user: safeUser });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/auth/me
// Returns the currently logged-in user, based on the JWT. Used by the frontend
// on page load to restore the session.
// ─────────────────────────────────────────────────────────────────────────────
router.get("/me", protect, async (req, res) => {
  res.json({ user: req.user });
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/create-staff
// Admin-only. Creates a doctor or admin account.
// ─────────────────────────────────────────────────────────────────────────────
const { authorize } = require("../middleware/auth");

router.post("/create-staff", protect, authorize("admin"), async (req, res) => {
  try {
    const { name, email, password, role, phone, specialty, experience, room } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Name, email, password and role are required" });
    }
    if (!["doctor", "admin"].includes(role)) {
      return res.status(400).json({ message: "Role must be 'doctor' or 'admin'" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    const user = await User.create({
      name, email, password, role, phone,
      specialty: role === "doctor" ? specialty : undefined,
      experience: role === "doctor" ? experience : undefined,
      room: role === "doctor" ? room : undefined,
    });

    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Failed to create staff account", error: err.message });
  }
});

module.exports = router;
