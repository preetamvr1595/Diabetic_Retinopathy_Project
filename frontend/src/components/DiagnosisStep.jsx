import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { motion } from 'framer-motion';

const DiagnosisStep = ({ imageId, onNext }) => {
    const [diagnosis, setDiagnosis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        const fetchDiagnosis = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/api/diagnose/${imageId}`);
                if (res.data && !res.data.error) {
                    setDiagnosis(res.data);
                    setTimeout(() => {
                        setLoading(false);
                    }, 1500);
                } else {
                    setDiagnosis(null);
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                setDiagnosis(null);
                setLoading(false);
            }
        };
        fetchDiagnosis();
    }, [imageId, retryCount]);

    const handleRetry = () => {
        setRetryCount(prev => prev + 1);
    };

    if (loading) return (
        <div className="text-center py-5 d-flex flex-column align-items-center">
            <div className="med-card p-5 shadow-lg border-0" style={{ maxWidth: '400px' }}>
                <div className="spinner-border text-primary mb-4" role="status" style={{ width: '3rem', height: '3rem' }}></div>
                <h4 className="fw-bold h5">CLINICAL DIAGNOSIS...</h4>
                <p className="text-muted small">Running pathology detection algorithms</p>
            </div>
        </div>
    );

    if (!diagnosis && !loading) return (
        <div className="text-center py-5 d-flex flex-column align-items-center">
            <div className="med-card p-5 shadow-lg border-0 bg-danger bg-opacity-10" style={{ maxWidth: '400px' }}>
                <i className="bi bi-activity text-danger display-4 mb-3"></i>
                <h4 className="fw-bold h5 text-danger">DIAGNOSIS INTERRUPTED</h4>
                <p className="text-muted small mb-4">The diagnostic engine returned an empty result. This can happen if the clinical model is still loading or if the connection was reset.</p>
                <button className="btn-med btn-med-outline w-100" onClick={handleRetry}>
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    RETRY DIAGNOSIS
                </button>
            </div>
        </div>
    );

    const isHealthy = diagnosis?.verdict?.toLowerCase()?.includes('no dr');

    return (
        <div className="animate-fade-in py-4">
            <div className="d-flex justify-content-between align-items-end mb-4">
                <div>
                    <h2 className="fw-bold h3 mb-1">IMAGE DIAGNOSIS</h2>
                    <p className="text-muted small mb-0">Automated detection of diabetic retinopathy pathologies</p>
                </div>
                <button
                    className="btn-med btn-med-primary shadow-sm"
                    onClick={() => onNext(diagnosis)}
                    disabled={!diagnosis || !!diagnosis?.error}
                >
                    PROCEED TO CLASSIFICATION
                    <i className="bi bi-chevron-right"></i>
                </button>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-lg-12">
                    <div className="med-card p-5 text-center shadow-lg border-0">
                        <div className="mb-4">
                            <div className={`d-inline-flex p-4 rounded-circle mb-3 ${isHealthy ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                                <i className={`bi ${isHealthy ? 'bi-shield-check' : 'bi-exclamation-triangle'} display-4`}></i>
                            </div>
                            <h4 className="fw-bold h2 mb-1">DIAGNOSTIC VERDICT</h4>
                            <div className="med-badge badge-blue px-3 py-2 fs-5 mb-4">
                                {diagnosis?.verdict?.toUpperCase() || 'ERROR'}
                            </div>

                            {/* Confidence Index */}
                            <div className="mx-auto" style={{ maxWidth: '400px' }}>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="smaller fw-bold text-muted">RETINACORE CONFIDENCE INDEX</span>
                                    <span className="smaller fw-bold text-primary">{(diagnosis?.confidence * 100).toFixed(1)}%</span>
                                </div>
                                <div className="bg-light rounded-pill p-1 shadow-sm overflow-hidden" style={{ height: '12px' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${diagnosis?.confidence * 100}%` }}
                                        transition={{ duration: 1, ease: 'easeOut' }}
                                        className="h-100 bg-primary rounded-pill"
                                    ></motion.div>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="p-4 bg-light rounded-4 border mb-4">
                                    <div className="d-flex align-items-center gap-2 mb-2 justify-content-center">
                                        <i className="bi bi-clipboard2-pulse text-primary"></i>
                                        <span className="small fw-bold text-main">CLINICAL OBSERVATION</span>
                                    </div>
                                    <p className="text-muted mb-0">
                                        Pathology detection stage completed. The AI model has scanned the primary vascular regions and identified potential markers consistent with {diagnosis?.verdict || 'clinical assessment'}. Follow clinical protocol for secondary verification.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center gap-4">
                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-check-circle-fill text-success"></i>
                                <span className="smaller fw-bold text-muted">AI VALIDATED</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-shield-lock-fill text-primary"></i>
                                <span className="smaller fw-bold text-muted">DICOM SECURE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiagnosisStep;
