import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate,
    useSearchParams
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './Auth.css'
import client from '../api/client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import formEntries from "../helpers/formEntries";
import LoadingBlock from "../components/loading/LoadingBlock";

export default function PasswordResetPage({ }) {
    const nav = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [message, setMessage] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(false);
    const token = searchParams.get('token');
    useEffect(() => {
        if (!token) {
            setMessage(<div>
                <h3 className="text-danger">Invalid Or Expired Link</h3>
                <p>The link you are trying to use maybe expired or invalid.</p>
            </div>)
        } else {
            setLoading(true);
            client.validatePasswordResetToken(token).then(res => {
                setEmail(res.email);
                setLoading(false);
            }).catch(error => {
                setMessage(<div>
                    <h3 className="text-danger">Invalid Or Expired Link</h3>
                    <p>The link you are trying to use maybe expired or invalid.</p>
                </div>)
            });
        }
    }, []);
    return (
        <div className="screen-center-div">
            <div className="auth-form "  >

                {message !== undefined ? message : loading ? <LoadingBlock message={'Please Wait...'} /> : (
                    <form
                        method="post"
                        action="/api/auth/requestPasswordReset"
                        onSubmit={(ev) => {
                            setLoading(true);
                            const { password } = formEntries(ev);
                            client.resetPassword(token, password).then((response) => {
                                setLoading(false);
                                setMessage(<div>
                                    <h3>Password Changed Successfully</h3>
                                    <p>Your password has been changed, and you can <a href="#" onClick={() => nav('/sign-in')}>sign in</a> now using your new password </p>
                                </div>)

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
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        placeholder="Enter email"
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter Password"
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


