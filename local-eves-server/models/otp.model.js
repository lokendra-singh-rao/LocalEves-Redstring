import mongoose from "mongoose";

const otpSchema = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    otp: {
      type: Number,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const OtpModel = mongoose.model("otp", otpSchema);

export const findOtp = async ({ userId }) => {
  const otp = await OtpModel.findOne({ userId });
  return otp;
};

export const saveOtp = async ({ userId, otp }) => {
  await OtpModel.create({ userId, otp });
};

export const updateOtp = async ({ query, update, options }) => {
  const otp = await OtpModel.findOneAndUpdate(query, update, options);
  return otp;
};
