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
    password: { type: String, required: true }, // Keeping plain text as per request
    bloodGroup: { type: String },
    medicalConditions: { type: String },
    profileImage: { type: String },

    // Emergency contacts per option
    emergencyContacts: [
      {
        optionName: { type: String, required: true }, // e.g., "Fire", "Medical"
        contacts: [{ type: String, required: true }] // List of phone numbers
      }
    ]
  },
  { timestamps: true }
);

// Function to update or add emergency contacts
UserSchema.methods.updateEmergencyContact = function (optionName, newContacts) {
  const index = this.emergencyContacts.findIndex((opt) => opt.optionName === optionName);
  if (index !== -1) {
    this.emergencyContacts[index].contacts = newContacts; // Update existing
  } else {
    this.emergencyContacts.push({ optionName, contacts: newContacts }); // Add new
  }
  return this.save();
};

// Direct password comparison (not recommended for security)
UserSchema.methods.matchPassword = function (enteredPassword) {
  return this.password === enteredPassword;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
