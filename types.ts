export interface Bag {
  name: string;
  hmid: number;
  weight: number;
  price: number;
  strain: string;
  notes: string;
  pic: string;
  tag: string
}
export interface User {
  alias: string;
  wallet: string;
  user: string;
  role: string;
  notes:string;
}