const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    aadhar: { 
      type: String, 
      required: true,
    },
    phone: { 
      type: String, 
      required: true, 
      unique: true, 
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v); // Ensures exactly 10 digits
        },
        message: "Phone number must be exactly 10 digits."
      }
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v); // Standard email format
        },
        message: "Invalid email format."
      }
    },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true }, // Storing plain text (but should be hashed in production)
    bloodGroup: { type: String },
    medicalConditions: { type: String },
    profileImage: { type: String },

    // Emergency contacts per option
    emergencyContacts: [
      {
        optionName: { type: String, required: true }, // e.g., "Fire", "Medical"
        contacts: [{ 
          type: String, 
          required: true,
          validate: {
            validator: function (v) {
              return /^[0-9]{10}$/.test(v); // Ensures valid 10-digit phone numbers
            },
            message: "Each emergency contact number must be exactly 10 digits."
          }
        }] // List of phone numbers
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
