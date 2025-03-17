import initKnex from "knex";
import configuration from "../knexfile.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const knex = initKnex(configuration);

// 🔑 Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ✅ Register User
const registerUser = async (req, res) => {
  const { first_name, last_name, email, password, username } = req.body;
  if (!first_name || !last_name || !email || !password || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await knex("users").where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [userId] = await knex("users").insert({
      first_name,
      last_name,
      email,
      username,
      password: hashedPassword,
    });

    const token = generateToken(userId);
    res.status(201).json({ token, message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

// ✅ Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await knex("users").where({ email }).first();
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user.id);
    res.status(200).json({ token, message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

// ✅ Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await knex("users")
      .select("id", "first_name", "last_name", "email", "username")
      .where({ id: req.user.id })
      .first();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

// 🚀 Export functions (named exports)
export { registerUser, loginUser, getUserProfile };
