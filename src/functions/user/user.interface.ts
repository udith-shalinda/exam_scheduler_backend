export interface ICreateUser{
    username: string;
    email: string;
    password: string;
}

export interface IUser{
    username: string;
    email: string;
}
export interface ILoginUser{
    email: string;
    password: string;
}

export interface ILoginRes {
    user: IUser;
    token: string;
}