import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import ReactImage from './react.png';
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function Home() {
  const [user, setUser] = useState(null);
  const [redirect, setRedirect] = useState(undefined);
  const nav = useNavigate();
  useEffect(() => {
    fetch('/api/me')
      .then(res => res.json())
      .then(json => {
        if (json.status) {
          setUser(user)
        } else {
          nav('/sign-in');
        }
      }).catch(console.error)
  }, []);
  return <div>
    {user ? <h1>{`Hello`}</h1> : <h1>Loading.. please wait!</h1>}
    <img src={ReactImage} alt="react" />
  </div>
}


export default function App({ }) {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


