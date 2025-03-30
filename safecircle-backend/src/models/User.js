const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    aadhar: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true },
    bloodGroup: { type: String }, // ✅ Added
    medicalConditions: { type: String }, // ✅ Added
    profileImage: { type: String }, // ✅ Added (Stores image URL) // Storing plain text password (NOT RECOMMENDED)
  },
  { timestamps: true }
);

// Compare passwords (Plain text comparison)
UserSchema.methods.matchPassword = function (enteredPassword) {
  return this.password === enteredPassword; // Simple string comparison
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
