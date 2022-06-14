
import React, { useEffect, useState } from 'react';
import { X, Pen, CardText } from "react-bootstrap-icons";
import ReactDatePicker from 'react-datepicker';
import ReactModal from 'react-modal';
import "react-datepicker/dist/react-datepicker.css";
import './Modals.css';

const customStyles = {
    content: {
        position: 'absolute',
        top: '50%',
        left: ' 50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '35%',
        minWidth: '300px',
        height: '60%',
        borderRadius: '5px',
        border: '0'
    },
};
export default function AddTaskModal({ isOpen, onClose, listId, listTitle }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    return (<ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
    >


        <form>
            <div className="row">
                <div className="col-1">
                    <Pen size={18} />
                </div>
                <div className="col">

                    <div className='d-flex flex-row align-items-center justify-content-between'>
                        <label className="form-label">Title</label>
                        <X className='clickable' size={32} onClick={onClose} />
                    </div>
                    <input type={'text'} className='w-100 form-control m-0' />
                    <div className='ms-4 my-1 small'>
                        <span>in list</span>
                        <span className='ms-1 clickable fw-bold'>{listTitle}</span>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label className="form-label">Start Date</label>
                            <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                        <div className="col">
                            <label className="form-label">End Date</label>
                            <ReactDatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                        </div>
                    </div>
                    <label className="form-label">Priority</label>
                    <select className="form-select">
                        <option selected value="0">Low</option>
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
                        <textarea className="form-control" rows="3"></textarea>
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-light float-end">Add</button>
        </form>

    </ReactModal>)
}


