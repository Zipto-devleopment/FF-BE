const JoinRoomModel = require("../models/joinRoomodel");
const dotenv = require("dotenv");
const ParticipentModel = require("../models/participent.model");
dotenv.config();

// ✅ POST: Create Room ID (Only Admin)
const adminID = async (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ message: "⚠ Admin ID and Password are required!" });
  }

  if (id !== process.env.ADMIN_ID || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "⛔ Unauthorized: Invalid Admin Credentials " });
  }

  try {
    res.status(200).json({ message: "✅ Admin Login successfully!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error: Not Admin" });
  }
};

const roomID = async (req, res) => {
  const { RoomID, RoomPassword } = req.body;

  try {
    await JoinRoomModel.findOneAndDelete({});
    await JoinRoomModel.create({ RoomID, RoomPassword });

    res.status(200).json({ message: "✅ Room ID & Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error: Could not update Room ID!" });
  }
};

const getroomID = async (req, res) => {
  try {
    const roomID = await JoinRoomModel.findOne();
    if (!roomID) {
      return res.status(404).json({ message: "⚠ No Room ID found!" });
    }
    res.status(200).json(roomID);
  } catch (err) {
    res.status(500).json({ message: "❌ Error: Could not retrieve Room IDs!" });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { GameID, GameFee } = req.body;

    if (!GameID || !GameFee) {
      return res.status(400).json({ message: "Game ID and Game Fee are required!" });
    }

    const participant = await ParticipentModel.findOne({ GameID, GameFee });

    if (!participant) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (!participant.verified) {
      return res.status(403).json({ message: "Payment verification pending. Please wait for admin approval." });
    }
    

    const room = await JoinRoomModel.findOne();
    if (!room) {
      return res.status(500).json({ message: "Room Is Not Created yet! Please Wait..." });
    }

    res.status(200).json({ RoomID: room.RoomID, RoomPassword: room.RoomPassword });
  } catch (error) {
    console.error("Error in verifyUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteRoomID = async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await JoinRoomModel.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "⚠ Room not found!" });
    }

    await JoinRoomModel.findByIdAndDelete(roomId);

    res.status(200).json({ message: "✅ Room deleted successfully!" });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ message: "❌ Error: Could not delete room!" });
  }
};

module.exports = { adminID, roomID, getroomID, verifyUser, deleteRoomID };