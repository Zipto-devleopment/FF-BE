const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connection = require("./Config/db");
const upload = require("./Multer/upload.multer"); // ✅ Import Cloudinary Multer config
const participentRoutes = require("./routes/participent.routes");
const joinRoutes = require("./routes/joinRoom.routes");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware for parsing JSON and form-data
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files (for serving local uploads, but not needed for Cloudinary)
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/participent", participentRoutes);
app.use("/joinRoom", joinRoutes);
app.use("/contact", contactRoutes);

// Test API
app.get("/", (req, res) => {
  res.send("🚀 Welcome to my API");
});

// ✅ Add Cloudinary upload route (for testing)
// app.post("/upload", upload.single("screenshot"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "❌ No file uploaded" });
//   }
//   res.json({ message: "✅ File uploaded successfully", fileUrl: req.file.path });
// });

app.post("/upload", (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Upload Error:", err);
      return res.status(500).json({ error: err.message });
    }

    // ✅ Ensure `req.file` exists
    if (!req.file) {
      return res.status(400).json({ message: "❌ No file uploaded" });
    }

    console.log("✅ Upload Success:", JSON.stringify(req.file, null, 2));
    res.json({
      message: "✅ File uploaded successfully",
      fileUrl: req.file.path
    });
  });
});

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
