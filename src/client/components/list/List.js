import React, { useEffect, useState } from 'react';
import './List.css';
import AddTodoButton from "./AddTodoButton";
import Todo from "../todo/Todo";
import AddTaskModal from '../forms/AddTaskModal';


export default function List({ status, children, onAddClick }) {

    return (<div className="p-2 me-3 blue-list flex-shrink-0 d-flex flex-column" >
        <div className="list-title">{status}</div>
        <div className="my-1">
            {children}
        </div>
        <AddTodoButton onClick={onAddClick}/>
    </div>)
}


