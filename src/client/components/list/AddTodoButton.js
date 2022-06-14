import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Plus } from "react-bootstrap-icons";


export default function AddTodoButton({ }) {

    return (<div className="w-100 clickable text-muted d-flex align-items-center">
        <Plus size={24} />
        <span>add task</span>
    </div>)
}


