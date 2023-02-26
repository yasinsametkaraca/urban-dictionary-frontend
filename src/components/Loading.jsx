import React from 'react';

const Loading = () => {
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-grow spinner-grow-sm text-primary m-2" role="status">
                <span className="sr-only"></span>
            </div>
            <div className="spinner-grow spinner-grow-sm text-secondary m-2" role="status">
                <span className="sr-only"></span>
            </div>
            <div className="spinner-grow spinner-grow-sm text-success m-2" role="status">
                <span className="sr-only"></span>
            </div>
            <div className="spinner-grow spinner-grow-sm text-danger m-2" role="status">
                <span className="sr-only"></span>
            </div>
            <div className="spinner-grow spinner-grow-sm text-info m-2" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    );
};

export default Loading;
