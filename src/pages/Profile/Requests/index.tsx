import { useEffect, useState } from "react";
import { handleRequests, handleRequestsAccept, handleRequestsDecline } from "../../../lib/api"
import { IRequestUser, IUser } from "../../../lib/types";
import { BASE_URL, DEFAULT_PIC } from "../../../lib/constant";
import { NavLink } from "react-router-dom";





export const Request = ()=>{
    const [requests,setRequests] = useState<IRequestUser[]>([])
    useEffect(()=>{
        handleRequests()
        .then(response=>{
            
            setRequests(response.payload as IRequestUser[])
            
        })
    },[])

const handleAccept = (id:string)=>{
    handleRequestsAccept(id)
    .then(response=>{
        if(response.status == 'ok'){
            setRequests(requests.filter(req=> req.id != id))
        }
        
        
    })
}

const handleDecline = (id:string)=>{
    handleRequestsDecline(id)
    .then(response=>{
        if(response.status == "ok"){
            setRequests(requests.filter(req=> req.id != id))
        }
    })
}

    return <div>
                    {requests.length > 0 && <small> You have {requests.length} Requests!</small>}
            <div className="list">
                {requests.map(req => (
                    
                    <div key={req.id} className="list" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <img 
                            src={req.user.picture ? BASE_URL + req.user.picture : DEFAULT_PIC} 
                            alt={`${req.user.name} ${req.user.surname}`} 
                            style={{ width: 50, height: 50, borderRadius: '50%', marginRight: '10px' }} 
                        />
                        <div>
                            <p style={{ margin: 0 }}>{req.user.name} {req.user.surname}</p>
                            <NavLink to={`/profile/${req.user.id}`} className="btn btn-link">View Profile</NavLink>
                        </div>
                        <button 
                            onClick={()=> handleAccept(req.id)}
                            type="button" 
                            className="btn btn-primary"
                        >   accept
                        </button>
                        <button 
                        onClick={()=>{handleDecline(req.id)}}
                            type="button" 
                            className="btn btn-danger"
                        >   decline
                        </button>
                    </div>
                ))}
            </div>
    </div>
}