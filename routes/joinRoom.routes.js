const express = require("express");
const isAdmin = require("../Middleware/auth"); // Middleware for admin check
const { roomID, getroomID, adminID, verifyUser, deleteRoomID } = require("../controllers/joinroom.controller");

const joinRoutes = express.Router();

// ✅ Only admin can create a Room ID
joinRoutes.post("/adminID", adminID);
joinRoutes.post("/roomID", roomID);

// ✅ Anyone can get Room ID
joinRoutes.get("/getroomID", getroomID);

// ✅ Only admin can delete a Room ID
joinRoutes.delete("/deleteID/:roomId", deleteRoomID);

// Verify User API
joinRoutes.post("/verifyUser", verifyUser);

module.exports = joinRoutes;