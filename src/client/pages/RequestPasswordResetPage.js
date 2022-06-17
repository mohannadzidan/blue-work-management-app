import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './Auth.css'
import client from '../api/client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import formEntries from "../helpers/formEntries";
import LoadingBlock from "../components/loading/LoadingBlock";

export default function RequestPasswordResetPage({ }) {
    const nav = useNavigate();
    const [requestedEmail, setRequestedEmail] = useState(undefined);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        client.me().then(() => nav('/')).catch(() => { })
    }, []);
    return (
        <div className="screen-center-div">
            <div className="auth-form row"  >
                <div className="col d-none d-md-block container-center-div" >
                    <div className="w-100 text-center">
                        <img src="https://play-lh.googleusercontent.com/pjUulZ-Vdo7qPKxk3IRhnk8SORPlgSydSyYEjm7fGcoXO8wDyYisWXwQqEjMryZ_sqK2" className="user-select-none w-75 " draggable='false' />
                    </div>
                </div>
                {requestedEmail ? (
                    <div className="col">
                        <h3>Password Reset Requested</h3>
                        <p>Your request of password reset success, the next step is to follow the steps sent to your email <span className="fw-bold"> {'<' + requestedEmail + '>'}</span> then sign in.<br />
                            if you didn't receive the email, please check your spam folder</p>
                    </div>
                ) : loading ? <LoadingBlock message={'Please Wait...'} /> : (
                    <form
                        className="col"
                        method="post"
                        action="/api/auth/requestPasswordReset"
                        onSubmit={(ev) => {
                            setLoading(true);
                            const { email } = formEntries(ev);
                            client.requestPasswordReset(email).then((response) => {
                                setLoading(false);
                                setRequestedEmail(response.email);

                            }).catch(error => {
                                setLoading(false);
                                let errorMessage = 'Unknown Error has Occurred, please try again later!';
                                if (error.message === 'USER_NOT_FOUND') {
                                    errorMessage = 'The entered email don\'t belong to any of our registered users.'
                                }
                                toast.error(errorMessage, {
                                    position: "top-left",
                                    autoClose: 3000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    draggable: true,
                                    progress: undefined,
                                    className: 'bg-danger text-white',
                                    icon: false

                                });
                            });
                        }}>
                        <ToastContainer
                            position="top-left"
                            autoClose={1000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                        <div className="d-flex h-100 flex-column justify-content-between">
                            <div>
                                <h3>Password Reset</h3>
                                <div className="mb-3">
                                    <label>Email address</label>
                                    <input
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                        required
                                    />
                                </div>

                            </div>
                            <div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Reset Password
                                    </button>
                                </div>

                                <p className="forgot-password text-center">
                                    don't have an account? <a href="#" onClick={() => nav('/sign-up')}>register now</a>
                                </p>
                            </div>
                        </div>
                    </form>
                )}

            </div>
        </div >
    );
}


