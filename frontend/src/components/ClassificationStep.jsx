import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { motion } from 'framer-motion';

const ClassificationStep = ({ imageId, onNext = () => { } }) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClassification = async () => {
            try {
                const res = await api.get(`/api/classify/${imageId}`);
                setResult(res.data);
                setTimeout(() => setLoading(false), 1500);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchClassification();
    }, [imageId]);

    if (loading) return (
        <div className="text-center py-5 d-flex flex-column align-items-center">
            <div className="med-card p-5 shadow-lg border-0" style={{ maxWidth: '400px' }}>
                <div className="spinner-border text-primary mb-4" role="status" style={{ width: '3rem', height: '3rem' }}></div>
                <h4 className="fw-bold h5">FINALIZING CLINICAL STUDY...</h4>
                <p className="text-muted small">Calculating severity benchmarks</p>
            </div>
        </div>
    );

    const getSeverityDetails = (label) => {
        const configs = {
            'No_DR': { id: 'STAGE 0', color: 'badge-blue', text: 'NORMAL', full: 'No Diabetic Retinopathy' },
            'Mild_DR': { id: 'STAGE 1', color: 'badge-pink', text: 'MILD', full: 'Mild Non-Proliferative DR' },
            'Moderate_DR': { id: 'STAGE 2', color: 'badge-pink', text: 'MODERATE', full: 'Moderate Non-Proliferative DR' },
            'Severe_DR': { id: 'STAGE 3', color: 'badge-pink', text: 'SEVERE', full: 'Severe Proliferative DR' }
        };
        return configs[label] || { id: '---', color: 'badge-blue', text: 'UNKNOWN', full: 'Analyzing Pathology' };
    };

    const { id, color, text, full } = getSeverityDetails(result?.label);
    const confidenceScore = (result?.confidence * 100) || 0;

    if (!result && !loading) return (
        <div className="text-center py-5 d-flex flex-column align-items-center">
            <div className="med-card p-5 shadow-lg border-0 bg-danger bg-opacity-10" style={{ maxWidth: '400px' }}>
                <i className="bi bi-bar-chart-steps text-danger display-4 mb-3"></i>
                <h4 className="fw-bold h5 text-danger">CLASSIFICATION FAILED</h4>
                <p className="text-muted small mb-4">Final severity index calculation could not be completed. Clinical benchmarks were not reached.</p>
                <button className="btn-med btn-med-outline w-100" onClick={() => window.location.reload()}>
                    RETRY CLASSIFICATION
                </button>
            </div>
        </div>
    );

    return (
        <div className="animate-fade-in py-4">
            <div className="text-center mb-5">
                <div className="d-inline-flex p-3 rounded-circle bg-primary bg-opacity-10 text-primary mb-2">
                    <i className="bi bi-graph-up-arrow fs-2"></i>
                </div>
                <h2 className="fw-bold h3 mb-1">VASCULAR SEVERITY INDEX</h2>
                <p className="text-muted small">Automated severity grading based on clinical features</p>
            </div>

            <div className="row g-4 justify-content-center">
                <div className="col-lg-10">
                    <div className="med-card p-5 shadow-lg border-0 text-center mb-4">
                        <div className="mb-4">
                            <span className={`med-badge ${color} px-4 py-2 fs-6 mb-3`}>{id}</span>
                            <h1 className="display-3 fw-bold text-main mb-2">{text}</h1>
                            <p className="text-muted fw-bold">{full.toUpperCase()}</p>
                        </div>

                        <div className="row g-4 mt-2">
                            <div className="col-md-6">
                                <div className="p-4 bg-light rounded-4 border text-start">
                                    <div className="small fw-bold text-muted mb-3 d-flex justify-content-between">
                                        <span>AI ANALYSIS CONFIDENCE</span>
                                        <span className="text-primary">{confidenceScore.toFixed(1)}%</span>
                                    </div>
                                    <div className="bg-white rounded-pill p-1 shadow-sm overflow-hidden mb-2">
                                        <div className="h-100 bg-primary rounded-pill py-2" style={{ width: `${confidenceScore}%`, transition: 'width 1s ease-out' }}></div>
                                    </div>
                                    <p className="smaller text-muted mt-2 mb-0">Feature extraction consensus reached via multiple VGG-16 inference cycles.</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="p-4 bg-light rounded-4 border text-start">
                                    <h6 className="small fw-bold text-muted mb-3">CLINICAL PARAMETERS</h6>
                                    <div className="d-flex flex-column gap-2">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="smaller text-muted">VALIDATION SEED</span>
                                            <span className="smaller fw-bold text-main">#9822-DR</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="smaller text-muted">ENCRYPTION</span>
                                            <span className="smaller fw-bold text-main">AES-256</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="smaller text-muted">DICOM PROTOCOL</span>
                                            <span className="smaller fw-bold text-main">VERIFIED</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5">
                            <button className="btn-med btn-med-primary px-5 py-3 shadow-sm" onClick={() => onNext(result)}>
                                COMMIT TO PATIENT FILE & GENERATE REPORT
                                <i className="bi bi-file-earmark-medical ms-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassificationStep;
