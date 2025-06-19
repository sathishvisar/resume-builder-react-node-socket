import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { generateApiKey } from "./../utils/common";
import { randomUUID } from "crypto";
import Session from "../models/Session";
import User, { IUser } from "../models/User";

interface LoginResult {
  user: IUser;
}

// const COOKIE_NAME = 'sid';

// const cookieOptions = {
//   // httpOnly: true,
//   // secure: false, // process.env.NODE_ENV === 'production',  // HTTPS only in prod
//   // sameSite: 'lax',
//   // path: '/',                     // 'lax' if same‑site -- 'none' as const
//   // maxAge: 86_400_000                         // 1 hour
// };

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req: Request, res: Response) => {
  const { token } = req.body;
  try {
    //   const { data } = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`); // optional
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Check or create user in MongoDB
    let user = await User.findOne({ email: payload?.email });
    console.log(user);
    if (!user) {
      user = await User.create({
        googleId: payload?.sub,
        firstname: payload?.name,
        email: payload?.email,
        picture: payload?.picture,
      });
    }

    const sid = randomUUID();
    await Session.create({
      _id: sid,
      user: user._id,
      expiresAt: new Date(Date.now() + 86_400_000), // 24 h
    });

    res
      .cookie("sid", sid, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 86_400_000,
      })
      .json({
        user: {
          id: user.id,
          name: `${user.firstname} ${user.lastname}`,
          email: user.email,
        },
      });
  } catch (e) {
    throw e;
  }
};

export const registerUser = async (email: string, password: string) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already exists");
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashedPassword,
  });
  return {
    user: newUser,
  };
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");
  if (!user.password) throw new Error("User has no password set.");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const sid = randomUUID();
  await Session.create({
    _id: sid,
    user: user._id,
    expiresAt: new Date(Date.now() + 86_400_000), // 24 h
  });

  res
    .cookie("sid", sid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86_400_000,
    })
    .json({
      user: {
        id: user.id,
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
      },
    });
};
