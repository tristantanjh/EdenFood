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
      res.status(201).json({
        message: "User created successfully",
        user: { id: newUser.id, email: newUser.email },
      });
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the user." });
  }
};

const logOut = (req, res) => {
  req.logout((err) =>
    err
      ? console.error(err)
      : res.status(200).json({ message: "User logged out." })
  );
};

const getUserWithId = async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await User.findOne({ _id: userId });

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editProfile = async (req, res) => {
  const { userId } = req.params;
  const { email, username, profilePic } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.email = email;
    user.username = username;
    user.profilePic = profilePic;

    await user.save();

    res.status(200).json({
      message: "User profile updated successfully.",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user profile." });
  }
};

const editPassword = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  const { initialPassword, newPassword } = req.body;

  user.changePassword(initialPassword, newPassword, (error) => {
    if (error) {
      if (error.name === "IncorrectPasswordError") {
        res.status(401).json({ message: "Incorrect password" });
      } else {
        console.error(error);
        res.status(500).json({
          message: "Could not change password. Please try again later.",
        });
      }
    } else {
      res.json({ message: "Password successfully changed!" });
    }
  });
};

//module.exports = router;
//get email, profilepic by username

const getEmail = async (req, res) => {
  try {
    const { username } = req.query;
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
    const { username } = req.query;
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

const verify = async (req, res) => {
  try {
    const userId = req.body.userId;
    console.log(userId);
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { verified: true }
    );

    if (user) {
      res
        .status(200)
        .json({ message: "User successfully verified.", user: user });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  authenticateUser,
  createUser,
  logOut,
  getEmail,
  getUserWithId,
  getProfilePic,
  editProfile,
  editPassword,
  verify,
};
