export interface User {
    username: string;
    token: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
    displayName: string;
    phoneNumber: string;
}

export interface RegisterResponse {
    success: boolean;
    user: User;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        };
    };
    message: string;
    name: string;
    _message: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface GlobalError {
    error: string
    success: boolean;
    message: {
        [key: string]: string;
    };
}

export interface Item {
  _id: string;
  user: User;
  category: Category;
  title: string;
  description: string;
  imageUrl: string | null;
  price: number;
}

export interface ItemMutation {
  user: string;
  category: string;
  title: string;
  description: string;
  imageUrl: File | null;
  price: string;
}

export interface Category {
  _id: string;
  title: string;
}

export type ApiItem =   Omit<ItemMutation, '_id'>