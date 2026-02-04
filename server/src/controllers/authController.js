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

    const isVerified = await bcrypt.compare(password, existingUser.password);
    if (!isVerified) {
      const error = new Error("Wrong Password");
      error.statusCode = 401;
      return next(error);
    }

    res.status(200).json({ message: "Login Successfully", data: existingUser });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
