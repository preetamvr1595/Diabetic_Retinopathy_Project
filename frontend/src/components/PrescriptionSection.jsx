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
                    title: 'Doctor Prescription & Clinical Recommendations',
                    summary: [
                        'Detected condition: No Apparent Diabetic Retinopathy',
                        'Visible retinal markers: No microaneurysms, hemorrhages, or exudates detected.',
                        'Note: These findings are AI-assisted and require clinical confirmation.'
                    ],
                    diagnosticActions: [
                        'Baseline fundus photography for future comparison.',
                        'Check systemic HbA1c and lipid profile.',
                        'Standard intraocular pressure (IOP) measurement.'
                    ],
                    treatmentSuggestions: [
                        'No ocular treatment required at this stage.',
                        'Optimize metabolic control to maintain current state.',
                        'Patient education on diabetic ocular hygiene.'
                    ],
                    followUp: 'Suggested follow-up interval: 12 months for routine screening.',
                    disclaimer: 'This prescription is an AI-assisted decision support output. It is intended to assist medical professionals and does NOT replace professional medical judgment.'
                },
                patient: {
                    title: 'Patient Guidance & Next Steps',
                    resultMeaning: 'The AI scan shows no signs of Diabetic Retinopathy. This is great news! Your eyes currently appear healthy and unaffected by diabetes.',
                    nowActions: [
                        'Continue regular check-ups with your doctor.',
                        'Keep a record of this report for your healthcare provider.',
                        'Follow your current treatment plan for managing diabetes.'
                    ],
                    lifestyle: [
                        'Manage Blood Sugar: Stay within your target range.',
                        'Healthy Diet: Maintain a balanced, low-sugar diet.',
                        'Stay Active: Regular exercise helps control blood sugar.',
                        'Avoid Smoking: Smoking can increase the risk of complications.'
                    ],
                    eyeCare: [
                        'Do not skip routine eye exams even if your vision feels fine.',
                        'Wear sunglasses to protect your eyes from UV rays.',
                        'Take breaks if you spend a lot of time on screens.'
                    ],
                    reassurance: 'Stay positive! By maintaining good control of your health now, you are taking the best steps to protect your vision for the future.',
                    disclaimer: 'This information is for educational purposes only and is intended to support your conversation with your doctor. It is not a final diagnosis.'
                }
            },
            'Mild_DR': {
                doctor: {
                    title: 'Doctor Prescription & Clinical Recommendations',
                    summary: [
                        'Detected condition: Mild Non-Proliferative Diabetic Retinopathy (NPDR)',
                        'Visible retinal markers: Isolated microaneurysms detected in peripheral retina.',
                        'Note: Findings suggest early-stage microvascular changes.'
                    ],
                    diagnosticActions: [
                        'High-resolution fundus photography.',
                        'Optical Coherence Tomography (OCT) to rule out early macular thickening.',
                        'Review blood pressure and glycemic stability.'
                    ],
                    treatmentSuggestions: [
                        'Tighten systemic metabolic control (HbA1c target < 7.0%).',
                        'Monitoring for progression; no immediate laser/injection indicated.',
                        'Control hypertension and dyslipidemia.'
                    ],
                    followUp: 'Suggested follow-up interval: 6-9 months for monitoring.',
                    disclaimer: 'This prescription is an AI-assisted decision support output. It is intended to assist medical professionals and does NOT replace professional medical judgment.'
                },
                patient: {
                    title: 'Patient Guidance & Next Steps',
                    resultMeaning: 'The AI scan suggests early signs of Mild Diabetic Retinopathy. This means diabetes is starting to cause very small changes in the blood vessels of your eyes.',
                    nowActions: [
                        'Schedule a follow-up visit with your eye doctor (Ophthalmologist).',
                        'Share this report with your primary care physician.',
                        'Focus on stabilizing your blood sugar levels.'
                    ],
                    lifestyle: [
                        'Manage Blood Sugar: Work with your doctor to reach your targets.',
                        'Healthy Diet: Focus on fiber-rich, low-GI foods.',
                        'Monitor BP: Keep your blood pressure within a healthy range.',
                        'Avoid Smoking: Crucial for preventing further vascular damage.'
                    ],
                    eyeCare: [
                        'Be consistent with your eye exams.',
                        'Report any new floaters or blurry vision immediately.',
                        'Give your eyes frequent breaks during the day.'
                    ],
                    reassurance: 'Don\'t worry, this stage is very manageable. Early detection allows you to take action now to keep your vision clear.',
                    disclaimer: 'This information is for educational purposes only and is intended to support your conversation with your doctor. It is not a final diagnosis.'
                }
            },
            'Moderate_DR': {
                doctor: {
                    title: 'Doctor Prescription & Clinical Recommendations',
                    summary: [
                        'Detected condition: Moderate Non-Proliferative Diabetic Retinopathy',
                        'Visible retinal markers: Multiple microaneurysms, hemorrhages, and intraretinal microvascular abnormalities (IRMA).',
                        'Note: Increased risk of progression to proliferative stage.'
                    ],
                    diagnosticActions: [
                        'Urgent OCT Macular scan.',
                        'Wide-field fundus photography.',
                        'Fluorescein Angiography (FA) to assess areas of non-perfusion.'
                    ],
                    treatmentSuggestions: [
                        'Intensive systemic management.',
                        'Consider intravitreal Anti-VEGF if macular edema is present.',
                        'Patient counseling on the risks of vision loss.'
                    ],
                    followUp: 'Suggested follow-up interval: 3-4 months for close monitoring.',
                    disclaimer: 'This prescription is an AI-assisted decision support output. It is intended to assist medical professionals and does NOT replace professional medical judgment.'
                },
                patient: {
                    title: 'Patient Guidance & Next Steps',
                    resultMeaning: 'The AI scan suggests signs of Moderate Diabetic Retinopathy. This indicates more significant changes in the blood vessels of your eyes that need closer attention.',
                    nowActions: [
                        'See an eye specialist soon for a detailed examination.',
                        'Ensure your diabetes management team receives this report.',
                        'Be extra diligent about following your medication schedule.'
                    ],
                    lifestyle: [
                        'Strict Glucose Control: This is the most important step now.',
                        'Routine Exercise: Consistent physical activity helps vascular health.',
                        'BP & Cholesterol: Work with your doctor to optimize these.',
                        'No Smoking: Avoid all tobacco to protect your retina.'
                    ],
                    eyeCare: [
                        'Attend all scheduled follow-up appointments.',
                        'Watch for sudden changes in vision (blurring, dark spots).',
                        'Use proper lighting for reading and close work.'
                    ],
                    reassurance: 'While this requires more focus, many effective treatments are available. Taking action now is key to protecting your eyesight.',
                    disclaimer: 'This information is for educational purposes only and is intended to support your conversation with your doctor. It is not a final diagnosis.'
                }
            },
            'Severe_DR': {
                doctor: {
                    title: 'Doctor Prescription & Clinical Recommendations',
                    summary: [
                        'Detected condition: Severe Diabetic Retinopathy / Proliferative (PDR)',
                        'Visible retinal markers: Widespread hemorrhages, venous beading, and signs of neovascularization.',
                        'Note: Critical risk for tractional retinal detachment and vitreous hemorrhage.'
                    ],
                    diagnosticActions: [
                        'Emergency Vitreoretinal consultation.',
                        'OCT and OCT-Angiography.',
                        'Assess for neovascularization of the disk (NVD) or elsewhere (NVE).'
                    ],
                    treatmentSuggestions: [
                        'Pan-retinal Photocoagulation (PRP) evaluation.',
                        'Immediate intravitreal Anti-VEGF injections.',
                        'Strict hypertensive control to reduce hemorrhage risk.'
                    ],
                    followUp: 'Suggested follow-up interval: Immediate / 1 month for monitoring.',
                    disclaimer: 'This prescription is an AI-assisted decision support output. It is intended to assist medical professionals and does NOT replace professional medical judgment.'
                },
                patient: {
                    title: 'Patient Guidance & Next Steps',
                    resultMeaning: 'The AI scan suggests signs of Severe Diabetic Retinopathy. This means diabetes may be starting to affect the small blood vessels in your eyes significantly, posing a high risk to your vision.',
                    nowActions: [
                        'Schedule an emergency visit with an eye doctor (Ophthalmologist).',
                        'Keep this report and share it with your primary healthcare provider.',
                        'Follow the recommended schedule for regular eye check-ups strictly.'
                    ],
                    lifestyle: [
                        'Manage Blood Sugar: Work with your doctor to keep levels within target range.',
                        'Healthy Diet: Follow a balanced, diabetes-friendly diet (low sugar, high fiber).',
                        'Stay Active: Regular physical activity helps control blood sugar and pressure.',
                        'Avoid Smoking: Smoking increases the risk of eye complications.'
                    ],
                    eyeCare: [
                        'Do not skip routine eye exams even if your vision feels fine.',
                        'Report any new floaters, blurriness, or vision changes to your doctor immediately.',
                        'Take breaks during screen time to reduce eye strain.'
                    ],
                    reassurance: 'Please stay calm and positive. Advanced diabetic retinopathy is manageable. By taking the right steps now—like managing your blood sugar and attending regular eye exams—you can protect your vision for years to come.',
                    disclaimer: 'This information is for educational purposes only and is intended to support your conversation with your doctor. It is not a final diagnosis or a substitute for professional medical advice.'
                }
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
            {/* Toggle Navigation */}
            <div className="d-flex justify-content-center gap-3 mb-5">
                <button
                    className={`btn-med ${view === 'doctor' ? 'btn-med-primary' : 'btn-med-outline'} px-4 py-2 flex-grow-1`}
                    onClick={() => setView('doctor')}
                    style={{ minWidth: '200px', fontSize: '0.9rem' }}
                >
                    <i className="bi bi-file-medical me-2"></i>
                    DOCTOR PRESCRIPTION
                </button>
                <button
                    className={`btn-med ${view === 'patient' ? 'btn-med-pink' : 'btn-med-outline'} px-4 py-2 flex-grow-1`}
                    onClick={() => setView('patient')}
                    style={{ minWidth: '200px', fontSize: '0.9rem' }}
                >
                    <i className="bi bi-person-check me-2"></i>
                    PATIENT GUIDANCE
                </button>
            </div>

            <AnimatePresence mode="wait">
                {view === 'doctor' ? (
                    <motion.div
                        key="doctor"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="med-card p-0 overflow-hidden shadow-lg border-0 bg-white"
                        style={{ borderTop: '6px solid var(--med-primary)' }}
                    >
                        <div className="p-4 bg-light border-bottom d-flex justify-content-between align-items-center">
                            <h3 className="mb-0 fw-bold h5 text-main">{data.doctor.title}</h3>
                            <div className="text-end">
                                <div className="smaller fw-bold text-muted mb-0">AI CONFIDENCE</div>
                                <div className="small fw-bold text-primary">{diagConfidence}%</div>
                            </div>
                        </div>

                        <div className="p-5">
                            {/* Summary */}
                            <div className="mb-5">
                                <h6 className="smaller fw-bold text-primary text-uppercase mb-3">1. Clinical Assessment Summary</h6>
                                <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                                    {data.doctor.summary.map((item, i) => (
                                        <li key={i} className="small text-main d-flex gap-2">
                                            <span className="text-primary">•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Actions */}
                            <div className="mb-5">
                                <h6 className="smaller fw-bold text-primary text-uppercase mb-3">2. Recommended Diagnostic Actions</h6>
                                <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                                    {data.doctor.diagnosticActions.map((item, i) => (
                                        <li key={i} className="small text-main d-flex gap-2">
                                            <span className="text-primary">•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Treatment */}
                            <div className="mb-5">
                                <h6 className="smaller fw-bold text-primary text-uppercase mb-3">3. Treatment & Management Suggestions</h6>
                                <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                                    {data.doctor.treatmentSuggestions.map((item, i) => (
                                        <li key={i} className="small text-main d-flex gap-2">
                                            <span className="text-primary">•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Follow Up */}
                            <div className="mb-5">
                                <h6 className="smaller fw-bold text-primary text-uppercase mb-3">4. Follow-Up Schedule</h6>
                                <div className="p-3 rounded-3 bg-light border-start border-primary border-4">
                                    <p className="small text-main mb-0">{data.doctor.followUp}</p>
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <div className="p-4 rounded-4 bg-light small text-muted border">
                                <span className="fw-bold text-danger text-uppercase d-block mb-1">Clinical Disclaimer (Mandatory)</span>
                                {data.doctor.disclaimer}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="patient"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="med-card p-0 overflow-hidden shadow-lg border-0 bg-white"
                        style={{ borderTop: '6px solid #e91e63' }}
                    >
                        <div className="p-4 border-bottom" style={{ backgroundColor: '#fff5f8' }}>
                            <h3 className="mb-0 fw-bold h5" style={{ color: '#e91e63' }}>{data.patient.title}</h3>
                        </div>

                        <div className="p-5">
                            {/* Meaning */}
                            <div className="mb-5">
                                <h6 className="smaller fw-bold text-uppercase mb-3" style={{ color: '#e91e63' }}>1. What This Result Means</h6>
                                <p className="small text-main" style={{ lineHeight: '1.6' }}>{data.patient.resultMeaning}</p>
                            </div>

                            {/* Now Actions */}
                            <div className="mb-5">
                                <h6 className="smaller fw-bold text-uppercase mb-3" style={{ color: '#e91e63' }}>2. What You Should Do Now</h6>
                                <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                                    {data.patient.nowActions.map((item, i) => (
                                        <li key={i} className="small text-main d-flex gap-2">
                                            <span style={{ color: '#e91e63' }}>•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Lifestyle */}
                            <div className="mb-5">
                                <h6 className="smaller fw-bold text-uppercase mb-3" style={{ color: '#e91e63' }}>3. Lifestyle & Health Recommendations</h6>
                                <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                                    {data.patient.lifestyle.map((item, i) => (
                                        <li key={i} className="small text-main d-flex gap-2">
                                            <span style={{ color: '#e91e63' }}>•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Eye Care */}
                            <div className="mb-5">
                                <h6 className="smaller fw-bold text-uppercase mb-3" style={{ color: '#e91e63' }}>4. Eye Care Tips</h6>
                                <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                                    {data.patient.eyeCare.map((item, i) => (
                                        <li key={i} className="small text-main d-flex gap-2">
                                            <span style={{ color: '#e91e63' }}>•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Reassurance */}
                            <div className="mb-5">
                                <h6 className="smaller fw-bold text-uppercase mb-3" style={{ color: '#2e7d32' }}>5. Reassurance Message</h6>
                                <p className="small text-main fst-italic" style={{ lineHeight: '1.6' }}>{data.patient.reassurance}</p>
                            </div>

                            {/* Disclaimer */}
                            <div className="p-4 rounded-4 bg-light small text-muted border">
                                <span className="fw-bold text-uppercase d-block mb-1" style={{ color: '#e91e63' }}>Patient Disclaimer</span>
                                {data.patient.disclaimer}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-5 text-center p-4">
                <p className="text-muted smaller fw-bold mb-0 opacity-40 uppercase" style={{ letterSpacing: '2px' }}>
                    Note: This is an automatically generated AI assessment for clinical decision support.
                </p>
            </div>
        </motion.div>
    );
};

export default PrescriptionSection;
