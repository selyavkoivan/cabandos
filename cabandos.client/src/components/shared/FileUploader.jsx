import React, { Component } from 'react';
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class FileUploader extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        const fileInput = document.querySelector('#file');
        fileInput.click();
    };

    handleFileChange = (e) => {
        this.uploadFile(e.target.files[0])
    };

    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.uploadFile(e.dataTransfer.files[0])
    };

    uploadFile = (file) => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            this.props.uploadFile(formData);
        }
    };

    handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    render() {
        const { acceptType } = this.props;
        return (
            <div className="m-0 p-0">
                <div className="mt-3">
                    <div
                        className="text-center mt-3 border border-5 rounded p-5"
                        id="drop-area"
                        onClick={this.handleClick}
                        onDragOver={this.handleDragOver}
                        onDrop={this.handleDrop}
                        style={{ cursor: 'pointer' }}
                    >
                        <FontAwesomeIcon icon={faCloudUpload} /> Upload your file: click or drag it here
                        <input
                            type="file"
                            id="file"
                            name="file"
                            className="d-none"
                            accept={acceptType}
                            onChange={this.handleFileChange}
                        />
                    </div>

                </div>
            </div>
        )
    }
}