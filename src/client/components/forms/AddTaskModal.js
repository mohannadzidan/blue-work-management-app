
import React, { useEffect, useState } from 'react';
import { X, Pen, CardText } from "react-bootstrap-icons";
import ReactDatePicker from 'react-datepicker';
import ReactModal from 'react-modal';
import "react-datepicker/dist/react-datepicker.css";
import './Modals.css';
import jsonForm from '../../helpers/jsonForm';
import formEntries from '../../helpers/formEntries';

export default function AddTaskModal({ isOpen, onClose, status, onAddTask }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
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
            const task = formEntries(event);
            task.startDate = new Date(startDate); // convert from dd/mm/yyyy to ISO
            task.endDate = new Date(endDate); // convert from dd/mm/yyyy to ISO
            task.status = status;
            onAddTask(task);
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
                    <input type={'text'} name='title' className='w-100 form-control m-0' minLength={4} required />
                    <div className='ms-4 my-1 small'>
                        <span>in list</span>
                        <span className='ms-1 clickable fw-bold'>{status}</span>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label className="form-label">Start Date</label>
                            <ReactDatePicker name='startDate' selected={startDate} onChange={(date) => setStartDate(date)} minDate={new Date()} required />
                        </div>
                        <div className="col">
                            <label className="form-label">End Date</label>
                            <ReactDatePicker name='endDate' selected={endDate} onChange={(date) => setEndDate(date)} minDate={startDate} required />
                        </div>
                    </div>
                    <label className="form-label">Priority</label>
                    <select className="form-select" name='priority' required>
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
                        <textarea className="form-control" rows="3" name='description'></textarea>
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-light float-end">Add</button>
        </form>

    </ReactModal >)
}


