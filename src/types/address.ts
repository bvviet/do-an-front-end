export interface addressType {
  phone_number: string;
  address_name: string;
  city?: string;
  district?: string;
  ward?: string;
  detail_address: string;
}

export interface AddressType {
  id: number;
  user_id: number;
  address_name: string | null;
  phone_number: string;
  city: string;
  district: string;
  Ward: string;
  detail_address: string;
  is_default: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface AddressResponse {
  message: string;
  success: boolean;
  addresses: AddressType[];
}

export interface AddressDetailResponse {
  message: string;
  success: boolean;
  addresses: AddressType;
}

export interface SetAddressDefaultResponse {
  message: string;
}
