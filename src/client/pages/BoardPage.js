import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import List from "../components/list/List";
import { BoxArrowLeft } from 'react-bootstrap-icons';
import AddTaskModal from "../components/forms/AddTaskModal";
import client from "../api/client";
import LoadingScreen from "../components/loading-screen/LoadingScreen";
import Todo from "../components/todo/Todo";
import TaskInfoModal from "../components/forms/TaskInfoModal";
import './BoardPage.css'
const initialLists = [
    "To-Do",
    "In Progress",
    "Under review",
    "Rework",
    "Completed",
]

function taskComparator(a, b) {
    const deltaPriority = b.priority - a.priority;
    if (deltaPriority !== 0) return deltaPriority;
    return a.startDate === b.startDate ? 0 : a.startDate > b.startDate ? 1 : -1;
}

export default function BoardPage({ style }) {
    const [user, setUser] = useState(null);
    const nav = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addTaskModalVisibility, setAddTaskModalVisibility] = useState(false);
    const [taskInfoModalVisibility, setTaskInfoModalVisibility] = useState(false);
    const [addTaskModalStatus, setAddTaskModalStatus] = useState(false);
    const [selectedTask, setSelectedTask] = useState({});
    useEffect(() => {
        client.me().then((user) => {
            setUser(user);
            setLoading(false);
            return client.getAllTasks();
        }).then(tasks => setTasks(tasks.sort(taskComparator))).catch(() => {
            nav('/sign-in');
        });
    }, []);


    const removeTask = function (task) {
        client.removeTask(task._id).then(() => {
            setTasks(tasks.filter(t => t._id !== task._id).sort(taskComparator));
            setTaskInfoModalVisibility(false);
        }).catch(console.error);
    }

    const addTask = function (task) {
        client.createTask(task).then(task => {
            setTasks([...tasks, task].sort(taskComparator));
            setAddTaskModalVisibility(false);

        }).catch(err => {
            console.error(err);
        });
    }
    const updateTask = function (task) {
        client.updateTask(task._id, task).then(updatedTask => {
            setTasks([...tasks.filter(t => t._id !== updatedTask._id), updatedTask].sort(taskComparator));
            setTaskInfoModalVisibility(false);
        }).catch(err => {
            console.error(err);
        });
    }

    return (<div style={{ ...style }}>
        {loading ? <LoadingScreen /> : undefined}
        <nav className="navbar navbar-light">
            <div className="container-fluid">
                <div>
                    <img src="https://play-lh.googleusercontent.com/pjUulZ-Vdo7qPKxk3IRhnk8SORPlgSydSyYEjm7fGcoXO8wDyYisWXwQqEjMryZ_sqK2" width={32} />
                    <span className="ms-1 hello-message">
                        Hello, {user?.firstName}
                    </span>
                </div>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <div className="clickable nav-link text-white d-flex flex-row align-items-center" onClick={() => client.signOut().then(() => nav('/sign-in'))}>
                            <BoxArrowLeft className='me-2' size={18} />
                            <span className="d-none d-md-block">Sign Out</span>
                        </div>
                    </li>
                </ul>
            </div>
        </nav >

        <div className="mt-4 px-3 board" >
            {initialLists.map((status, i) => (
                <List
                    key={i}
                    status={status}
                    onAddClick={() => {
                        setAddTaskModalStatus(status);
                        setAddTaskModalVisibility(true);
                    }}
                >
                    {tasks
                        .filter((v) => v.status === status)
                        .map((task) => <Todo
                            key={task._id}
                            onClick={() => {
                                setSelectedTask(task);
                                setTaskInfoModalVisibility(true);
                            }}
                            {...task}
                        />)
                    }
                </List>
            ))}
        </div>
        <AddTaskModal
            status={addTaskModalStatus}
            onClose={() => setAddTaskModalVisibility(false)}
            onAddTask={addTask}
            isOpen={addTaskModalVisibility}
        />
        <TaskInfoModal
            onClose={() => setTaskInfoModalVisibility(false)}
            isOpen={taskInfoModalVisibility}
            onRemoveTask={removeTask}
            onUpdateTask={updateTask}
            task={selectedTask}
        />
    </div >)
}


