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
export default function SignUpPage({ }) {
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
                    action="/api/auth/signUpEmailAndPassword"
                    onSubmit={jsonForm((response) => {
                        if (response.status) {
                            nav('/');
                        } else {
                            toast.error(response.message, {
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
                            <h3>Sign Up</h3>
                            <div className="mb-3">
                                <label>First name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-control"
                                    placeholder="First name"
                                    minLength={2}
                                    maxLength={24}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label>Last name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="form-control"
                                    placeholder="Last name"
                                    minLength={2}
                                    maxLength={24}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    minLength={6}
                                    maxLength={24}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    minLength={8}
                                    maxLength={24}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Sign Up
                                </button>
                            </div>
                            <p className="forgot-password text-center">
                                Already have an account? <a href="#" onClick={() => nav('/sign-in')}>sign in</a>
                            </p>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}


