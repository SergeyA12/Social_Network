import React, { useState } from 'react';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { InputUser } from '../../lib/types';
import { handleSignup } from '../../lib/api';
import { useForm } from 'react-hook-form';


export function Signup() {
    const [error,setError] = useState('')
    const {register, handleSubmit,reset, formState:{errors}} = useForm<InputUser>()
    const onSubmit = (data:InputUser) => {
        handleSignup(data)
        .then(response=> {
            if(response.status =="error" && response.message){
                setError(response.message)
            }else{
                reset()
            }
        })
    }
    return (
        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center'>

                <MDBCol lg='8'>

                    <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
                        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp' className='w-100 rounded-top' alt="Sample photo" />

                        <MDBCardBody className='px-5'>

                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>
                            <p>Already have an account? <Link to={'/login'}>Login Now</Link></p>

                            <form onSubmit={handleSubmit(onSubmit)}>
                            {error && <p className="text-danger">{error}</p>}
                                {errors&& <p className='text-danger'>{errors.name?.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Name'
                                    type='text'
                                    {...register('name',{required:"name is required"})}
                                />
                                {errors&& <p className='text-danger'>{errors.surname?.message}</p>}
                                <MDBInput
                                
                                    wrapperClass='mb-4'
                                    label='Surname'
                                    type='text'
                                    {...register('surname',{required:"surname is required"})}
                                />
                                {errors&& <p className='text-danger'>{errors.login?.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Login'
                                    type='text'
                                    {...register('login', {
                                        required: "Login is required",
                                        minLength: {
                                            value: 4,
                                            message: "Login must be at least 4 characters long"
                                        }
                                    })}
                                 />
                                {errors && <p className='text-danger'>{errors.password?.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Password'
                                    type='password'
                                    {...register('password',{required:"password is required", minLength:{
                                        value:6, message:"Password must be at least 6 characters"
                                    }})}
                                />
                                <button type='submit' className='btn btn-outline-info' >Submit</button>
                            </form>



                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
}
