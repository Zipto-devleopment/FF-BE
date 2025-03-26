const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connection = require("./Config/db");
const participentRoutes = require("./routes/participent.routes");
const joinRoutes = require("./routes/joinRoom.routes");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Middleware for parsing JSON and form-data
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/participent", participentRoutes);
app.use("/joinRoom", joinRoutes);
app.use("/contact", contactRoutes);


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await connection; // Ensure DB is connected before starting
    console.log(`🚀 Server is running on port ${PORT}`);
  } catch (error) {
    console.error("❌ Database Connection Error:", error);
  }
});
