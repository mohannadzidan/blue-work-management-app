import React, { useEffect, useState } from 'react';
import './List.css';
import AddTodoButton from "./AddTodoButton";
import Todo from "../todo/Todo";
import AddTaskModal from '../modals/AddTaskModal';


export default function List({ title, todos }) {
    const [isAddTaskModalOpen, setAddTaskModalOpen] = React.useState(false);

    return (<div className="p-2 me-3 blue-list flex-shrink-0 d-flex flex-column" >
        <div className="list-title">{title}</div>
        <div className="my-1">
            {todos.map((todo, i) => <Todo key={i} {...todo}></Todo>)}
        </div>
        <AddTodoButton onClick={() => setAddTaskModalOpen(true)}/>
        <AddTaskModal listId={title} listTitle={title} onClose={() => setAddTaskModalOpen(false)} isOpen={isAddTaskModalOpen} />
    </div>)
}


