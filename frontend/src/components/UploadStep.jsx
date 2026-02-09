import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaFileMedical } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const UploadStep = ({ onUpload }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(null);

    const onDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        setPreview(URL.createObjectURL(file));
        setUploading(true);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setTimeout(() => {
                onUpload(res.data.id, res.data.base64);
            }, 1000);
        } catch (err) {
            console.error(err);
            alert("Upload failed");
            setUploading(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass-card p-5 text-center mx-auto position-relative overflow-hidden"
            style={{ maxWidth: '750px' }}
        >
            {/* Background Glow Effect */}
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                background: 'radial-gradient(circle at top right, rgba(14, 165, 233, 0.05), transparent 40%)',
                zIndex: 0
            }} />

            <div className="position-relative" style={{ zIndex: 1 }}>
                <div className="mb-4">
                    <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="bg-primary bg-opacity-10 text-primary rounded-4 d-inline-flex p-3 mb-3 shadow-sm"
                    >
                        <FaFileMedical size={40} />
                    </motion.div>
                    <h2 className="text-dark display-6 fw-bold">Upload Patient Fundus Image</h2>
                    <p className="text-muted-custom lead px-4">Supported formats: JPG, PNG, TIFF. Ensure high resolution for best accuracy.</p>
                </div>

                <motion.div
                    {...getRootProps()}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`border-2 rounded-4 p-5 cursor-pointer transition-all ${isDragActive
                            ? 'border-primary bg-primary bg-opacity-10 shadow-lg'
                            : 'border-dashed border-primary border-opacity-25 bg-white bg-opacity-50'
                        }`}
                    style={{
                        minHeight: '320px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: isDragActive ? '0 0 30px rgba(14, 165, 233, 0.2)' : 'none'
                    }}
                >
                    <input {...getInputProps()} />
                    <AnimatePresence mode="wait">
                        {preview ? (
                            <motion.div
                                key="preview"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="position-relative"
                            >
                                <img src={preview} alt="Preview" className="img-fluid rounded-4 shadow-md" style={{ maxHeight: '280px' }} />
                                <div className="mt-3 text-primary fw-bold d-flex align-items-center justify-content-center gap-2">
                                    <FaCloudUploadAlt /> Click to change image
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="upload"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="d-flex flex-column align-items-center"
                            >
                                <FaCloudUploadAlt size={80} className={`mb-3 transition-all ${isDragActive ? 'text-primary animate-pulse-custom' : 'text-primary opacity-50'}`} />
                                <h4 className="text-dark fw-bold">Drag & Drop or Click to Upload</h4>
                                <p className="text-muted small mb-0">Secure DICOM/Image Transfer Protocol</p>
                                <div className="badge bg-light text-primary border border-primary border-opacity-10 px-3 py-2 rounded-pill mt-4 shadow-sm">
                                    <i className="bi bi-shield-check me-2"></i>HIPAA Compliant Transfer
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {uploading && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4"
                    >
                        <div className="progress rounded-pill bg-light shadow-inner" style={{ height: '10px' }}>
                            <motion.div
                                className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                                role="progressbar"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </div>
                        <p className="text-primary mt-3 small fw-bold tracking-wide text-uppercase">
                            Analyzing Retinal Biomarkers...
                        </p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default UploadStep;
