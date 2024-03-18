import passport from "passport";
import { User } from "../model/userModel.js";
import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;
import express from "express";
const router = express.Router();

// Configure Passport to use Local Strategy
passport.use(User.createStrategy());

// Serialize and deserialize user instances to support login sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware function for authentication
const authenticateUser = (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: "Authentication failed." });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        message: "Authentication successful",
        user: { id: user.id, email: user.email },
      });
    });
  })(req, res, next);
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
      profilePic,
    });

    // Use Passport's `register` method to handle password hashing
    await User.register(newUser, password);

    // Automatically log in the user after registration
    req.login(newUser, (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "An error occurred during login." });
      }
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the user." });
  }
};

//module.exports = router;
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

export { authenticateUser, createUser, getEmail, getProfilePic };
