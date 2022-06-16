
import React, { useEffect, useState } from 'react';
import { X, Pen, CardText, Trash } from "react-bootstrap-icons";
import ReactDatePicker, { setDefaultLocale } from 'react-datepicker';
import ReactModal from 'react-modal';
import "react-datepicker/dist/react-datepicker.css";
import './Modals.css';
import jsonForm from '../../helpers/jsonForm';
import formEntries from '../../helpers/formEntries';
import client from '../../api/client';

export default function TaskInfoModal({ isOpen, onClose, task, onUpdateTask, onRemoveTask }) {
    const [startDate, setStartDate] = useState(task.startDate || new Date());
    const [endDate, setEndDate] = useState(task.endDate || new Date());
    const [title, setTitle] = useState(task.title || '');
    const [description, setDescription] = useState(task.description || '');
    const [status, setStatus] = useState(task.status || '');
    const [priority, setPriority] = useState(task.priority || 0);

    useEffect(() => {
        setStartDate(task.startDate);
        setStartDate(task.startDate);
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setPriority(task.priority);
    }, [task])
    return (<ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        className='beautiful-modal'
        overlayClassName='beautiful-modal-overlay'
        ariaHideApp={false}
        center
    >
        <form method='post' action='/api/tasks' onSubmit={(event) => {
            event.preventDefault();
            const modifiedTask = formEntries(event);
            modifiedTask.startDate = new Date(startDate); // convert from dd/mm/yyyy to ISO
            modifiedTask.endDate = new Date(endDate); // convert from dd/mm/yyyy to ISO
            modifiedTask.status = status;
            modifiedTask._id = task._id
            onUpdateTask(modifiedTask);
        }}>
            <div className="row">
                <div className="col-1">
                    <Pen size={18} />
                </div>
                <div className="col">
                    <div className='d-flex flex-row align-items-center justify-content-between'>
                        <label className="form-label">Title</label>
                        <X className='clickable' size={32} onClick={onClose} />
                    </div>
                    <input type={'text'} name='title' className='w-100 form-control m-0' value={title || ''} onChange={(e) => setTitle(e.target.value)} minLength={4} required />
                    <div className='ms-4 my-1 small'>
                        <span className='me-1'>in list</span>
                        <select className="small-select border rounded" name='status' value={status || 'To-Do'} onChange={(e) => setStatus(e.target.value)} required>
                            <option value="To-Do">To-Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Under review">Under review</option>
                            <option value="Rework">Rework</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label className="form-label">Start Date</label>
                            <ReactDatePicker className='form-control' name='startDate' selected={startDate} onChange={(date) => setStartDate(date)} minDate={new Date()} required />
                        </div>
                        <div className="col">
                            <label className="form-label">End Date</label>
                            <ReactDatePicker className='form-control' name='endDate' selected={endDate} onChange={(date) => setEndDate(date)} minDate={startDate} required />
                        </div>
                    </div>
                    <label className="form-label">Priority</label>
                    <select className="form-select" name='priority' value={priority || '0'} onChange={(e) => setPriority(e.target.value)} required>
                        <option value="0">Low</option>
                        <option value="1">Medium</option>
                        <option value="2">High</option>
                    </select>
                </div>

            </div>
            <div className="row">
                <div className="col-1">
                    <CardText size={18} />
                </div>
                <div className="col">
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea className="form-control" rows="3" name='description' value={description || ''} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                </div>
            </div>
            <div>
                <button type='button'
                    className="btn btn-danger bg-transparent float-start text-danger"
                    onClick={() => onRemoveTask(task)}
                ><Trash size={18} /></button>
                <button type="submit"
                    className="btn btn-primary bg-transparent float-end text-primary"
                >Save</button>
            </div>
        </form>

    </ReactModal >)
}


