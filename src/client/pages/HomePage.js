import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import List from "../components/list/List";
import { BoxArrowLeft } from 'react-bootstrap-icons';
import AddTaskModal from "../components/modals/AddTaskModal";

export default function HomePage({ style }) {
    const [user, setUser] = useState(null);
    const nav = useNavigate();
    useEffect(() => {
        // fetch('/api/me')
        //     .then(res => res.json())
        //     .then(json => {
        //         if (json.status) {
        //             setUser(user)
        //         } else {
        //             nav('/sign-in');
        //         }
        //     }).catch(console.error)
    }, []);

    return (<div className="vh-100 " style={{ ...style }}>
        <nav className="navbar navbar-expand navbar-light">
            <div className="container-fluid">
                <span className="navbar-brand">
                    Hello, {user?.firstName || 'Hussain'}
                </span>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="clickable nav-link text-white d-flex flex-row align-items-center" to={'/sign-in'}>
                            <BoxArrowLeft className='me-2' size={18} />
                            <span className="d-none d-md-block">Sign Out</span>
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>
        <div className="px-3 d-flex flex-row align-items-start">
            <List todos={[{ title: "My Task" }, { title: "My Task" }]} title="To-Do" />
            <List todos={[]} title="In Progress" onRequestAdd/>
            <List todos={[]} title="Under review" />
            <List todos={[]} title="Rework" />
            <List todos={[]} title="Completed" />
        </div>
    </div>)
}


