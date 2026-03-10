import User from "../models/userSchema.js";
import bcrypt from "bcrypt";

export const UserRegister = async (req, res, next) => {
  try {
    const { fullName, email, mobnumber, password } = req.body;

    if (!fullName || !email || !mobnumber || !password) {
      const error = new Error("All Fields are Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("Email already Registered");
      error.statusCode = 409;
      return next(error);
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      mobnumber,
      password: hashpassword,
      userType : "regular"
    });

    res.status(201).json({ message: "Registered Successfully" });
  } catch (error) {
    next(error);
  }
};

export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All Fields are Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
     if (!existingUser) {
      const error = new Error("Email not registered");
      error.statusCode = 400;
      return next(error);
    }
    const isGoogleUser = existingUser.userType === "google";
    if (isGoogleUser) {
      const error = new Error("Please log in with Google");
      error.statusCode = 400;
      return next(error);
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordMatch) {
      const error = new Error("Password did not match");
      error.statusCode = 400;
      return next(error);
    }

    res.status(200).json({ message: "Login Successfully", data: existingUser });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const UserLogout = async (req, res, next) => {
  try {
    // res.clearCookie("oreo");
    res.status(200).json({ mesasge: "Logout Successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};


export const GoogleUserLogin = async (req, res, next) => {
  try {
    const { email, id, name, imageUrl } = req.body; 

    // STEP 1: Always search by email first. 
    // Email is the most reliable unique identifier.
    let user = await User.findOne({ email });

    if (user) {
      console.log("User found, checking types...");

      // CASE A: User exists but was a 'regular' (password) user.
      // We upgrade them to 'hybrid'.
      if (user.userType === "regular") {
        user.googleId = id; // Store RAW ID, NO BCRYPT
        user.userType = "hybrid";
        await user.save();
      }
      
      // CASE B: User is already 'google' or 'hybrid'.
      // We don't need to do anything, just let them log in.
    } else {
      console.log("New user detected, creating record...");

      // STEP 2: Only create if NO user was found with that email.
      user = await User.create({
        fullName: name,
        email: email,
        googleId: id, // Store RAW ID
        userType: "google",
        profilePic: imageUrl || "https://placehold.co/400"
      });
    }

    // STEP 3: Return the user (existing or new)
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
    });

  } catch (error) {
    // If Mongoose 'unique' constraint triggers, it will catch here
    next(error);
  }
};

