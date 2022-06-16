import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import jsonForm from "../helpers/jsonForm";
import './Auth.css'
import client from '../api/client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignInPage({ }) {
    const nav = useNavigate();
    useEffect(() => {
        client.me().then(() => nav('/')).catch(() => { })
    }, []);
    return (
        <div className="screen-center-div">
            <div className="auth-form row"  >
                <div className="col d-none d-md-block container-center-div" >
                    <div className="w-100 text-center">
                        <img src="https://play-lh.googleusercontent.com/pjUulZ-Vdo7qPKxk3IRhnk8SORPlgSydSyYEjm7fGcoXO8wDyYisWXwQqEjMryZ_sqK2" className="w-75 " />
                    </div>
                </div>

                <form
                    className="col"
                    method="post"
                    action="/api/auth/signInEmailAndPassword"
                    onSubmit={jsonForm((response, err) => {
                        if (!err && response.status) {
                            nav('/');
                        } else {
                            toast.error(response?.message || 'Unknown Error Occurred', {
                                position: "top-left",
                                autoClose: 3000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                draggable: true,
                                progress: undefined,
                                className: 'bg-danger text-white',
                                icon: false

                            });
                        }
                    })}>
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
                            <h3>Sign In</h3>
                            <div className="mb-3">
                                <label>Email address</label>
                                <input
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    minLength={12}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label>Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    minLength={8}
                                    required
                                />
                                <p className="forgot-password text-right">
                                    Forgot <a href="#">password?</a>
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Sign In
                                </button>
                            </div>

                            <p className="forgot-password text-center">
                                don't have an account? <a href="#" onClick={() => nav('/sign-up')}>register now</a>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    );
}


