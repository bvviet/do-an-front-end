import { addressType } from "./address";


export interface userType {
  id: number;
  name: string;
  email: string;
  avatar: string;
  addresses: [addressType];
}
