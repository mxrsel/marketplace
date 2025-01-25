export interface UserTypes {
    username: string;
    password: string;
    displayName: string;
    phoneNumber: string;
    token: string;
}

export interface Category {
  _id: string;
  title: string;
}

export interface Item {
  _id: string;
  user: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string | null;
  price: number;
}

export type ItemMutation = Omit<Item, '_id'>;