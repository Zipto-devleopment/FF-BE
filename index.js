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


app.use(cors({
  origin: ["http://localhost:5173", "https://freefireturnament-lilq6k5za-niks-nimjes-projects.vercel.app","https://freefireturnament.vercel.app","https://freefireturnament-git-main-niks-nimjes-projects.vercel.app"],
  credentials:true
}));
app.use(json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use("/participent",participentRoutes)
app.use("/joinRoom",joinRoutes)
app.use("/contact", contactRoutes);

app.get("/",(req,res)=>{
  res.send("welcome to my api")
})

app.post("/upload", upload.single("screenshot"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "❌ No file uploaded" });
  }
  res.json({ message: "✅ File uploaded successfully", fileUrl: req.file.path });
});

app.listen(process.env.PORT || 3000 ,async()=>{
  try {
      await connection
      console.log(`server is running ${process.env.PORT}`)
    
  } catch (error) {
      console.log(error)
  }
})
