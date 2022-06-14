import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './Todo.css';
import { ThreeDotsVertical } from "react-bootstrap-icons";


export default function Todo({ startDate, endDate, priority, status, title, description }) {
    const [isFinished, setFinished] = useState(status);
    return (<div className="clickable todo-item p-2">
        <div className="d-flex align-items-center">
            <span className="todo-title flex-grow-1">{title}</span>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            </div>
        </div>
    </div>)
}


