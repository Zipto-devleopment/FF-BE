require("dotenv").config();

const isAdmin = async (req, res, next) => {
    const { id, password } = req.body;

    if (!id || !password) {
        return res.status(400).json({ message: "⚠ Admin ID and Password are required!" });
    }

    if (id !== process.env.ADMIN_ID || password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ message: "⛔ Unauthorized: Invalid Admin Credentials" });
    }

    next(); // Move to the next function if credentials are correct
};

module.exports = isAdmin;
