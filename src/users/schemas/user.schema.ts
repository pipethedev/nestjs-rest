import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: Number,
    password: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
