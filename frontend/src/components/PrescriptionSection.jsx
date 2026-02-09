import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserMd, FaUser, FaStethoscope, FaCapsules, FaExclamationCircle, FaCheckCircle, FaClipboardList } from 'react-icons/fa';

const PrescriptionSection = ({ analysisData }) => {
    const [view, setView] = useState('patient'); // 'patient' or 'doctor'
    const { classification, diagnosis } = analysisData;

    if (!classification) return null;

    const severity = classification.label;
    const confidence = Math.round(classification.confidence * 100);

    const getPrescriptionData = () => {
        switch (severity) {
            case 'Severe_DR':
                return {
                    status: 'Urgent Attention Required',
                    color: '#ef4444',
                    doctor: {
                        diagnosis: 'High-risk Proliferative/Severe Non-Proliferative Diabetic Retinopathy',
                        findings: 'Extensive microaneurysms, intraretinal microvascular abnormalities (IRMA), and significant exudation detected.',
                        plan: [
                            'Immediate referral to a Vitreoretinal Specialist.',
                            'Consider Optical Coherence Tomography (OCT) for macular edema assessment.',
                            'Fluorescein Angiography (FA) to evaluate peripheral ischemia.',
                            'Potential Panretinal Photocoagulation (PRP) or Anti-VEGF therapy.'
                        ],
                        meds: ['Intravitreal Anti-VEGF (as per specialist)', 'Strict glycemic control (HbA1c < 7.0%)']
                    },
                    patient: {
                        summary: 'The scan shows significant signs of Diabetic Retinopathy that need immediate specialist care.',
                        advice: [
                            'Do not panic, but please schedule a specialist appointment within 48-72 hours.',
                            'Strictly monitor your blood sugar levels 3 times a day.',
                            'Call your doctor immediately if you see new "floaters" or dark spots.',
                            'Ensure your blood pressure is within normal range.'
                        ],
                        lifestyle: 'Low-sodium diet, gentle walking, and zero smoking.'
                    }
                };
            case 'Mild_DR':
                return {
                    status: 'Early Stage Detection',
                    color: '#f59e0b',
                    doctor: {
                        diagnosis: 'Mild Non-Proliferative Diabetic Retinopathy (NPDR)',
                        findings: 'Few microaneurysms detected. No significant macular edema visible in current filters.',
                        plan: [
                            'Routine monitoring every 6 months.',
                            'Reinforce strict glycemic and blood pressure control.',
                            'Comprehensive eye exam via dilated fundoscopy in 4-6 months.'
                        ],
                        meds: ['Systemic management of diabetes', 'Fenofibrate (consider as per clinical guidelines)']
                    },
                    patient: {
                        summary: 'We detected early signs of diabetic changes in your retina.',
                        advice: [
                            'Continue regular checkups with your eye doctor every 6 months.',
                            'Maintain steady blood sugar levels to prevent progression.',
                            'Report any sudden blurring of vision immediately.',
                            'Keep your A1C levels under control.'
                        ],
                        lifestyle: 'Regular cardiovascular exercise and high-fiber diet.'
                    }
                };
            default:
                return {
                    status: 'Healthy Retinal Condition',
                    color: '#10b981',
                    doctor: {
                        diagnosis: 'No Apparent Diabetic Retinopathy',
                        findings: 'Vascular architecture within normal limits. No exudates or microaneurysms identified.',
                        plan: [
                            'Annual screening recommended.',
                            'Maintain current systemic management.'
                        ],
                        meds: ['Continue current diabetic regimen']
                    },
                    patient: {
                        summary: 'Great news! Your retinal scan shows no signs of diabetic retinopathy.',
                        advice: [
                            'Continue your annual eye screenings.',
                            'Keep up the good work with your diabetes management.',
                            'Stay active and eat healthy.',
                            'Review your eye health again in 12 months.'
                        ],
                        lifestyle: 'Maintain healthy weight and regular physical activity.'
                    }
                };
        }
    };

    const data = getPrescriptionData();

    return (
        <div className="mt-5 text-start w-100 animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="d-flex justify-content-between align-items-end mb-4">
                <div>
                    <h4 className="fw-extrabold text-dark mb-1 d-flex align-items-center gap-2">
                        <FaClipboardList className="text-primary" /> AI-Generated Clinical Guidance
                    </h4>
                    <p className="text-muted small">Generated on {new Date().toLocaleDateString()} | Confidence: {confidence}%</p>
                </div>
                <div className="bg-light p-1 rounded-pill d-flex shadow-sm border" style={{ width: 'fit-content' }}>
                    <button
                        className={`btn rounded-pill px-4 transition-all ${view === 'patient' ? 'btn-primary shadow' : 'btn-link text-muted'}`}
                        onClick={() => setView('patient')}
                    >
                        <FaUser className="me-2" /> Patient
                    </button>
                    <button
                        className={`btn rounded-pill px-4 transition-all ${view === 'doctor' ? 'btn-primary shadow' : 'btn-link text-muted'}`}
                        onClick={() => setView('doctor')}
                    >
                        <FaUserMd className="me-2" /> Doctor
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={view}
                    initial={{ opacity: 0, x: view === 'patient' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: view === 'patient' ? 20 : -20 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card p-4 p-md-5 border-4"
                    style={{ borderTop: `6px solid ${data.color}` }}
                >
                    <div className="d-flex align-items-center gap-3 mb-4">
                        <div className="p-3 rounded-circle shadow-sm" style={{ backgroundColor: `${data.color}15`, color: data.color }}>
                            {severity === 'No_DR' ? <FaCheckCircle size={32} /> : <FaExclamationCircle size={32} />}
                        </div>
                        <div>
                            <span className="badge px-3 py-2 rounded-pill mb-1" style={{ backgroundColor: `${data.color}20`, color: data.color }}>{data.status}</span>
                            <h3 className="mb-0 fw-bold">{view === 'patient' ? 'Care Instructions' : 'Clinical Assessment'}</h3>
                        </div>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-7">
                            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2 text-dark">
                                <FaStethoscope className="text-primary" />
                                {view === 'patient' ? 'Summary for You' : 'Diagnostic Summary'}
                            </h5>
                            <p className="lead text-dark fs-6" style={{ lineHeight: '1.8' }}>
                                {view === 'patient' ? data.patient.summary : data.doctor.diagnosis}
                            </p>
                            <hr className="opacity-10" />
                            <h5 className="fw-bold mb-3 mt-4 text-dark">Suggested Plan:</h5>
                            <ul className="list-unstyled">
                                {(view === 'patient' ? data.patient.advice : data.doctor.plan).map((item, i) => (
                                    <li key={i} className="mb-3 d-flex gap-3 align-items-start">
                                        <div className="mt-1"><FaCheckCircle className="text-success opacity-50" /></div>
                                        <span className="text-muted fw-medium fs-6">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-md-5">
                            <div className="p-4 rounded-4 h-100 shadow-sm" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                <h5 className="fw-bold mb-3 d-flex align-items-center gap-2 text-dark">
                                    <FaCapsules className="text-primary" />
                                    {view === 'patient' ? 'Lifestyle Tips' : 'Clinical Logic'}
                                </h5>
                                <p className="text-muted fw-medium" style={{ fontSize: '0.95rem' }}>
                                    {view === 'patient' ? data.patient.lifestyle : data.doctor.findings}
                                </p>

                                <div className="mt-4 pt-3 border-top">
                                    <h6 className="fw-bold small text-uppercase text-primary tracking-widest mb-3">Reccomended Meds/Tests</h6>
                                    {(view === 'patient' ? ['Regular Eye Drops (Lubricating)', 'Daily A1C Monitor'] : data.doctor.meds).map((med, i) => (
                                        <div key={i} className="badge bg-white text-dark shadow-sm border p-2 px-3 rounded-pill mb-2 me-2 small">
                                            {med}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 pt-4 border-top d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                            <div className="bg-dark rounded-circle" style={{ width: '40px', height: '40px', padding: '8px' }}>
                                <img src="/logo192.png" alt="AI" className="img-fluid" style={{ filter: 'invert(1)' }} />
                            </div>
                            <div>
                                <h6 className="mb-0 fw-bold">Validated by DR-Dashboard AI</h6>
                                <p className="small text-muted mb-0 text-uppercase tracking-tighter" style={{ fontSize: '0.7rem' }}>Clinical Version 2.4.1</p>
                            </div>
                        </div>
                        <button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={() => window.print()}>
                            <i className="bi bi-printer me-2"></i> Print {view === 'patient' ? 'Card' : 'Record'}
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default PrescriptionSection;
