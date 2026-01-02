const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend & MongoDB are connected");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
