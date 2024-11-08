export interface ICheckOut {
  payment_method: number;
  note: string;
}
export interface CheckOut {
  success: boolean;
  message: string;
  redirect_url: string;
  payment_url: string;
}
