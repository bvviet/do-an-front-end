import { addressType } from "./address";

export interface userType {
  id: number;
  name: string;
  email: string;
  avatar: string;
  addresses: addressType[];
  link_fb: string;
  link_tt: string;
  role: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}
