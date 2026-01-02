const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST: Create new contact
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await contact.save();

    res.status(201).json({ message: "Contact saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET: Fetch all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
