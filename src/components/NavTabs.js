import React from 'react';

function NavTabs({ currentPage, handlePageChange }) {
    return (
        <ul className="nav nav-tabs">

            <li className="nav-item">
                <a
                    href="#html"
                    onClick={() => handlePageChange('HTML')}
                    className={currentPage === 'HTML' ? 'nav-link active' : 'nav-link'}
                >
                    HTML
                </a>
            </li>
            <li className="nav-item">
                <a
                    href="#css"
                    onClick={() => handlePageChange('CSS')}
                    className={currentPage === 'CSS' ? 'nav-link active' : 'nav-link'}
                >
                    CSS
                </a>
            </li>
            <li className="nav-item">
                <a
                    href="#javascript"
                    onClick={() => handlePageChange('JavaScript')}
                    className={currentPage === 'JavaScript' ? 'nav-link active' : 'nav-link'}
                >
                    JavaScript
                </a>
            </li>
            <li className="nav-item">
                <a
                    href="#preview"
                    onClick={() => handlePageChange('Preview')}
                    className={currentPage === 'Preview' ? 'nav-link active' : 'nav-link'}
                >
                    Preview
                </a>
            </li>

        </ul >

    );
}

export default NavTabs;