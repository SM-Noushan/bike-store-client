import { TBike } from "./Bike.Types";
import { TUser } from "./Profile.Types";
import { TCommonResponseData } from "./Global.Types";

export type TOrderItem = {
  product: TBike;
  quantity: number;
  _id: string;
};

export type TOrder = {
  orderId: string;
  email: string;
  totalAmount: number;
  currency: string;
  paymentStatus: string;
  paymentIntent: string;
  sessionId: string;
  createdAt: Date;
  items: TOrderItem[];
} & TCommonResponseData;

export type TOrderDetails = {
  userDetails: TUser;
  items: {
    product: TBike;
    quantity: number;
  }[];
} & Omit<TOrder, "items">;
