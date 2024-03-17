import { User } from "../model/userModel.js";

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password." });
    } else if (user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    res.json({ userId: user._id });
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

const createUser = async (req, res) => {
  const { username, email, password, profilePic } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken." });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ error: "Email is already taken." });
    }

    const newUser = new User({
      username,
      email,
      password,
      profilePic,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the user." });
  }
};

//get email, profilepic by username

const getEmail = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username });

    if (user) {
      res.status(200).json({ email: user.email });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProfilePic = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username });

    if (user && user.profilePic) {
      res.status(200).json({ profilePic: user.profilePic });
    } else if (user && !user.profilePic) {
      res.status(404).json({ message: "Profile picture not set." });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { login, createUser, getEmail, getProfilePic };
