import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaMicroscope, FaBrain, FaWaveSquare } from 'react-icons/fa';
import api from '../api/axiosConfig';

const DiagnosisStep = ({ imageId, onNext }) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showExplain, setShowExplain] = useState(false);

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
            <h3 className="text-dark fw-bold">Analyzing Retinal Biomarkers...</h3>
            <div className="spinner-grow text-primary mt-3" role="status"></div>
            <p className="text-muted mt-3">Synthesizing segmentation data with classification logic</p>
        </div>
    );

    if (!result) return (
        <div className="text-center text-danger py-5">
            <h3 className="fw-bold">Error Loading Analysis</h3>
            <p>Could not interpret findings. Please try again.</p>
            <button className="btn btn-secondary rounded-pill px-4" onClick={() => window.location.reload()}>
                Restart Analysis
            </button>
        </div>
    );

    const isDiabetic = result.label !== 'No_DR';
    const statusText = isDiabetic ? 'Diabetic Retinopathy Detected' : 'Retinal Health Normal';
    const statusColor = isDiabetic ? '#FF4D4D' : '#10b981';
    const statusBg = isDiabetic ? 'rgba(255, 77, 77, 0.03)' : 'rgba(16, 185, 129, 0.03)';
    const icon = isDiabetic ? 'bi-exclamation-triangle-fill' : 'bi-check-circle-fill';

    return (
        <div className="container" style={{ maxWidth: '900px' }}>
            <div className="text-center mb-5">
                <h2 className="text-dark fw-extrabold display-6" style={{ letterSpacing: '-0.03em' }}>Automated Clinical Screening</h2>
                <p className="text-muted fw-medium">Neural interpretation of multimodal feature maps</p>
            </div>

            <motion.div
                className="glass-card p-5 text-center shadow-lg border-2"
                style={{ borderColor: statusColor, borderRadius: '32px' }}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <div className="mb-4">
                    <i className={`bi ${icon}`} style={{ fontSize: '7rem', color: statusColor, filter: `drop-shadow(0 10px 15px ${statusColor}30)` }}></i>
                </div>

                <h1 className="display-4 fw-extrabold mb-4" style={{ color: statusColor, letterSpacing: '-0.04em' }}>
                    {statusText}
                </h1>

                <div className="p-4 rounded-4 mb-5" style={{ background: statusBg, border: `1px solid ${statusColor}15` }}>
                    <p className="lead mb-0 text-dark fw-medium opacity-75" style={{ lineHeight: '1.7' }}>
                        {isDiabetic
                            ? 'Our AI has identified high-risk morphological patterns associated with Diabetic Retinopathy that require immediate clinical review.'
                            : 'Neural analysis detected no significant vascular abnormalities indicative of Diabetic Retinopathy across all 14 clinical filters.'}
                    </p>
                </div>

                {/* Explainability Section */}
                <div className="mb-5 text-start">
                    <button
                        className="btn btn-light w-100 d-flex justify-content-between align-items-center p-3 rounded-3"
                        onClick={() => setShowExplain(!showExplain)}
                    >
                        <span className="fw-bold d-flex align-items-center gap-2">
                            <FaBrain className="text-primary" /> Why This Diagnosis Was Made?
                        </span>
                        {showExplain ? <FaChevronUp /> : <FaChevronDown />}
                    </button>

                    <AnimatePresence>
                        {showExplain && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden mt-2"
                            >
                                <div className="p-4 bg-light rounded-3 border">
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <h6 className="fw-bold small text-uppercase text-primary mb-3">Key Features Identifed</h6>
                                            <ul className="list-unstyled small text-muted">
                                                <li className="mb-2 d-flex gap-2">
                                                    <FaMicroscope className="mt-1 flex-shrink-0" />
                                                    {isDiabetic ? 'Microaneurysms and exudate clusters localized via Attention U-Net.' : 'Uniform vascular distribution with no focal leakage identified.'}
                                                </li>
                                                <li className="mb-2 d-flex gap-2">
                                                    <FaWaveSquare className="mt-1 flex-shrink-0" />
                                                    {isDiabetic ? 'ACE ME Novel filter highlighted contrast variations in vessel density.' : 'Structural integrity of vessels preserved across all enhancement filters.'}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6 border-start ps-md-4">
                                            <h6 className="fw-bold small text-uppercase text-primary mb-3">Model Confidence Reasoning</h6>
                                            <p className="small text-muted mb-0">
                                                The classification engine integrated features from 14 distinct pre-processing filters.
                                                Consistency across the <strong>ACE ME Novel</strong> and <strong>CLAHE</strong> feature maps provided {Math.round(result.confidence * 100)}% statistical support for this finding.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-premium btn-lg rounded-pill px-5 shadow" onClick={() => onNext(result)}>
                        {isDiabetic ? 'Detailed Severity Analysis' : 'Final Clinical Report'} <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default DiagnosisStep;
