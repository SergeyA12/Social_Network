import axios from "axios";
import { IChangePasswordUser, CIhangeLoginUser, InputUser, IResponse, ILoginedUser } from "./types";

const Axios = axios.create({
    baseURL:"http://localhost:4002",
    withCredentials:true
});

export const handleSignup = async (user:InputUser):Promise<IResponse>=>{
    const response = await Axios.post('/signup', user)
    return response.data
};

export const handleLogin = async (user:ILoginedUser):Promise<IResponse>=>{
    const response = await Axios.post('login', user)
    return response.data
}

export const handleVeryfy = async ():Promise<IResponse>=>{
    const response = await Axios.get("/verify")
    return response.data
}

export const handleLogout = async ():Promise<IResponse>=>{
    const response = await Axios.post('/logout')
    return response.data
}

export const handleChangePassword = async(payload:IChangePasswordUser):Promise<IResponse>=>{
    const response = await Axios.patch("/update/password",payload)
    return response.data
}

export const handleChangeLogin = async(payload:CIhangeLoginUser):Promise<IResponse>=>{
    const response = await Axios.patch("/update/login",payload)
    return response.data
}

export const handlePictureUpload = async (data:FormData):Promise<IResponse>=>{
    const response = await Axios.patch("/profile/upload",data)
    return response.data
}

export const handleCoverUpload = async(data:FormData):Promise<IResponse>=>{
    const response = await Axios.patch("/cover/upload", data)
    return response.data
}

export const handleGetPosts = async ():Promise<IResponse>=>{
    const response = await Axios.get('/posts')
    return response.data
} 

export const handlePostCreation = async (data: FormData):Promise<IResponse>=>{
    const response = await Axios.post('/posts', data)
    return response.data
}

export const handleSearch = async (text:string):Promise<IResponse>=>{
    const response = await Axios.get('/search/' + text)
    return response.data
}

export const handlePrivate = async():Promise<IResponse>=>{
    const response = await Axios.patch("/account/set")
    return response.data
}

export const handleAccountbyId = async(id:string):Promise<IResponse>=>{
    const response = await Axios.get(`/account/${id}`)
    return response.data
}

export const handleSendFollow = async (id:string):Promise<IResponse>=>{
    const response = await Axios.post('/account/follow/' +id)
    return response.data
}

export const handleUnfollow = async(id:string):Promise<IResponse>=>{
    const response = await Axios.post('/account/unfollow/'+id)
    return response.data
}

export const handleCancelRequest = async(id:string):Promise<IResponse>=>{
    const response = await Axios.delete('/request/cancel/'+ id)
    return response.data
}

export const handleRequests = async():Promise<IResponse>=>{
    const response = await Axios.get('/requests')
    return response.data
}    

export const handleRequestsAccept = async(id:string):Promise<IResponse>=>{
    const response = await Axios.patch('/requests/accept/'+id)
    return response.data
}

export const handleRequestsDecline = async(id:string):Promise<IResponse>=>{
    const response = await Axios.patch('/requests/decline/'+id)
    return response.data
}