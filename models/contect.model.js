const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    GameID: { type: String, required: true },
    Problem: { type: String, required: true },
    Summary: { type: String, required: true }
}, { timestamps: true });

const ContactModel=mongoose.model("contect",contactSchema);
module.exports = ContactModel;
