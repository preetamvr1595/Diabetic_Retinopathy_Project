import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/axiosConfig';

const DiagnosisStep = ({ imageId, onNext }) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDiagnosis = async () => {
            try {
                const res = await api.get(`/api/classify/${imageId}`);
                setResult(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchDiagnosis();
    }, [imageId]);

    if (loading) return (
        <div className="text-center py-5">
            <h3 className="text-light">Analyzing Retinal Data...</h3>
            <div className="spinner-border text-info mt-3" role="status"></div>
            <p className="text-muted mt-2">Checking for signs of Diabetic Retinopathy</p>
        </div>
    );

    const isDiabetic = result.label !== 'No_DR';
    const statusText = isDiabetic ? 'Diabetic Detected' : 'Non-Diabetic';
    const statusColor = isDiabetic ? '#ef4444' : '#10b981';
    const statusBg = isDiabetic ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)';
    const icon = isDiabetic ? 'bi-exclamation-triangle-fill' : 'bi-check-circle-fill';

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <h2 className="text-center mb-5 text-dark fw-bold">Initial Diagnosis</h2>

            <div className="glass-card p-5 text-center shadow-lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-4">
                        <i className={`bi ${icon}`} style={{ fontSize: '5rem', color: statusColor }}></i>
                    </div>

                    <h1 className="display-3 fw-bold mb-3" style={{ color: statusColor }}>
                        {statusText}
                    </h1>

                    <div className="p-4 rounded-3 mb-5" style={{ background: statusBg }}>
                        <p className="lead mb-0">
                            {isDiabetic 
                                ? 'Our AI has identified patterns associated with Diabetic Retinopathy.' 
                                : 'No significant signs of Diabetic Retinopathy were detected in this image.'}
                        </p>
                    </div>

                    <div className="d-flex justify-content-center gap-3">
                        <button className="btn btn-premium rounded-pill px-5 py-3" onClick={onNext}>
                            {isDiabetic ? 'Detailed Severity Analysis' : 'View Final Report'} <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default DiagnosisStep;
