const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json("User already exists");

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json(user);

    } catch (err) {
        res.status(500).json(err.message);
    }
};

// LOGIN
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json("Invalid credentials");

        const token = jwt.sign({ id: user._id }, "secretkey", {
            expiresIn: "1d"
        });

        res.json({ token, user });

    } catch (err) {
        res.status(500).json(err.message);
    }
};