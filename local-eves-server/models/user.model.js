import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    fullname: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["ORGANISER", "PARTICIPANT"], required: true },
    isEmailVerified: { type: Boolean, required: true, default: false },
    isDeleted: { type: Boolean, required: true, default: false },
    lastLogin: { type: Date, required: true, default: new Date(0) },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", UserSchema);

export const findUser = async ({ email, userId }) => {
  const user = await UserModel.findOne({ $or: [{ email }, { userId }] });
  return user;
};

export const createUser = async ({ userId, fullname, email, dob, role, passwordHash }) => {
  const user = await UserModel.create({ userId, fullname, email, dob, role, passwordHash });
  return user;
};
