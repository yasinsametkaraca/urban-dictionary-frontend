import React from 'react';
import ProgressButton from "./ProgressButton";

function Modal({visible,setVisible,onConfirm,modalBody,modalTitle,pendingApiCall}) {

    let className = "modal fade"
    if(visible)
        className += "show d-block"
    return (
        <div className={className} style={{backgroundColor: "#000000c0"}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{modalTitle}</h5>
                    </div>
                    <div className="modal-body">
                        {modalBody}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" disabled={pendingApiCall} onClick={() => setVisible(false)}>Close</button>
                        <ProgressButton disabled={pendingApiCall}
                                        text={"Delete"}
                                        pendingApiCall={pendingApiCall}
                                        className="btn btn-danger"
                                        onClick={() => onConfirm()}
                        ></ProgressButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;