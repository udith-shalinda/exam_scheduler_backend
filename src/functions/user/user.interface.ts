export interface ICreateUser{
    username: string;
    email: string;
    password: string;
}

export interface IUser{
    id: number;
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