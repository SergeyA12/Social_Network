import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
} from 'mdb-react-ui-kit';
import { handleChangeLogin, handleChangePassword, handlePrivate } from '../../../lib/api';
import { IContextType, IUser } from '../../../lib/types';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
export function Settings() {
    const {account, setAccount} = useOutletContext<IContextType>()

    const [error, setError] = useState('');
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const [showisPrivateForm, setShowisPrivateForm] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IUser>();
    const navigate = useNavigate();

    
    const onSubmitPassword = (data: { old: string, newpwd: string }) => {
        handleChangePassword(data)
            .then(response => {
                if (response.status === "error" && response.message) {
                    setError(response.message);
                } else {
                    reset();
                    navigate('/profile');
                }
            });
    };
    const onSubmitLogin = (data: { password: string,login:string }) => {
        handleChangeLogin(data)
        .then(response =>{
            if(response.status === 'error' && response.message){
                setError(response.message)
            }else{
                reset()
                navigate('/profile')
            }
        })
    };

    const onSubmitPrivacy = () => {
        setIsPrivate(prev => !prev);
        handlePrivate()
            .then(response => {
                if (response.status === "error" && response.message) {
                    setError(response.message);
                }
                setAccount({...account, isPrivate:response.payload as boolean})
                
            });
    };

    
    return (
        <MDBContainer fluid>
            <MDBRow className="d-flex justify-content-center align-items-center">
                <MDBCol lg="8">
                    <MDBCard className="my-5 rounded-3" style={{ maxWidth: '600px' }}>
                        <MDBCardImage
                            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhb1F6uwJPGJs0m4wYhkRGh3ul8BsZW2aFLm-ZdRmSzqNZeh074Wz_RU81j3kT5fSM-pKgr8EzShD12cNeYio3u8F-vxHp243C0TjQ_BFTrhRxrxD6yTfSZh1OHNa7x9dre1f3JoSQHE-A/s0/password.jpg"
                            className="w-100 rounded-top"
                            alt="Sample photo"
                        />
                        <MDBCardBody className="px-5">
                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Settings</h3>

                            <div className="d-flex flex-column mb-4">
                                <button
                                    className="btn btn-primary mb-2"
                                    onClick={() => setShowPasswordForm(prev => !prev)}
                                >
                                    Change Password
                                </button>
                                <button
                                    className="btn btn-primary mb-2"
                                    onClick={() => setShowLoginForm(prev => !prev)}
                                >
                                    Change Login
                                </button>

                                <button
                                    className='btn btn-primary mb-2'
                                    onClick={() => setShowisPrivateForm(prev => !prev)}
                                >
                                    Private Accaunt
                                </button>
                            </div>

                            {showPasswordForm && (
                                <form onSubmit={handleSubmit(onSubmitPassword)}>
                                    {error && <p className="text-danger">{error}</p>}
                                    {errors && <p className='text-danger'>{errors.old?.message}</p>}
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Old Password"
                                        type="password"
                                        {...register('old', { required: "Old password is required" })}
                                    />
                                    {errors && <p className='text-danger'>{errors.newpwd?.message}</p>}
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="New Password"
                                        type="password"
                                        {...register('newpwd', {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters"
                                            }
                                        })}
                                    />
                                    <button type="submit" className="btn btn-outline-info">Submit</button>
                                </form>
                            )}

                            {showLoginForm && (
                                <form onSubmit={handleSubmit(onSubmitLogin)}>
                                    {error && <p className="text-danger">{error}</p>}
                                    {errors && <p className='text-danger'>{errors.password?.message}</p>}
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="password"
                                        type="password"
                                        {...register('password', { required: "password is required" })}
                                    />
                                    {errors && <p className='text-danger'>{errors.login?.message}</p>}
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="New Login"
                                        type="text"
                                        {...register('login', { required: "New login is required" })}
                                    />
                                    <button type="submit" className="btn btn-outline-info">Submit</button>
                                </form>
                            )}

                            {showisPrivateForm && (<div className="d-flex align-items-center mb-4">
                                <p>When your account is private, only people you approve can see your photos and more about you. Your existing followers won’t be affected.</p>
                                <img
                                    src={account.isPrivate ? 'https://www.shutterstock.com/image-vector/user-login-authenticate-icon-vector-600nw-263541554.jpg ' : "https://static.thenounproject.com/png/1524742-200.png" }
                                    alt={account.isPrivate ? 'Private Account' : 'Public Account'}
                                    className="me-2"
                                    style={{ cursor: 'pointer' ,height:40, width:40}}
                                    onClick={onSubmitPrivacy}
                                />
                                <span>{isPrivate ? 'Private Account' : 'Public Account'}</span>
                            </div>
                                
                            )}
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}