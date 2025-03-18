const Contact = require("../models/Contact");
const User = require("../models/User");

// Add a trusted contact
const addContact = async (req, res) => {
    try {
        const { name, phone } = req.body;
        const userId = req.user.id;

        const contact = new Contact({ user: userId, name, phone });
        await contact.save();

        await User.findByIdAndUpdate(userId, { $push: { trustedContacts: contact._id } });

        res.status(201).json({ message: "Contact added successfully", contact });
    } catch (error) {
        res.status(500).json({ error: "Error adding contact" });
    }
};

// Get all trusted contacts
const getContacts = async (req, res) => {
    try {
        const userId = req.user.id;
        const contacts = await Contact.find({ user: userId });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: "Error fetching contacts" });
    }
};

// Update a contact
const updateContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const { name, phone } = req.body;

        const updatedContact = await Contact.findByIdAndUpdate(contactId, { name, phone }, { new: true });

        if (!updatedContact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(500).json({ error: "Error updating contact" });
    }
};

// Delete a contact
const deleteContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const userId = req.user.id;

        await Contact.findByIdAndDelete(contactId);
        await User.findByIdAndUpdate(userId, { $pull: { trustedContacts: contactId } });

        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting contact" });
    }
};

// ✅ Ensure all functions are properly exported
module.exports = {
    addContact,
    getContacts,
    updateContact,
    deleteContact
};
