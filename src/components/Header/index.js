import React from 'react';
import './style.css';

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className='header--logo'>
                <a href="/">
                    <img src='https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg'></img>
                </a>
            </div>
            <div className='header--user'>
                <a href="/">
                    <img src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'></img>
                </a>
            </div>
        </header>
    );
}