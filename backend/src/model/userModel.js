import { mongoose, passport, passportLocalMongoose } from "../../config.js";

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  wishlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wishlist",
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rating",
    },
  ],
});

userSchema.methods.verifyPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

userSchema.plugin(passportLocalMongoose, { usernameField: "email" }); // Add passport-local-mongoose plugin to handle user authentication

const User = mongoose.model("User", userSchema); // Create User model

passport.use(User.createStrategy()); // Use local strategy for authentication
passport.serializeUser(User.serializeUser()); // Serialize user for session
passport.deserializeUser(User.deserializeUser()); // Deserialize user from session

export { User, passport };
