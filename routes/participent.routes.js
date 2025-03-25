const express = require("express");
const multer = require("multer");
const path = require("path");
const { userDetails, getuserDetails, getAll5rsuserDetails, getAll10rsuserDetails, getAll20rsuserDetails, deleteAll5rsuserDetails, deleteAll10rsuserDetails, deleteAll20rsuserDetails, deleteParticipantById } = require("../controllers/participent.controller");
const ParticipentModel = require("../models/participent.model");


const participentRoutes = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage });

// Update route to handle file uploads
participentRoutes.post("/userDetails/rs5", upload.single("screenshot"), userDetails);
// participentRoutes.post("/userDetails/rs10", upload.single("screenshot"), userDetails);
// participentRoutes.post("/userDetails/rs20", upload.single("screenshot"), userDetails);
participentRoutes.get("/getUserDetails", getuserDetails);
participentRoutes.get("/getAll5rsUserDetails", getAll5rsuserDetails);
participentRoutes.get("/getAll10rsUserDetails", getAll10rsuserDetails);
participentRoutes.get("/getAll20rsUserDetails", getAll20rsuserDetails);
participentRoutes.delete("/deleteAll5rsUserDetails", deleteAll5rsuserDetails);
participentRoutes.delete("/deleteAll10rsUserDetails", deleteAll10rsuserDetails);
participentRoutes.delete("/deleteAll20rsUserDetails", deleteAll20rsuserDetails);
participentRoutes.delete("/deleteParticipant/:id", deleteParticipantById);
participentRoutes.post("/verifyParticipant", async (req, res) => {
    try {
        console.log("Received Body:", req.body); // Debugging

        const { id, verified } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Participant ID is required" });
        }

        const participant = await ParticipentModel.findByIdAndUpdate(
            id,
            { verified },
            { new: true }
        );

        if (!participant) {
            return res.status(404).json({ message: "Participant not found" });
        }

        res.json({ message: "Verification status updated", participant });
    } catch (error) {
        console.error("❌ Backend Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


participentRoutes.post("/verifyUser", async (req, res) => {
    try {
      const { GameID, GameFee } = req.body;
  
      // Validate input
      if (!GameID || !GameFee) {
        return res.status(400).json({ message: "Game ID and Game Fee are required" });
      }
  
      // Find the participant by GameID and GameFee
      const participant = await ParticipentModel.findOne({ GameID, GameFee });
  
      if (!participant) {
        return res.status(404).json({ message: "Participant not found" });
      }
  
      // Check if the participant is already verified
      if (participant.verified) {
        return res.status(200).json({ message: "Participant is already verified" });
      }
  
      // Verify the participant
      participant.verified = true;
      await participant.save();
  
      // Fetch room details (assuming you have a JoinRoomModel)
      const room = await JoinRoomModel.findOne();
      if (!room) {
        return res.status(404).json({ message: "Room details not found" });
      }
  
      // Send room details to the frontend
      res.status(200).json({
        message: "Participant verified successfully",
        RoomID: room.RoomID,
        RoomPassword: room.RoomPassword,
      });
    } catch (error) {
      console.error("❌ Backend Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  


module.exports = participentRoutes;