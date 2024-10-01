export interface IUser{
    id:string,
    name:string,
    surname:string,
    login:string,
    password:string,
    isPrivate:boolean,
    cover:string,
    picture:string
    status?:string
    newpwd:string,
    old:string
};

export type InputUser = Omit<IUser, 'id' | 'isPrivate' | 'cover'| 'picture'>;

export interface IResponse{
    status:string,
    message?:string,
    payload?:unknown,
    user?:IWideUser
}

export type ILoginedUser = Omit<IUser,'id' | 'isPrivate' | 'cover' | 'picture' | 'name' | 'surname'>;

export interface ILogoutedUser{
    status:string,
    message?:string
    user?:null
}

export interface IChangePasswordUser{
    old:string,
    newpwd:string
}

export interface CIhangeLoginUser{
    password:string,
    login:string
}

export interface IWideUser extends IUser{
    followers:[],
    following:[]
}

export interface IContextType{
    account:IWideUser,
    setAccount:(user:IWideUser)=>void
}

export interface IPost{
    id:number,
    title:string,
    picture:string
}

export interface IAccount extends IUser{
    status:string
    payload:IUser | null
    followers:[]
    following:[]
    posts:IPost[]
}