import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './List.css';
import AddTodoButton from "./AddTodoButton";
import Todo from "../todo/Todo";
const longDescription = `Legacy versions of mkdirp are no longer supported. Please update to mkdirp 1.x. (Note that the API surface has changed to use Promises in 1.x.)
warning heroku-repo > @heroku-cli/plugin-run > @heroku-cli/command > cli-ux@4.9.3: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.
Installing plugin heroku-repo... installed v1.0.14`

export default function List({ title, todos }) {

    return (<div className="p-2 me-3 blue-list" >
        <div className="list-title">{title}</div>
        <div className="my-1">
            {todos.map((todo, i) => <Todo key={i} {...todo}></Todo>)}
        </div>
        <AddTodoButton />
    </div>)
}


