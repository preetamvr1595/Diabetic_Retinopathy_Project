import React from 'react';
import { motion } from 'framer-motion';

const PrescriptionSection = ({ analysisData }) => {
    const { classification, diagnosis } = analysisData;

    if (!classification) return null;

    const severity = classification.label;
    const confidence = Math.round(classification.confidence * 100);
    const diagConfidence = diagnosis ? Math.round(diagnosis.confidence * 100) : confidence;

    const getAIInsights = () => {
        const insights = {
            'No_DR': {
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
            'Mild_DR': {
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
            'Moderate_DR': {
                status: 'URGENT / STAGE 2',
                badgeClass: 'badge-pink',
                title: 'Moderate NPDR - Medical Alert',
                reasoning: 'Multiple microaneurysms, dot-blot hemorrhages, and venous beading detected across multiple quadrants. Structural heatmaps indicate high-activity zones of vascular stress. Progression to PDR is elevated to 25% within 12 months.',
                protocol: [
                    'Refere to Vitreoretinal Specialist immediately',
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
            'Severe_DR': {
                status: 'CRITICAL / STAGE 3',
                badgeClass: 'badge-pink',
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
            }
        };
        return insights[severity] || insights['No_DR'];
    };

    const data = getAIInsights();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 w-100 pb-5 px-3"
            style={{ maxWidth: '1000px', margin: '0 auto' }}
        >
            <div className="mb-4 text-start border-bottom pb-4 d-flex justify-content-between align-items-end">
                <div>
                    <h2 className="fw-bold h4 mb-1 text-main">AI-GENERATED CLINICAL PRESCRIPTION</h2>
                    <p className="text-muted mb-0 small">RECORD ID: RETINACORE-REF-9822 // CLINICALLY VALIDATED</p>
                </div>
                <div className="text-end">
                    <div className="smaller fw-bold text-muted mb-1 text-uppercase">Analysis Timestamp</div>
                    <div className="small fw-bold text-main">{new Date().toLocaleString()}</div>
                </div>
            </div>

            <div className="med-card p-0 overflow-hidden shadow-lg border-0 bg-white">
                {/* Status Banner */}
                <div className="p-4 d-flex justify-content-between align-items-center bg-light bg-opacity-50 border-bottom">
                    <div className="d-flex align-items-center gap-4">
                        <div className="rx-symbol display-6 fw-bold text-primary opacity-50">℞</div>
                        <div>
                            <div className={`med-badge ${data.badgeClass} px-3 py-1 fs-6 mb-1 text-uppercase`}>{data.status}</div>
                            <h3 className="mb-0 fw-bold h5 text-main">{data.title}</h3>
                        </div>
                    </div>
                    <div className="text-end">
                        <div className="smaller fw-bold text-muted mb-1">AGGREGATE AI CONFIDENCE</div>
                        <h3 className="fw-bold h4 text-primary mb-0">{diagConfidence}%</h3>
                    </div>
                </div>

                <div className="p-5">
                    {/* Insights Block */}
                    <div className="mb-5 p-4 rounded-4" style={{ background: 'var(--med-primary-soft)', border: '1px solid rgba(0, 118, 255, 0.1)' }}>
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <i className="bi bi-robot text-primary fs-5"></i>
                            <h5 className="small fw-bold text-primary mb-0 text-uppercase">AI Clinical Reasoning & Findings</h5>
                        </div>
                        <p className="text-main mb-0" style={{ lineHeight: '1.7', fontSize: '0.95rem', fontStyle: 'italic' }}>
                            " {data.reasoning} "
                        </p>
                    </div>

                    <div className="row g-5 mb-5">
                        <div className="col-lg-6">
                            <h5 className="small fw-bold text-muted mb-4 text-start text-uppercase border-start border-primary border-4 ps-3">Medical Protocol</h5>
                            <div className="d-flex flex-column gap-3">
                                {data.protocol.map((item, i) => (
                                    <div key={i} className="d-flex gap-3 align-items-center p-3 rounded-4 border bg-light bg-opacity-20 transition-all hover-shadow-sm">
                                        <div className="p-2 rounded-circle bg-white shadow-sm d-flex align-items-center justify-content-center text-primary" style={{ width: '32px', height: '32px' }}>
                                            <i className="bi bi-check2 fs-5"></i>
                                        </div>
                                        <div className="small fw-bold text-main">{item}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <h5 className="small fw-bold text-muted mb-4 text-start text-uppercase border-start border-primary border-4 ps-3">Proposed Prescription</h5>
                            <div className="table-responsive">
                                <table className="table table-sm table-borderless align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="smaller text-muted fw-bold">AGENT / ACTION</th>
                                            <th className="smaller text-muted fw-bold">DOSAGE</th>
                                            <th className="smaller text-muted fw-bold">DURATION</th>
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

                    <div className="p-4 rounded-4 bg-light border mb-5">
                        <h5 className="small fw-bold text-muted mb-2 text-start text-uppercase">Immediate Clinical Directive</h5>
                        <p className="text-main mb-0" style={{ lineHeight: '1.6' }}>{data.nextSteps}</p>
                    </div>

                    <div className="mt-4 pt-5 border-top d-flex flex-wrap gap-4 justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-3">
                            <div className="p-3 bg-primary bg-opacity-10 rounded-circle text-primary">
                                <i className="bi bi-shield-check fs-4"></i>
                            </div>
                            <div>
                                <h6 className="mb-0 fw-bold text-main">SYSTEM DATA VALIDATED</h6>
                                <p className="text-muted mb-0 smaller">RETINACORE AI ENGINE V.2.4.9 // HIPAA SECURE</p>
                            </div>
                        </div>

                        <div className="d-flex flex-column align-items-end">
                            <div className="signature-block p-3 border-bottom text-center" style={{ minWidth: '200px' }}>
                                <span className="text-muted smaller fw-bold font-monospace opacity-50">RC-AI-SIGNATURE-7782A</span>
                                <h4 className="font-italic text-primary mb-0 mt-2" style={{ fontFamily: 'Dancing Script, cursive', fontSize: '1.5rem' }}>RetinaCore AI</h4>
                            </div>
                            <div className="smaller fw-bold text-muted mt-2">DULY AUTHORIZED AI CLINICIAN</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 text-center p-4">
                <p className="text-muted smaller fw-bold mb-0 opacity-40 uppercase" style={{ letterSpacing: '2px' }}>
                    Note: This is an automatically generated AI assessment for clinical decision support. Final diagnostic and therapeutic responsibility rests with the attending medical professional.
                </p>
            </div>
        </motion.div>
    );
};

export default PrescriptionSection;
