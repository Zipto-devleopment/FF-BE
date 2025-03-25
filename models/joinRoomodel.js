const mongoose = require("mongoose");

const JoinRoomSchema = new mongoose.Schema(
    {
        RoomID: String,
        RoomPassword: String,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const JoinRoomModel = mongoose.model("joinRoom", JoinRoomSchema);
module.exports = JoinRoomModel;
