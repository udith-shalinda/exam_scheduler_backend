export enum providerTypes {
  "google" = "Google",
  "email" = "Email",
}
export interface ICreateUser {
  username: string;
  email: string;
  provider?: providerTypes;
  password: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  provider?: string;
}
export interface ILoginUser {
  email: string;
  password: string;
}

export interface ILoginRes {
  user: IUser;
  token: string;
}
