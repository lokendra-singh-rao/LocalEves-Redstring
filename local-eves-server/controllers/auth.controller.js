import * as authServices from "../services/auth.service.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { fullname, email, dob, role, password } = req.body;

    const response = await authServices.signUp({ fullname, email, dob, role, password });

    if (!response.ok) return res.status(response.status).json({ ok: false, err: response.err });

    return res.status(200).json({ ok: true, data: response.data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, err: "Something went wrong!" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp, otpToken } = req.body;
    const { userId } = jwt.verify(otpToken, process.env.AUTH_TOKEN_SECRET);

    if (Number(otp) > 99999 && Number(otp) < 1000000) {
      const response = await authServices.verifyOtp({ otp, userId });

      if (response.ok) {
        return res.status(response.status).json({ ok: true, data: response.data });
      } else {
        return res.status(response.status).json({ ok: false, err: response.err });
      }
    } else {
      return res.status(400).json({ ok: false, err: "Invalid OTP! Please try again" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, err: "Something went wrong! Our team is working on it" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: false, err: "Email or Password cannot be empty!" });
    }

    const response = await authServices.login({ email, password });

    if (response.ok) {
      res.cookie("token", response.data?.token, {
        expires: new Date(Date.now() + 86400000),
        secure: true,
        httpOnly: true,
        sameSite: "None",
      });

      return res.status(response.status).json({ ok: true, data: response.data.user });
    } else {
      return res.status(response.status).json({ ok: false, err: response.err });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ok: false, err: "Something went wrong! Our team is working on it" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ ok: true, data: "Logged out successfully!" });
  } catch (err) {
    return res.status(500).json({ ok: false, err: "Something went wrong! Our team is working on it" });
  }
};
