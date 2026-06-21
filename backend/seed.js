// One-time setup script: creates the first admin account and a sample doctor
// so you have something to log in with immediately.
//
// Run with:   npm run seed
// (after setting up your .env file)

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");

const run = async () => {
  await connectDB();

  const adminEmail = "admin@medqube.health";
  const doctorEmail = "ananya.krishnan@medqube.health";

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (existingAdmin) {
    console.log(`Admin account already exists (${adminEmail}) — skipping.`);
  } else {
    await User.create({
      name: "MedQube Admin",
      email: adminEmail,
      password: "Admin@123",
      role: "admin",
    });
    console.log(`Created admin account:`);
    console.log(`  email:    ${adminEmail}`);
    console.log(`  password: Admin@123`);
  }

  const existingDoctor = await User.findOne({ email: doctorEmail });
  if (existingDoctor) {
    console.log(`Sample doctor already exists (${doctorEmail}) — skipping.`);
  } else {
    await User.create({
      name: "Dr. Ananya Krishnan",
      email: doctorEmail,
      password: "Doctor@123",
      role: "doctor",
      specialty: "Cardiology",
      experience: "12 yrs",
      room: "OPD-3",
    });
    console.log(`Created sample doctor account:`);
    console.log(`  email:    ${doctorEmail}`);
    console.log(`  password: Doctor@123`);
  }

  console.log("\nSeed complete. You can now log in with either account above.");
  console.log("IMPORTANT: change these passwords after first login in production.");

  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
