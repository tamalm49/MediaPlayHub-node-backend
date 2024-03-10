import { Document } from 'mongoose';
export interface UserDocument extends Document {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  watchHistory?: string[];
  password: string;
  refreshToken?: string;
}
export interface UserType {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  watchHistory?: string[];
  password: string;
  refreshToken?: string;
}
export interface AccessPayload {
  use_id: string;
}
