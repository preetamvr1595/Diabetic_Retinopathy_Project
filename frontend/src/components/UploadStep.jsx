import React, { useState, useCallback } from 'react';
import api from '../api/axiosConfig';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

const UploadStep = ({ onUpload }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles.length === 0) return;

        setIsUploading(true);
        setError(null);
        const formData = new FormData();
        formData.append('image', acceptedFiles[0]);

        try {
            const response = await api.post('/api/upload', formData);

            // Critical Diagnostic Check:
            // If the response is a string starting with "<!", it means we received HTML (likely index.html)
            // instead of the JSON API response. This happens if the proxy or API_URL is misconfigured.
            if (typeof response.data === 'string' && response.data.trim().startsWith('<!')) {
                throw new Error("Misconfigured API URL: Frontend received HTML instead of JSON. Please check VITE_API_URL or Proxy settings.");
            }

            if (response.data && response.data.id) {
                onUpload(response.data.id);
            } else {
                throw new Error("Server did not return Image ID. Received unexpected response format.");
            }
        } catch (error) {
            console.error('Upload failed', error);
            setError(error.response?.data?.error || error.message || "Connection refused by clinical engine");
            setIsUploading(false);
        }
    }, [onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    });

    return (
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="med-card med-card-blue p-5 w-100 text-center shadow-lg border-0"
                style={{ maxWidth: '600px', borderRadius: 'var(--radius-lg)' }}
            >
                <div className="mb-4">
                    {error && (
                        <div className="alert alert-danger py-2 small mb-4 border-0 bg-danger bg-opacity-10 text-danger fw-bold">
                            <i className="bi bi-exclamation-triangle me-2"></i>
                            {error.toUpperCase()}
                        </div>
                    )}
                    <div className="d-inline-flex p-4 rounded-circle bg-primary bg-opacity-10 text-primary mb-3">
                        <i className="bi bi-cloud-arrow-up display-5"></i>
                    </div>
                    <h2 className="fw-bold h3 mb-2">SOURCE ACQUISITION</h2>
                    <p className="text-muted small">Upload high-resolution retinal fundus photography for AI analysis</p>
                </div>

                <div
                    {...getRootProps()}
                    className={`p-5 mb-4 rounded-4 border-2 border-dashed transition-all d-flex flex-column align-items-center justify-content-center ${isDragActive ? 'border-primary bg-primary bg-opacity-5' : 'border-light bg-white'
                        }`}
                    style={{ cursor: 'pointer', minHeight: '240px' }}
                >
                    <input {...getInputProps()} />
                    <div className="mb-3">
                        <i className={`bi bi-images h1 ${isDragActive ? 'text-primary' : 'text-muted'}`}></i>
                    </div>
                    <p className="fw-bold text-main mb-1">
                        {isDragActive ? 'Drop your image here' : 'Drop retinal image or click to browse'}
                    </p>
                    <p className="text-muted small">Supported formats: JPG, PNG, DICOM (max 20MB)</p>
                </div>

                <div className="d-flex align-items-center justify-content-center gap-4 mb-4">
                    <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-shield-check text-success"></i>
                        <span className="smaller fw-bold text-muted" style={{ fontSize: '10px' }}>ENCRYPTED</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-clock-history text-primary"></i>
                        <span className="smaller fw-bold text-muted" style={{ fontSize: '10px' }}>FAST ANALYSIS</span>
                    </div>
                </div>

                <button
                    className="btn-med btn-med-primary w-100 py-3 justify-content-center"
                    disabled={isUploading}
                    onClick={() => document.querySelector('input').click()}
                >
                    {isUploading ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status"></span>
                            <span className="ms-2">UPLOADING...</span>
                        </>
                    ) : (
                        <>
                            <i className="bi bi-plus-lg"></i>
                            SELECT CLINICAL RECORD
                        </>
                    )}
                </button>
            </motion.div>
        </div>
    );
};

export default UploadStep;
