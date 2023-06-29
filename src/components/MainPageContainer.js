import React, { useState } from 'react';
import NavTabs from './NavTabs';
import MessageFeed from './Chat';
import Editor from './Editor';
import Preview from './Preview';

export default function MainPageContainer() {
    const [currentPage, setCurrentPage] = useState('HTML');

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
        <div >
            <div>
                <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
                <div>{renderPage()}</div>
            </div>
            <div style={{ float: "right", position: "absolute", top: 0, right: 0, height: "100%", width: "20%" }}>
                <MessageFeed />
            </div>

        </div>
    );
}