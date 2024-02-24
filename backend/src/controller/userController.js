import { User } from "../model/userModel.js";


const createUser =async (req, res) => {
    const { username, email, password, profilePic } = req.body;
  
    try {
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
  }


  export { createUser };