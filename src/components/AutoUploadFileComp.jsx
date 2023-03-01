import React from 'react';
import './AutoUploadFile.css';
import Loading from "./Loading";
function AutoUploadFileComp({file,uploading}) {

    return (
        <div style={{ position: 'relative' }} className={"justify-content-center align-items-center d-flex "}>
            <img src={file} alt={"entry-attachment"} width={400} className={"img-thumbnail"}/>
            <div className="upload-progress justify-content-center align-items-center d-flex" style={{ opacity: uploading ? 1 : 0 }}>
                    <Loading></Loading>
            </div>
        </div>
    );
}

export default AutoUploadFileComp;