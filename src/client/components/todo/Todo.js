import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './Todo.css';
import { CardText, ArrowRight } from "react-bootstrap-icons";

const priorityClasses=[
    '',
    'border-end border-3 border-warning',
    'border-end border-3 border-danger',
]
export default function Todo({ startDate, endDate, priority, status, title, description , onClick}) {
    const startDateText = startDate.toLocaleDateString('en-us', { month: "short", day: "numeric" })
    const endDateText = endDate.toLocaleDateString('en-us', { month: "short", day: "numeric" })


    return (<div className={"clickable todo-item p-2 "+priorityClasses[priority]} onClick={onClick}>
        <div className="d-flex align-items-center">
            <span className="todo-title flex-grow-1">{title}</span>
        </div>
        <div className="small text-muted">
            <span>{startDateText}</span>
            <ArrowRight className='mx-1' size={12} />
            <span>{endDateText}</span>
            {description.length > 0 ? <CardText className='ms-1' size={18} /> : undefined}

        </div>
    </div>)
}


