import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string | null;
  token: string | null;
  newsletter: 'Y' | 'N';
  firstname: string | null;
  lastname: string | null;
  lastLogin: Date;
  picture: string | null;
  googleId: string | null;
  createdAt: Date;
  updatedAt: Date;
  isVerified: 'Y' | 'N';
  isDeleted: 'Y' | 'N';
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, default: null },
    token: { type: String, default: null },
    newsletter: { type: String, enum: ['Y', 'N'], default: 'N' },
    firstname: { type: String, default: null },
    lastname: { type: String, default: null },
    lastLogin: { type: Date, default: Date.now },
    picture: { type: String, default: null },
    googleId: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isVerified: { type: String, enum: ['Y', 'N'], default: 'N' },
    isDeleted: { type: String, enum: ['Y', 'N'], default: 'N' }
  },
  {
    timestamps: false,
  }
);

export default mongoose.model<IUser>('User', UserSchema);
