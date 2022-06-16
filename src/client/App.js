import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import React from 'react';
import './App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import BoardPage from "./pages/BoardPage";




export default function App({ }) {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<BoardPage />} />
          <Route path="/sign-up" element={<SignUpPage style={{ flexGrow: 100 }} />} />
          <Route path="/sign-in" element={<SignInPage style={{ flexGrow: 100 }} />} />
        </Routes>
    </BrowserRouter >
  );
}


