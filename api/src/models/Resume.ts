import { Schema, model, Document } from 'mongoose';
import { IUser } from './User';

export interface IResume extends Document {
  user: IUser['_id'];
  name: String | null;
  data: Object | null;
  thumbnail: String | null;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: 'Y' | 'N';
}

const ResumeSchema = new Schema<IResume>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, default: null },
    data: { type: Object, default: null },
    thumbnail: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isDeleted: { type: String, enum: ['Y', 'N'], default: 'N' }
  },
  { timestamps: true }
);

export default model<IResume>('Resume', ResumeSchema);