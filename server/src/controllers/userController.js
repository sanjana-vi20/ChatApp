import User from "../models/userSchema.js";

export const fetchAllContacts = async (req, res, next) => {
  try {
    const data = await User.find().select("-password");

    console.log("data : ", data);

    res.status(200).json({ message: "fetched All contacts", data: data });
  } catch (error) {
    next(error);
  }
};
