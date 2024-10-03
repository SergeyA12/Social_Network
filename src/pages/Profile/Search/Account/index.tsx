import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IAccount } from '../../../../lib/types';
import { handleAccountbyId, handleCancelRequest, handleSendFollow, handleUnfollow } from '../../../../lib/api';
import { BASE_URL, DEFAULT_COVER, DEFAULT_PIC } from '../../../../lib/constant';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBBtn, MDBCardImage, MDBTypography, MDBCardBody } from 'mdb-react-ui-kit';
import { Gallery } from '../../../../components/Gallery';


export const Account = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<IAccount | null>(null);
    const [error,setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        handleAccountbyId(id as string)
            .then(response => {
              if(!response.status){
                  navigate("/profile")
              }
                setUser(response.payload as IAccount)
            })
    }, [id])

    const handleRequest = ()=> {
      if(user){
        if(user.connection.following){
          unFollowUser()
        }else if(user.connection.requested){
          cancelRequest()
        }else{
          followUser()
        }
      }else{
        setError(error)
      }
    }


    const unFollowUser = ()=> {
        if(user && user.id){
          handleUnfollow(user.id)
          .then(response=>{
            if(response.status == 'unfollowed'){
              setUser({
                ...user,
                connection:{...user.connection,following:false}
              })
            }
            
          })
        }
    }

    const cancelRequest =()=> {
        if(user && user.id){
          handleCancelRequest(user.id)
          .then(response=>{
            if(response.status == 'cancelled'){
              setUser({
                ...user,
                connection:{...user.connection,requested:false}
              })
            }
            
          })
        }
    }

    const followUser = ()=>{
      if(user && user.id){
          handleSendFollow(user.id)
          .then(response=>{
              if(response.status == 'following'){
                  setUser({
                      ...user,
                      connection:{...user.connection, following:true}
                  })
              } else if(response.status == 'requested'){
                  setUser({
                      ...user,
                      connection:{...user.connection, requested:true}
                  })
              }
              
          })
      }
      
  }

    return (
      
        <div className="gradient-custom-2" style={{ backgroundColor: '#9DE2FF' }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol lg="9" xl="7">
                <MDBCard>
                
                  <div 
                    className="rounded-top text-white d-flex flex-row" 
                    style={{ backgroundColor: '#000', height: '200px' }}
                  >
                    <MDBCardImage   
                      src={!user?.cover ? DEFAULT_COVER : BASE_URL + user?.cover} 
                      alt="Generic placeholder image" 
                      className="w-100" 
                      fluid 
                      style={{height:'100%' ,width: '100%', objectFit:'cover',cursor:'pointer', zIndex: '1' }} 
                    />
    
                    <div 
                      className="ms-4 mt-5 d-flex flex-column" 
                      style={{ width: '150px',position:"absolute", }} 
                    >
                      <MDBCardImage
                        src={!user?.picture ? DEFAULT_PIC : BASE_URL+user?.picture}
                        alt="Generic placeholder image" 
                        className="mt-4 mb-2 img-thumbnail" 
                        fluid 
                        style={{ width: '130px', zIndex: '1' }} 
                      />
    
                </div>
                     <div 
                      className="ms-3" 
                      style={{ marginTop: '140px', position: "absolute", left: "180px", zIndex: '2' }}
                    >
                      <MDBTypography 
                        tag="h5" 
                        style={{ fontWeight: 'bold', fontSize: '1.5rem' }}
                      >
                      {user?.name} {user?.surname}
                      </MDBTypography>
                      <MDBCardText style={{ fontSize: '1rem' }}>Birmingham</MDBCardText>
                      </div>
          </div>
                {user?.isPrivate ? (
                    <div className="p-4 text-black" style={{ backgroundColor: '#708090' }}>
                        <div className="d-flex justify-content-end text-center py-1">
                            <MDBCardImage  
                                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/private-profile-2426657-2047064.png"
                                style={{ cursor: 'pointer', height: 60, width: 60 }} 
                            />
                                    <button onClick={handleRequest} className='btn btn-info'>
                                        {
                                            user.connection.following ?
                                            "UNFOLLOW" : 
                                            user.connection.followsMe ?
                                            "FOLLOW BACK" :
                                            user.connection.requested ?
                                            "CANCEL REQUEST" :
                                            "FOLLOW"
                                        }
                                    </button>
                     </div>
                    </div>
                ): <div className="p-4 text-black" >
                <div className="d-flex justify-content-end text-center py-1">
                            <button onClick={handleRequest} className='btn btn-info'>
                                {
                                    user?.connection.following ?
                                    "UNFOLLOW" : 
                                    user?.connection.followsMe ?
                                    "FOLLOW BACK" :
                                    user?.connection.requested ?
                                    "CANCEL REQUEST" :
                                    "FOLLOW"
                                }
                            </button>
             </div>
            </div>}

                {!user?.isPrivate && (
                    <div className="p-4 text-black" style={{ backgroundColor: '#F8F9FA' }}>
                        <div className="d-flex justify-content-end text-center py-1">
                        <div>
                        <MDBCardText className="mb-1 h5">7</MDBCardText>
                        <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                    </div>
                <div className="px-3">
                    <MDBCardText className="mb-1 h5">{user?.followers.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                </div>
                <div>
                    <MDBCardText className="mb-1 h5">{user?.following.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                </div>
                </div>
                </div>)
                }
                

                {!user?.isPrivate && (
                    <MDBCardBody className="text-black p-4">
                        <div className="mb-5">
                            <p className="lead fw-normal mb-1">About</p>
                            <div className="p-4" style={{ backgroundColor: '#F8F9FA' }}>
                                <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>
                                <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
                                <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
                            </div>
                        </div>
                    </MDBCardBody>)}

                {!user?.isPrivate && <Gallery posts ={user?.posts || []}/>}
                    

                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      );
};
    
    
