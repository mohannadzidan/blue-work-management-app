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
import client from "../api/client";
import LoadingBlock from "../components/loading/LoadingBlock";

export default function EmailVerificationPage({ route }) {
    const nav = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [message, setMessage] = useState(undefined);
    const token = searchParams.get('token');
    useEffect(() => {
        if (!token) {
            setMessage(<div>
                <h3 className="text-danger">Invalid Or Expired Link</h3>
                <p>The link you are trying to use maybe expired or invalid.</p>
            </div>)
        } else {
            client.verifyUserEmail(token).then(res => {
                setMessage(<div>
                    <h3>Email Verified Successfully</h3>
                    <p>Your BlueApp account that is associated with <span className="fw-bold">{'<' + res.email + '>'}</span> has been verified successfully and you can start using your account after you <a href="#" onClick={() => nav('/sign-in')}>sign in</a>.</p>
                </div>)
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
            <div className="auth-form"  >
                {message !== undefined ? message : <LoadingBlock message={'Please wait while verifying some data...'}/>}
            </div>
        </div >
    );
}


