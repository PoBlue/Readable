import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound404({ message }) {
    return (
        <div id="not-found-page">
            <p>{ message }</p>
            <Link to="/">Back To Home</Link>
        </div>
    )
}