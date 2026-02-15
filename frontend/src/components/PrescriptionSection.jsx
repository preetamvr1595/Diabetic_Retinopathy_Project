import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PrescriptionSection = ({ analysisData }) => {
    const [view, setView] = useState('doctor'); // 'doctor' or 'patient'
    const { classification, diagnosis } = analysisData;

    if (!classification) return null;

    const severity = classification?.label;
    const confidence = Math.round((classification?.confidence || 0) * 100);
    const diagConfidence = diagnosis ? Math.round((diagnosis?.confidence || 0) * 100) : confidence;

    const getAIInsights = () => {
        const insights = {
            'No_DR': {
                doctor: {
                    status: 'STABLE / NORMAL',
                    badgeClass: 'badge-blue',
                    title: 'No Apparent Diabetic Retinopathy',
                    reasoning: 'Automated feature extraction has performed a high-pass vascular sweep. Zero microaneurysms or intraretinal microvascular abnormalities (IRMA) were detected within the 45-degree field of view. Foveal avascular zone (FAZ) remains architecturally intact.',
                    protocol: [
                        'Schedule routine annual fundus photography',
                        'Maintain current metabolic glycemic targets',
                        'Continue cardiovascular health monitoring',
                        'Bi-annual HbA1c screening'
                    ],
                    prescription: [
                        { item: 'Vitamin A / Lutein Supplement', dosage: 'Daily', duration: 'Ongoing' },
                        { item: 'Protective Blue-Light Filters', dosage: 'Standard Usage', duration: 'As needed' }
                    ],
                    nextSteps: 'No clinical intervention required at this stage. Patient is recommended for standard preventative ocular hygiene.'
                },
                patient: {
                    status: 'EXCELLENT',
                    badgeClass: 'badge-pink',
                    title: 'Your Eyes Are Healthy!',
                    reasoning: 'Great news! Our AI scan didn\'t find any signs of diabetic eye damage. Your retina looks clear and your vision is well-protected.',
                    protocol: [
                        'Keep up your healthy habits!',
                        'See your eye doctor once a year',
                        'Keep your blood sugar in its target range',
                        'Wear sunglasses on bright days'
                    ],
                    prescription: [
                        { item: 'Healthy Diet', dosage: 'Balanced meals', duration: 'Always' },
                        { item: 'Regular Exercise', dosage: '30 mins/day', duration: 'Weekly' }
                    ],
                    nextSteps: 'You don\'t need any special treatment right now. Just keep taking good care of your health!'
                }
            },
            'Mild_DR': {
                doctor: {
                    status: 'MONITOR / STAGE 1',
                    badgeClass: 'badge-blue',
                    title: 'Mild Non-Proliferative Retinopathy',
                    reasoning: 'AI-driven pathological scan identified minor microvascular dilations (microaneurysms) in the temporal quadrant. No evidence of macular edema or hard exudates. Early-stage vascular leakage is statistically possible but not clinically manifested.',
                    protocol: [
                        '6-Month specialist ophthalmic review',
                        'Optimize HbA1c to < 6.5%',
                        'Dynamic blood pressure profiling',
                        'Comprehensive lipid panel assessment'
                    ],
                    prescription: [
                        { item: 'Metformin calibration', dosage: 'As per GP', duration: 'Clinical review' },
                        { item: 'Omega-3 Fatty Acid Support', dosage: '1000mg Daily', duration: '90 days' }
                    ],
                    nextSteps: 'Clinical observation required. Focus on strict systemic metabolic control to prevent neurovascular progression.'
                },
                patient: {
                    status: 'EARLY SIGNS',
                    badgeClass: 'badge-pink',
                    title: 'We Found Small Changes',
                    reasoning: 'The scan shows some very early, mild changes in the tiny blood vessels of your eyes. This is common and manageable if we act now.',
                    protocol: [
                        'Visit your eye doctor in 6 months',
                        'Focus on your blood sugar levels',
                        'Check your blood pressure regularly',
                        'Eat more fiber and healthy fats'
                    ],
                    prescription: [
                        { item: 'Blood Sugar Monitoring', dosage: '3x per day', duration: '30 days' },
                        { item: 'Healthy Eye Vitamins', dosage: '1 per day', duration: '90 days' }
                    ],
                    nextSteps: 'Don\'t worry—this is a great time to make small changes to keep your vision strong.'
                }
            },
            'Moderate_DR': {
                doctor: {
                    status: 'URGENT / STAGE 2',
                    badgeClass: 'badge-blue',
                    title: 'Moderate NPDR - Medical Alert',
                    reasoning: 'Multiple microaneurysms, dot-blot hemorrhages, and venous beading detected across multiple quadrants. Structural heatmaps indicate high-activity zones of vascular stress. Progression to PDR is elevated to 25% within 12 months.',
                    protocol: [
                        'Refer to Vitreoretinal Specialist immediately',
                        'Optical Coherence Tomography (OCT) Imaging',
                        'Fluorescein Angiography Consideration',
                        'Intensive Diabetic Management Audit'
                    ],
                    prescription: [
                        { item: 'Fenofibrate study', dosage: 'Clinical guidance', duration: 'Immediate' },
                        { item: 'Intravitreal Anti-VEGF Protocol', dosage: 'Consultation req.', duration: 'Proposed' }
                    ],
                    nextSteps: 'Requires immediate clinical strategy update. Surgical or pharmaceutical intervention may be necessary to preserve visual field.'
                },
                patient: {
                    status: 'ACTION NEEDED',
                    badgeClass: 'badge-pink',
                    title: 'Time to See a Specialist',
                    reasoning: 'The AI found several signs that diabetes is affecting the blood vessels in your eyes more than it should. We need to take action to protect your sight.',
                    protocol: [
                        'See a retina specialist this month',
                        'Get a detailed eye scan (OCT)',
                        'Start a stricter management plan',
                        'Ask your doctor about eye injections'
                    ],
                    prescription: [
                        { item: 'Specialist Visit', dosage: 'ASAP', duration: 'High priority' },
                        { item: 'New Care Plan', dosage: 'Discuss with MD', duration: 'Immediate' }
                    ],
                    nextSteps: 'With the right care from a specialist, we can work to stop these changes from getting worse.'
                }
            },
            'Severe_DR': {
                doctor: {
                    status: 'CRITICAL / STAGE 3',
                    badgeClass: 'badge-blue',
                    title: 'Proliferative DR / Severe NPDR Warning',
                    reasoning: 'Critical vascular failure identified. Widespread ischemia, large-scale exudative clusters, and possible neovascularization at the disc. High risk of tractional retinal detachment and severe visual impairment.',
                    protocol: [
                        'Emergency Vitreoretinal Consultation',
                        'Immediate PRP Laser Photocoagulation Evaluation',
                        'Aggressive Hypertension Management',
                        'Tertiary Hospital Referral'
                    ],
                    prescription: [
                        { item: 'Intravitreal Aflibercept/Ranibizumab', dosage: 'Stat / Induction', duration: 'Clinical Protocol' },
                        { item: 'PRP Surgical Stabilization', dosage: 'TBD', duration: 'Immediate Priority' }
                    ],
                    nextSteps: 'EMERGENCY: Patient is at imminent risk of permanent blindness. Immediate surgical stabilization of the retinal vascular tree is the primary directive.'
                },
                patient: {
                    status: 'URGENT CARE',
                    badgeClass: 'badge-pink',
                    title: 'Urgent Action for Your Vision',
                    reasoning: 'The AI has spotted severe changes that put your vision at high risk. You need to see a specialized eye surgeon as soon as possible.',
                    protocol: [
                        'GO to a retina clinic today',
                        'Prepare for laser or surgical care',
                        'Strictly control your blood pressure',
                        'Follow emergency medical advice'
                    ],
                    prescription: [
                        { item: 'Emergency Clinic Visit', dosage: 'TODAY', duration: 'CRITICAL' },
                        { item: 'Laser Evaluation', dosage: 'Immediate', duration: 'URGENT' }
                    ],
                    nextSteps: 'Please do not wait. Getting treatment today is the best way to save your eyesight.'
                }
            }
        };
        const base = insights[severity] || insights['No_DR'];
        return base[view];
    };

    const data = getAIInsights();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-5 w-100 pb-5 px-3 theme-${view}`}
            style={{ maxWidth: '1000px', margin: '0 auto' }}
        >
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <div className="text-start">
                    <h2 className="fw-bold h4 mb-1 text-main">
                        {view === 'doctor' ? 'AI CLINICAL PRESCRIPTION' : 'AI PATIENT GUIDANCE'}
                    </h2>
                    <p className="text-muted mb-0 small uppercase">
                        {view === 'doctor' ? 'CONFIDENTIAL MEDICAL RECORD' : 'YOUR DIGITAL HEALTH REPORT'}
                    </p>
                </div>

                {/* Switcher */}
                <div className="bg-light p-1 rounded-pill d-flex gap-1 shadow-sm border">
                    <button
                        onClick={() => setView('doctor')}
                        className={`btn btn-sm rounded-pill px-3 py-1 transition-all ${view === 'doctor' ? 'btn-primary shadow-sm' : 'btn-link text-muted'}`}
                        style={{ fontSize: '0.75rem', fontWeight: 'bold' }}
                    >
                        DOCTOR VIEW
                    </button>
                    <button
                        onClick={() => setView('patient')}
                        className={`btn btn-sm rounded-pill px-3 py-1 transition-all ${view === 'patient' ? 'btn-med-pink shadow-sm text-white' : 'btn-link text-muted'}`}
                        style={{ fontSize: '0.75rem', fontWeight: 'bold' }}
                    >
                        PATIENT VIEW
                    </button>
                </div>
            </div>

            <div className={`med-card p-0 overflow-hidden shadow-lg border-0 bg-white ${view === 'patient' ? 'border-top-pink' : ''}`}>
                {/* Status Banner */}
                <div className={`p-4 d-flex justify-content-between align-items-center border-bottom ${view === 'patient' ? 'bg-pink-soft' : 'bg-light bg-opacity-50'}`}>
                    <div className="d-flex align-items-center gap-4">
                        <div className={`rx-symbol display-6 fw-bold opacity-50 ${view === 'patient' ? 'text-pink' : 'text-primary'}`}>
                            {view === 'doctor' ? '℞' : <i className="bi bi-heart-pulse"></i>}
                        </div>
                        <div>
                            <div className={`med-badge ${data.badgeClass} px-3 py-1 fs-6 mb-1 text-uppercase`}>{data.status}</div>
                            <h3 className="mb-0 fw-bold h5 text-main">{data.title}</h3>
                        </div>
                    </div>
                    <div className="text-end">
                        <div className="smaller fw-bold text-muted mb-1 text-uppercase">AI Analysis Confidence</div>
                        <h3 className={`fw-bold h4 mb-0 ${view === 'patient' ? 'text-pink' : 'text-primary'}`}>{diagConfidence}%</h3>
                    </div>
                </div>

                <div className="p-5">
                    {/* Insights Block */}
                    <div className={`mb-5 p-4 rounded-4 ${view === 'patient' ? 'bg-pink-soft border-pink-light' : 'bg-primary-soft border-primary-light'}`}>
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <i className={`bi ${view === 'doctor' ? 'bi-robot text-primary' : 'bi-stars text-pink'} fs-5`}></i>
                            <h5 className={`small fw-bold mb-0 text-uppercase ${view === 'doctor' ? 'text-primary' : 'text-pink'}`}>
                                {view === 'doctor' ? 'AI Clinical Reasoning & Findings' : 'What Our AI Found For You'}
                            </h5>
                        </div>
                        <p className="text-main mb-0" style={{ lineHeight: '1.7', fontSize: '0.95rem', fontStyle: view === 'doctor' ? 'italic' : 'normal' }}>
                            {view === 'doctor' ? `" ${data.reasoning} "` : data.reasoning}
                        </p>
                    </div>

                    <div className="row g-5 mb-5">
                        <div className="col-lg-6">
                            <h5 className={`small fw-bold text-muted mb-4 text-start text-uppercase border-start ${view === 'patient' ? 'border-pink' : 'border-primary'} border-4 ps-3`}>
                                {view === 'doctor' ? 'Medical Protocol' : 'Steps To Take'}
                            </h5>
                            <div className="d-flex flex-column gap-3">
                                {data.protocol.map((item, i) => (
                                    <div key={i} className="d-flex gap-3 align-items-center p-3 rounded-4 border bg-light bg-opacity-20">
                                        <div className={`p-2 rounded-circle bg-white shadow-sm d-flex align-items-center justify-content-center ${view === 'patient' ? 'text-pink' : 'text-primary'}`} style={{ width: '32px', height: '32px' }}>
                                            <i className="bi bi-check2 fs-5"></i>
                                        </div>
                                        <div className="small fw-bold text-main">{item}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <h5 className={`small fw-bold text-muted mb-4 text-start text-uppercase border-start ${view === 'patient' ? 'border-pink' : 'border-primary'} border-4 ps-3`}>
                                {view === 'doctor' ? 'Proposed Prescription' : 'Your Health Plan'}
                            </h5>
                            <div className="table-responsive">
                                <table className="table table-sm table-borderless align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="smaller text-muted fw-bold">{view === 'doctor' ? 'AGENT / ACTION' : 'RECOMMENDATION'}</th>
                                            <th className="smaller text-muted fw-bold">{view === 'doctor' ? 'DOSAGE' : 'AMOUNT'}</th>
                                            <th className="smaller text-muted fw-bold">TIME</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.prescription.map((rx, i) => (
                                            <tr key={i} className="border-bottom border-light">
                                                <td className="py-3 small fw-bold text-main">{rx.item}</td>
                                                <td className="py-3 small text-muted">{rx.dosage}</td>
                                                <td className="py-3 small text-muted">{rx.duration}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className={`p-4 rounded-4 border mb-5 ${view === 'patient' ? 'bg-light' : 'bg-light'}`}>
                        <h5 className="small fw-bold text-muted mb-2 text-start text-uppercase">
                            {view === 'doctor' ? 'Immediate Clinical Directive' : 'A Message For Your Health'}
                        </h5>
                        <p className="text-main mb-0" style={{ lineHeight: '1.6' }}>{data.nextSteps}</p>
                    </div>

                    <div className="mt-4 pt-5 border-top d-flex flex-wrap gap-4 justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-3">
                            <div className={`p-3 rounded-circle ${view === 'patient' ? 'bg-pink text-white' : 'bg-primary bg-opacity-10 text-primary'}`}>
                                <i className={`bi ${view === 'patient' ? 'bi-heart-check' : 'bi-shield-check'} fs-4`}></i>
                            </div>
                            <div>
                                <h6 className="mb-0 fw-bold text-main">{view === 'doctor' ? 'SYSTEM DATA VALIDATED' : 'SCAN COMPLETED'}</h6>
                                <p className="text-muted mb-0 smaller">RETINACORE AI V.2.4.9 // HIPAA SECURE</p>
                            </div>
                        </div>

                        <div className="d-flex flex-column align-items-end">
                            <div className="signature-block p-3 border-bottom text-center" style={{ minWidth: '200px' }}>
                                <h4 className={`mb-0 mt-2 ${view === 'patient' ? 'text-pink' : 'text-primary'}`} style={{ fontFamily: 'Dancing Script, cursive', fontSize: '1.5rem' }}>RetinaCore AI</h4>
                            </div>
                            <div className="smaller fw-bold text-muted mt-2 uppercase">AI CLINICAL ASSISTANT</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 text-center p-4">
                <p className="text-muted smaller fw-bold mb-0 opacity-40 uppercase" style={{ letterSpacing: '2px' }}>
                    Note: This is an automatically generated AI assessment for clinical decision support.
                </p>
            </div>
        </motion.div>
    );
};

export default PrescriptionSection;
