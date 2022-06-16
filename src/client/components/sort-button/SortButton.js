import './SortButton.css';

import React, { useEffect, useState } from 'react';
import { SortAlphaDown, SortAlphaDownAlt } from 'react-bootstrap-icons';


export default function SortButton({ options, onSortRequest, className }) {
    const [selection, setSelection] = useState(0);
    const [order, setOrder] = useState('ascending');

    return (<div className={'sort-button ' + (className || '')}>
        <button type={'button'}
            className='sort-button-option'
            onClick={() => {
                let newSelection = 0;
                if (selection < options.length - 1)
                    newSelection = selection + 1;
                setSelection(newSelection);
                onSortRequest(options[newSelection], order);
            }}>
            {options[selection]}
        </button>
        <button type={'button'}
            className='border-0 bg-transparent text-white'
            onClick={() => {
                const newOrder = order === 'ascending' ? 'descending' : 'ascending';
                setOrder(newOrder)
                onSortRequest(options[selection], newOrder);
            }}>
            {order === 'ascending' ? <SortAlphaDown size={24} /> : <SortAlphaDownAlt size={24} />}
        </button>

    </div>)
}


