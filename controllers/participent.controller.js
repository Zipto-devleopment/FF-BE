const ParticipentModel = require("../models/participent.model");


// const userDetails = async (req, res) => {
//     const { GameFee, GameID, UpiID  } = req.body;
//     const screenshot = req.file ? req.file.path : null; 

//     if (!GameFee || !GameID || !UpiID || !screenshot) {
//         return res.status(400).send("Please fill all details. Screenshot is required.");
//     }

//     try {
//         await ParticipentModel.create({ GameFee , GameID, UpiID, screenshot });
//         res.send("You are a participant successfully");
//     } catch (error) {
//         res.status(500).send("Error: Not a participant");
//     }
    
// };

const userDetails = async (req, res) => {
    console.log("Request Body:", req.body);  // Debugging
    console.log("Uploaded File:", req.file); // Debugging

    const { GameFee, GameID, UpiID } = req.body;
    const screenshot = req.file ? req.file.path : null; 

    if (!GameFee || !GameID || !UpiID || !screenshot) {
        return res.status(400).json({ message: "❌ Please fill all details. Screenshot is required." });
    }

    try {
        await ParticipentModel.create({  GameID, UpiID, GameFee, screenshot });
        res.json({ message: " You are a participant successfully" });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ message: "❌ Error: Not a participant", error: error.message });
    }
};


const getuserDetails=async(req,res)=>{
    try{
        const getUser=await  ParticipentModel.find();
        if(!getUser || getUser.length === 0)
        {
            return res.status(404).send("No user found");
        }
        res.send(getUser);
    }
    catch(error){
        res.status(500).json({ message: "❌ Error: Could not retrieve User's" });
    }

}

const getAll5rsuserDetails=async(req,res)=>{
    try{
        const getUser=await  ParticipentModel.find({ GameFee: 5 });
        if(!getUser || getUser.length === 0)
        {
            return res.status(404).send("No user found");
        }
        res.send(getUser);
    }
    catch(error){
        res.status(500).json({ message: "❌ Error: Could not retrieve User's" });
    }
}




 
const getAll10rsuserDetails=async(req,res)=>{
    try{
        const getUser=await  ParticipentModel.find({ GameFee: 10 });
        if(!getUser || getUser.length === 0)
        {
            return res.status(404).send("No user found");
        }
        res.send(getUser);
    }
    catch(error){
        res.status(500).json({ message: "❌ Error: Could not retrieve User's" });
    }
}

const getAll20rsuserDetails=async(req,res)=>{
    try{
        const getUser=await  ParticipentModel.find({ GameFee: 20 });
        if(!getUser || getUser.length === 0)
        {
            return res.status(404).send("No user found");
        }
        res.send(getUser);
    }
    catch(error){
        res.status(500).json({ message: "❌ Error: Could not retrieve User's" });
    }
}

const deleteAll5rsuserDetails = async (req, res) => {
    try {
        const removed = await ParticipentModel.deleteMany({ GameFee: 5 });

        if (removed.deletedCount === 0) {
            return res.status(404).json({ message: "No ₹5 participants found to delete." });
        }

        res.status(200).json({ message: `✅ Successfully deleted ${removed.deletedCount} ₹5 participants.` });

    } catch (error) {
        res.status(500).json({ message: "❌ Error: Could not delete users", error: error.message });
    }
};

const deleteAll10rsuserDetails = async (req, res) => {
    try {
        const removed = await ParticipentModel.deleteMany({ GameFee: 10 });

        if (removed.deletedCount === 0) {
            return res.status(404).json({ message: "No ₹10 participants found to delete." });
        }

        res.status(200).json({ message: `✅ Successfully deleted ${removed.deletedCount} ₹10 participants.` });

    } catch (error) {
        res.status(500).json({ message: "❌ Error: Could not delete users", error: error.message });
    }
};

const deleteAll20rsuserDetails = async (req, res) => {
    try {
        const removed = await ParticipentModel.deleteMany({ GameFee: 20 });

        if (removed.deletedCount === 0) {
            return res.status(404).json({ message: "No ₹20 participants found to delete." });
        }

        res.status(200).json({ message: `✅ Successfully deleted ${removed.deletedCount} ₹20 participants.` });

    } catch (error) {
        res.status(500).json({ message: "❌ Error: Could not delete users", error: error.message });
    }
};

const deleteParticipantById = async (req, res) => {
    try {
        const { id } = req.params; // Get participant _id from request params
        const deletedParticipant = await ParticipentModel.findByIdAndDelete(id);

        if (!deletedParticipant) {
            return res.status(404).json({ message: "❌ Participant not found!" });
        }

        res.status(200).json({ message: "✅ Participant deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "❌ Error: Could not delete participant!" });
    }
};

const verifyParticipant = async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Debugging
      const { id, verified } = req.body;
  
      if (!id || typeof verified !== "boolean") {
        return res.status(400).json({ message: "Invalid request data" });
      }
  
      const participant = await ParticipentModel.findByIdAndUpdate(
        id,
        { verified },
        { new: true }
      );
  
      if (!participant) {
        return res.status(404).json({ message: "Participant not found" });
      }
  
      console.log("Updated Participant:", participant); // Debugging
      res.json({
        message: `User verification ${verified ? "enabled" : "disabled"} successfully`,
        participant,
      });
    } catch (error) {
      console.error("❌ Backend Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

module.exports = { userDetails, getuserDetails ,getAll5rsuserDetails ,getAll10rsuserDetails ,getAll20rsuserDetails ,deleteAll5rsuserDetails ,deleteAll10rsuserDetails ,deleteAll20rsuserDetails ,deleteParticipantById ,verifyParticipant };