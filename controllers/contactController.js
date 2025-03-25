const ContactModel = require("../models/contect.model");

// Handle user contact form submission
const submitContactForm = async (req, res) => {
    try {
        const { GameID, Problem, Summary } = req.body;

        // Validate input fields
        if (!GameID || !Problem || !Summary) {
            return res.status(400).json({ message: "❌ Please fill all fields." });
        }

        // Save to database
        await ContactModel.create({ GameID, Problem, Summary });

        res.json({ message: "✅ Your complaint has been submitted successfully." });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ message: "❌ Error submitting complaint", error: error.message });
    }
};

// Get all complaints (optional for admin panel)
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await ContactModel.find();
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: "❌ Error fetching complaints", error: error.message });
    }
};

module.exports = { submitContactForm, getAllComplaints };
