import { Schema, model, Document } from 'mongoose';
import { IUser } from './User';

export interface ISession extends Document {
  _id: string;        // UUID
  user: IUser['_id'];
  expiresAt: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    _id: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
);

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default model<ISession>('Session', sessionSchema);