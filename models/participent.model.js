const mongoose = require("mongoose");

const ParticipentSchema = new mongoose.Schema(
    {
        GameFee: String,
        GameID: String,
        UpiID: String,
        UtrNumber: String, 
        verified: { type: Boolean, default: false }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const ParticipentModel = mongoose.model("rs5user", ParticipentSchema);

module.exports = ParticipentModel;
