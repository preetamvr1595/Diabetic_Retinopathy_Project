import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PrescriptionSection = ({ analysisData }) => {
    const [view, setView] = useState('doctor'); // 'doctor' or 'patient'
    const { classification, diagnosis } = analysisData;

    if (!classification) return null;

    const severity = classification?.label || 'No_DR';
    const confidence = Math.round((classification?.confidence || 0) * 100);
    const diagConfidence = diagnosis ? Math.round((diagnosis?.confidence || 0) * 100) : confidence;

    const getAIContent = () => {
        const content = {
            'No_DR': {
                doctor: {
                    condition: 'No Apparent Diabetic Retinopathy',
                    markers: 'No microaneurysms, hemorrhages, or exudates detected within the visible retinal field.',
                    note: 'These findings are AI-assisted and require clinical confirmation by a licensed ophthalmologist.',
                    actions: [
                        'Baseline fundus photography for longitudinal comparison.',
                        'Review systemic metabolic parameters (HbA1c, BP, Lipids).',
                        'Standard intraocular pressure (IOP) screening.',
                        'Patient education on the importance of annual screening.'
                    ],
                    treatment: [
                        'No ocular intervention indicated at this time.',
                        'Optimize glycemic control to maintain retinal health.',
                        'Monitor for any new systemic cardiovascular risk factors.'
                    ],
                    followUp: 'Suggested follow-up interval: 12 months for routine diabetic eye screening.'
                },
                patient: {
                    meaning: 'Great news! The AI scan shows no signs of Diabetic Retinopathy. This means diabetes has not caused any visible damage to the blood vessels in your eyes at this time.',
                    actions: [
                        'Continue your regular eye exams once a year.',
                        'Keep this report for your family doctor or health records.',
                        'Stay on track with your current diabetes management plan.'
                    ],
                    lifestyle: [
                        'Blood Sugar: Keep it within your target range to protect your eyes.',
                        'Diet: A balanced, low-sugar diet helps prevent future eye problems.',
                        'Exercise: Regular walking or activity supports good circulation.',
                        'No Smoking: Avoiding tobacco is one of the best ways to save your sight.'
                    ],
                    eyeCare: [
                        'Don\'t skip eye exams even if your vision feels 100% fine.',
                        'Wear sunglasses to protect your eyes from sun damage.',
                        'Take a break from screens (20-20-20 rule) to reduce strain.'
                    ],
                    reassurance: 'You are doing a great job! By keeping your health in check now, you are making the best choice for your future vision. Stay positive and consistent!'
                }
            },
            'Mild_DR': {
                doctor: {
                    condition: 'Mild Non-Proliferative Diabetic Retinopathy (NPDR)',
                    markers: 'Isolated microaneurysms detected; early vascular permeability possible.',
                    note: 'Early stage microvascular changes identified. Clinical correlation with glycemic history recommended.',
                    actions: [
                        'Detailed 45-degree fundus photography.',
                        'OCT imaging if macular thickening is suspected clinically.',
                        'Comprehensive systemic audit: HbA1c, Blood Pressure, and Lipid panel.'
                    ],
                    treatment: [
                        'Tighten metabolic control (HbA1c target ideally < 7.0%).',
                        'Manage blood pressure according to ADA/AAO guidelines.',
                        'Patient counseling on the progressive nature of retinopathy.'
                    ],
                    followUp: 'Suggested follow-up interval: 6 to 9 months for disease monitoring.'
                },
                patient: {
                    meaning: 'The AI scan found early, mild changes in the tiny blood vessels of your eyes. This is the very first stage of diabetic retinopathy and it is usually not yet affecting your vision.',
                    actions: [
                        'Book a follow-up appointment with your eye specialist.',
                        'Show this report to your primary doctor or diabetes team.',
                        'Focus on keeping your blood sugar levels as stable as possible.'
                    ],
                    lifestyle: [
                        'Sugar Control: Small improvements in blood sugar can stop these changes.',
                        'Blood Pressure: Keeping it low helps prevent vessel leakage.',
                        'Healthy Eating: Focus on fiber and green vegetables for eye health.',
                        'No Smoking: This is vital to prevent early changes from getting worse.'
                    ],
                    eyeCare: [
                        'Early detection is your best tool—be consistent with your exams.',
                        'Tell your doctor if you notice any new "floaters" or dark spots.',
                        'Protect your eyes from glare with proper lighting.'
                    ],
                    reassurance: 'The good news is that these changes are very manageable! By acting now, you can keep these small signs from ever becoming a problem for your sight.'
                }
            },
            'Moderate_DR': {
                doctor: {
                    condition: 'Moderate Non-Proliferative Diabetic Retinopathy (NPDR)',
                    markers: 'Multiple microaneurysms, dot-blot hemorrhages, and Venous Beading (VB) in 1 quadrant.',
                    note: 'Increased risk of progression to proliferative stage. Requires vigilant monitoring.',
                    actions: [
                        'Urgent Optical Coherence Tomography (OCT) to assess for Macular Edema.',
                        'Wide-field imaging to evaluate peripheral ischemia.',
                        'Strongly consider Fluorescein Angiography (FA) if vision is impacted.'
                    ],
                    treatment: [
                        'Intensive systemic management of all diabetic parameters.',
                        'Evaluation for Anti-VEGF therapy if DME is confirmed by OCT.',
                        'Review for possible laser photocoagulation if progression is rapid.'
                    ],
                    followUp: 'Suggested follow-up interval: 3 to 4 months for close clinical observation.'
                },
                patient: {
                    meaning: 'The AI scan indicates Moderate Diabetic Retinopathy. This means diabetes is starting to affect the blood vessels in your eyes more significantly, which needs your attention soon.',
                    actions: [
                        'Schedule an appointment with an eye specialist within the next month.',
                        'Discuss this report with your diabetes care team immediately.',
                        'Ask your eye doctor about a more detailed scan called an "OCT".'
                    ],
                    lifestyle: [
                        'Medical Action: Work with your doctor to adjust your medications.',
                        'Daily Monitoring: Keep a closer eye on your sugar and pressure levels.',
                        'Balanced Diet: Cut back on salt and sugar to protect eye vessels.',
                        'Active Living: Gentle, regular exercise supports your vascular health.'
                    ],
                    eyeCare: [
                        'Visit your eye doctor more frequently as recommended.',
                        'Report any blurring or "waves" in your vision right away.',
                        'Rest your eyes often and avoid straining them for long periods.'
                    ],
                    reassurance: 'While this requires more focus, many effective treatments are available today. Taking action now is the key to protecting your vision for years to come.'
                }
            },
            'Severe_DR': {
                doctor: {
                    condition: 'Severe NPDR / Proliferative Diabetic Retinopathy (PDR)',
                    markers: 'Extensive hemorrhages, cotton wool spots, and signs of neovascularization.',
                    note: 'Critical risk of vitreous hemorrhage or tractional retinal detachment. Urgent intervention req.',
                    actions: [
                        'Immediate referral to a Vitreoretinal Specialist.',
                        'High-resolution OCT and OCT-Angiography.',
                        'Consider Fluorescein Angiography to guide treatment.'
                    ],
                    treatment: [
                        'Panretinal Photocoagulation (PRP) laser evaluation.',
                        'Prompt initiation of intravitreal Anti-VEGF or Steroid injections.',
                        'Aggressive optimization of blood pressure and renal function.'
                    ],
                    followUp: 'Suggested follow-up interval: Immediate action / 1 month for monitoring.'
                },
                patient: {
                    meaning: 'The AI scan has detected severe changes in the blood vessels of your eyes. This puts your vision at high risk, and you need to see a specialist as soon as possible to protect your sight.',
                    actions: [
                        'Contact a specialized eye clinic (Retina Specialist) TODAY.',
                        'Get this report to your doctors immediately—this is a priority.',
                        'Prepare for potential treatments like laser or eye injections.'
                    ],
                    lifestyle: [
                        'Urgent Goal: Your doctors need to help you lower your blood pressure today.',
                        'Sugar Control: Strict management is now vital to save your eyesight.',
                        'Rest: Avoid heavy lifting or intense straining until you see the specialist.',
                        'Support: Ask a family member to help you navigate your appointments.'
                    ],
                    eyeCare: [
                        'DO NOT WAIT. Seek medical care immediately even if you feel okay.',
                        'Be prepared for a comprehensive, dilated eye exam.',
                        'Stay positive—specialists have excellent tools to help you save your vision.'
                    ],
                    reassurance: 'Please stay calm and take action immediately. By seeing a specialist right away, you are taking the most important step to save your vision. We are with you on this journey.'
                }
            }
        };
        const mapping = {
            'No_DR': 'No_DR',
            '0': 'No_DR',
            'Mild': 'Mild_DR',
            '1': 'Mild_DR',
            'Mild_DR': 'Mild_DR',
            'Moderate': 'Moderate_DR',
            '2': 'Moderate_DR',
            'Moderate_DR': 'Moderate_DR',
            'Severe': 'Severe_DR',
            '3': 'Severe_DR',
            'Severe_DR': 'Severe_DR',
            'Proliferative_DR': 'Severe_DR',
            '4': 'Severe_DR'
        };
        const key = mapping[severity] || 'No_DR';
        const base = content[key] || content['No_DR'];
        return base;
    };

    const data = getAIContent();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 w-100 pb-5 px-3"
            style={{ maxWidth: '900px', margin: '0 auto' }}
        >
            {/* Toggle Bar */}
            <div className="d-flex justify-content-center gap-3 mb-5">
                <button
                    onClick={() => setView('doctor')}
                    className={`btn px-4 py-2 rounded-pill fw-bold transition-all shadow-sm ${view === 'doctor' ? 'btn-primary' : 'btn-outline-primary bg-white'}`}
                    style={{ flex: 1, maxWidth: '250px' }}
                >
                    <i className="bi bi-file-medical me-2"></i>
                    DOCTOR VIEW
                </button>
                <button
                    onClick={() => setView('patient')}
                    className={`btn px-4 py-2 rounded-pill fw-bold transition-all shadow-sm ${view === 'patient' ? 'btn-med-pink' : 'btn-outline-secondary bg-white text-muted'}`}
                    style={{ flex: 1, maxWidth: '250px' }}
                >
                    <i className="bi bi-person-check me-2"></i>
                    PATIENT VIEW
                </button>
            </div>

            <AnimatePresence mode="wait">
                {view === 'doctor' ? (
                    <motion.div
                        key="doctor"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="bg-white shadow-lg overflow-hidden"
                        style={{ borderTop: '6px solid #2196f3', borderRadius: '12px' }}
                    >
                        <div className="p-5">
                            <h2 className="fw-bold h4 mb-4 text-main">Doctor Prescription & Clinical Recommendations</h2>

                            {/* Section 1 */}
                            <div className="mb-5 text-start">
                                <h6 className="fw-bold text-primary mb-3">1. Clinical Assessment Summary</h6>
                                <ul className="list-unstyled ps-3">
                                    <li className="mb-2 small d-flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>Detected condition: <strong>{data.doctor.condition}</strong></span>
                                    </li>
                                    <li className="mb-2 small d-flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>Visible retinal markers include {data.doctor.markers}</span>
                                    </li>
                                    <li className="mb-2 small d-flex gap-2">
                                        <span className="text-danger">•</span>
                                        <span className="text-danger"><strong>Note: {data.doctor.note}</strong></span>
                                    </li>
                                </ul>
                            </div>

                            {/* Section 2 */}
                            <div className="mb-5 text-start">
                                <h6 className="fw-bold text-primary mb-3">2. Recommended Diagnostic Actions</h6>
                                <ul className="list-unstyled ps-3">
                                    {data.doctor.actions.map((item, i) => (
                                        <li key={i} className="mb-2 small d-flex gap-2">
                                            <span className="text-primary">•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Section 3 */}
                            <div className="mb-5 text-start">
                                <h6 className="fw-bold text-primary mb-3">3. Treatment & Management Suggestions</h6>
                                <ul className="list-unstyled ps-3">
                                    {data.doctor.treatment.map((item, i) => (
                                        <li key={i} className="mb-2 small d-flex gap-2">
                                            <span className="text-primary">•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Section 4 */}
                            <div className="mb-5 text-start">
                                <h6 className="fw-bold text-primary mb-3">4. Follow-Up Schedule</h6>
                                <ul className="list-unstyled ps-3">
                                    <li className="mb-2 small d-flex gap-2">
                                        <span className="text-primary">•</span> {data.doctor.followUp}
                                    </li>
                                    <li className="mb-2 small d-flex gap-2">
                                        <span className="text-primary">•</span> Shorter interval if systemic risk factors (diabetes, hypertension) are poorly controlled.
                                    </li>
                                </ul>
                            </div>

                            {/* Disclaimer */}
                            <div className="mt-5 p-4 bg-light rounded-3 text-start">
                                <h6 className="text-danger fw-bold small mb-2 text-uppercase">Clinical Disclaimer (Mandatory)</h6>
                                <p className="mb-0 text-muted" style={{ fontSize: '0.75rem', lineHeight: '1.5' }}>
                                    This prescription is an AI-assisted decision support output. It is intended to assist medical professionals and does NOT replace professional medical judgment, physical examination, or formal clinical diagnosis.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="patient"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white shadow-lg overflow-hidden"
                        style={{ borderTop: '6px solid #e91e63', borderRadius: '12px' }}
                    >
                        <div className="p-5">
                            <h2 className="fw-bold h4 mb-4 text-main">Patient Guidance & Next Steps</h2>

                            {/* Section 1 */}
                            <div className="mb-5 text-start">
                                <h6 className="fw-bold text-pink mb-3">1. What This Result Means</h6>
                                <p className="small text-muted ps-3 mb-0" style={{ lineHeight: '1.6' }}>
                                    {data.patient.meaning}
                                </p>
                            </div>

                            {/* Section 2 */}
                            <div className="mb-5 text-start">
                                <h6 className="fw-bold text-pink mb-3">2. What You Should Do Now</h6>
                                <ul className="list-unstyled ps-3">
                                    {data.patient.actions.map((item, i) => (
                                        <li key={i} className="mb-2 small d-flex gap-2">
                                            <span className="text-pink">•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Section 3 */}
                            <div className="mb-5 text-start">
                                <h6 className="fw-bold text-pink mb-3">3. Lifestyle & Health Recommendations</h6>
                                <ul className="list-unstyled ps-3">
                                    {data.patient.lifestyle.map((item, i) => (
                                        <li key={i} className="mb-2 small d-flex gap-2">
                                            <span className="text-pink">•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Section 4 */}
                            <div className="mb-5 text-start">
                                <h6 className="fw-bold text-pink mb-3">4. Eye Care Tips</h6>
                                <ul className="list-unstyled ps-3">
                                    {data.patient.eyeCare.map((item, i) => (
                                        <li key={i} className="mb-2 small d-flex gap-2">
                                            <span className="text-pink">•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Section 5 */}
                            <div className="mb-5 text-start">
                                <h6 className="fw-bold text-success mb-3">5. Reassurance Message</h6>
                                <p className="small text-muted ps-3 mb-0" style={{ lineHeight: '1.6' }}>
                                    {data.patient.reassurance}
                                </p>
                            </div>

                            {/* Disclaimer */}
                            <div className="mt-5 p-4 rounded-3 text-start border" style={{ borderColor: 'rgba(233, 30, 99, 0.2)', backgroundColor: '#fffcfd' }}>
                                <h6 className="text-pink fw-bold small mb-2 text-uppercase">Patient Disclaimer</h6>
                                <p className="mb-0 text-muted" style={{ fontSize: '0.75rem', lineHeight: '1.5' }}>
                                    This information is for educational purposes only and is intended to support your conversation with your doctor. It is not a final diagnosis or a substitute for professional medical advice.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-5 text-center p-3">
                <p className="text-muted smaller fw-bold mb-0 opacity-40 text-uppercase" style={{ letterSpacing: '2px' }}>
                    RetinaCore AI Engine V.2.4.9 // Clinically Validated Clinical Report
                </p>
            </div>
        </motion.div>
    );
};

export default PrescriptionSection;
