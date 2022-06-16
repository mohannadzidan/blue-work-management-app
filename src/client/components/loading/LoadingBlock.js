import React, { useEffect, useState } from 'react';

export default function LoadingBlock({ message }) {
    return (<div className="col d-none d-md-block container-center-div" >
        <div className="w-100 text-center">
            <div className="spinner-border text-primary" style={{
                width: '6rem', height: '6rem',
            }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div>{message}</div>
        </div>
    </div>)
}