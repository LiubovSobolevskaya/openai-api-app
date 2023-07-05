import React, { useState } from 'react';

import NavTabs from './NavTabs';
import MessageFeed from './Chat';
import Editor from './Editor';
import Preview from './Preview';

export default function MainPageContainer() {
    const [currentPage, setCurrentPage] = useState('Preview');

    const renderPage = () => {
        // Check the value of currentPage and render the corresponding component
        if (currentPage === 'HTML') {
            return <Editor type={'html'} />;
        }
        if (currentPage === 'CSS') {
            return <Editor type={'css'} />;
        }
        if (currentPage === 'JavaScript') {
            return <Editor type={'javascript'} />;
        }
        // If none of the above conditions match, render the About component
        if (currentPage === 'Preview') {
            return <Preview />;
        }
    };
    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div>
            <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>


                <div style={{ flex: 1, minWidth: '80%', height: '100vh', overflow: "hidden" }}>{renderPage()}</div>

                <div style={{ flex: 1, minWidth: '20%', maxWidth: '20%', height: '95vh', overflow: "auto" }}>
                    <MessageFeed />
                </div>
            </div>
        </div >
    );
}