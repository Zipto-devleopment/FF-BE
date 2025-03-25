const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// ✅ Debug Cloudinary Config
console.log("Cloudinary Config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Not Loaded"
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "uploads", // Folder in Cloudinary
    format: "jpg", // Force JPG format
    public_id: Date.now() + "-" + file.originalname,
  }),
});

const upload = multer({ storage }).single("screenshot"); // ✅ Single file upload

module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Multer Error:", err);
      return res.status(500).json({ error: err.message });
    }
    
    // ✅ Debug the response from Cloudinary
    if (req.file) {
      console.log("Cloudinary Upload Response:", JSON.stringify(req.file, null, 2));
      return res.json({
        message: "✅ File uploaded successfully",
        fileUrl: req.file.path
      });
    } else {
      console.log("❌ No file found in request");
      return res.status(400).json({ error: "No file uploaded" });
    }
  });
};
