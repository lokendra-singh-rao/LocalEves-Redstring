import { createUser, findUser } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { findOtp, updateOtp } from "../models/otp.model.js";
import { sendOtpEmail } from "./mail.service.js";
import { v4 } from "uuid";
import { comparePassword, encryptPassword } from "../utils/password.utils.js";

export const signUp = async ({ fullname, email, dob, role, password }) => {
  const existingUser = await findUser({ email });

  if (existingUser) {
    return { ok: false, status: 400, err: "Email already registered!" };
  }

  // hashing password
  const passwordHash = await encryptPassword({ password });

  const userId = v4();
  await createUser({ userId, fullname, email, dob, role, passwordHash });
  await sendOtpEmail({ userId, userEmail: email });

  const otpToken = jwt.sign(
    {
      fullname,
      email,
      userId,
    },
    process.env.AUTH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return { ok: true, status: 200, data: { message: "User registered successfully! Verify email to login", otpToken } };
};

export const verifyOtp = async ({ otp, userId }) => {
  const user = await findUser({ userId });

  if (!user) {
    return { ok: false, status: 404, err: "User not found!" };
  }

  if (user.isDeleted) {
    return { ok: false, status: 403, err: "Account disabled!" };
  }

  const otpModel = await findOtp({ userId });

  if (otpModel.isVerified) {
    return { ok: false, status: 400, err: "Email already verified!" };
  } else if (Number(otpModel.otp) === Number(otp)) {
    await updateOtp({ query: { userId }, update: { $set: { isVerified: true } }, options: { upsert: false } });

    return { ok: true, status: 200, data: "Email verified successfully! Login to continue" };
  } else {
    return { ok: false, status: 400, err: "Invalid OTP! Please try again" };
  }
};

export const login = async ({ email, password }) => {
  const user = await findUser({ email });

  // compare passwords
  const requestedPassword = password;
  const originalPassword = user.passwordHash;
  if (await comparePassword({ requestedPassword, originalPassword })) {
    // generate jwt token
    const token = jwt.sign(
      {
        name: user.fullname,
        email: user.email,
        userId: user.userId,
        role: user.role,
      },
      process.env.AUTH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return {
      ok: true,
      status: 200,
      data: {
        user: {
          name: user.fullname,
          email: user.email,
          role: user.role,
        },
        token,
      },
    };
  }

  return {
    ok: false,
    status: 401,
    err: "Email or Password incorrect!",
  };
};
