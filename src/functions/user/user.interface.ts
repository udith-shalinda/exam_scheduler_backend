export enum providerTypes {
  "google" = "Google",
  "email" = "Email",
}
export enum userRoleTypes {
  "student" = "student",
  "admin" = "admin",
}
export interface ICreateUser {
  username: string;
  email: string;
  provider?: providerTypes;
  password: string;
  role?: userRoleTypes;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  provider?: string;
  role?: userRoleTypes;
}
export interface ILoginUser {
  email: string;
  password: string;
}

export interface ILoginRes {
  user: IUser;
  token: string;
}
