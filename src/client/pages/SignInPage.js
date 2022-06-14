import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import jsonForm from "../helpers/jsonForm";


export default function SignInPage({ }) {

    return (
        <form method="post" action="/api/auth" onSubmit={jsonForm((response) => {
            console.log(response)
        })}>
            <h3>Sign In</h3>
            <div className="mb-3">
                <label>Email address</label>
                <input
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                />
            </div>

            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
    );
}


