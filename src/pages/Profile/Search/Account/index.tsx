import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IAccount } from '../../../../lib/types';
import { handleAccountbyId } from '../../../../lib/api';
import { BASE_URL, DEFAULT_COVER, DEFAULT_PIC } from '../../../../lib/constant';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBBtn, MDBCardImage, MDBTypography, MDBCardBody } from 'mdb-react-ui-kit';
import { Gallery } from '../../../../components/Gallery';


export const Account = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<IAccount | null>(null);

    useEffect(() => {
        handleAccountbyId(id as string)
            .then(response => {
                setUser(response.payload as IAccount)
            })
    }, [id])

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
                            <MDBBtn 
                                color="primary" 
                                style={{ marginLeft: '10px', height: '35px' }} >
                                Following
                            </MDBBtn>
                     </div>
                    </div>
                ):null}

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
    
    
