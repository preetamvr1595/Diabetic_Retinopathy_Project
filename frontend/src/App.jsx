import React, { useState } from 'react';
import UploadStep from './components/UploadStep';
import FilterStep from './components/FilterStep';
import SegmentationStep from './components/SegmentationStep';
import DiagnosisStep from './components/DiagnosisStep';
import ClassificationStep from './components/ClassificationStep';
import Chatbot from './components/Chatbot';
import PrescriptionSection from './components/PrescriptionSection';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
    const [step, setStep] = useState(1);
    const [imageId, setImageId] = useState(null);
    const [originalImage, setOriginalImage] = useState(null);
    const [analysisData, setAnalysisData] = useState({
        filters: null,
        segmentation: null,
        diagnosis: null,
        classification: null
    });

    const nextStep = () => setStep(s => Math.min(s + 1, 6));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));
    const reset = () => {
        setStep(1);
        setImageId(null);
        setOriginalImage(null);
        setAnalysisData({
            filters: null,
            segmentation: null,
            diagnosis: null,
            classification: null
        });
    }

    const updateAnalysis = (key, data) => {
        setAnalysisData(prev => ({ ...prev, [key]: data }));
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return <UploadStep onUpload={(id, img) => { setImageId(id); setOriginalImage(img); nextStep(); }} />;
            case 2:
                return <FilterStep imageId={imageId} onNext={(data) => { updateAnalysis('filters', data); nextStep(); }} />;
            case 3:
                return <SegmentationStep imageId={imageId} onNext={(data) => { updateAnalysis('segmentation', data); nextStep(); }} />;
            case 4:
                return <DiagnosisStep imageId={imageId} onNext={(data) => { updateAnalysis('diagnosis', data); nextStep(); }} />;
            case 5:
                return <ClassificationStep imageId={imageId} onNext={(data) => { updateAnalysis('classification', data); nextStep(); }} />;
            case 6:
                return (
                    <div className="text-center pb-5">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card p-5 rounded-4 shadow-lg mb-5 border-top border-5 border-primary"
                        >
                            <div className="mb-4 d-inline-flex p-4 rounded-circle bg-primary bg-opacity-10 text-primary shadow-sm">
                                <i className="bi bi-shield-check-fill display-3"></i>
                            </div>
                            <h2 className="text-dark fw-extrabold display-5 mb-4">Analysis Successfully Completed</h2>
                            <p className="lead text-muted-custom mb-5 px-md-5">
                                Our multi-stage AI diagnostic engine has finalized its evaluation of the Retinal Fundus image.
                                A comprehensive consensus has been reached between the <strong>Attention U-Net</strong> and <strong>VGG-16</strong> classification modules.
                            </p>
                            <div className="d-flex justify-content-center gap-4">
                                <button className="btn btn-premium btn-lg rounded-pill px-5 shadow-lg d-flex align-items-center gap-2" onClick={() => window.print()}>
                                    <i className="bi bi-file-earmark-pdf-fill"></i> Download Professional Report
                                </button>
                                <button className="btn btn-outline-dark btn-lg rounded-pill px-5 d-flex align-items-center gap-2" onClick={reset}>
                                    <i className="bi bi-arrow-counterclockwise"></i> Start New Analysis
                                </button>
                            </div>
                        </motion.div>

                        <PrescriptionSection analysisData={analysisData} />
                    </div>
                );
            default:
                return <UploadStep />;
        }
    }

    return (
        <div className="container py-5">
            <header className="text-center mb-5 pt-5">
                <h1 className="display-4 fw-bold text-dark">Diabetic Retinopathy <span className="highlight-text">Analysis</span></h1>
                <p className="lead text-muted-custom">Advanced AI-Powered Clinical Diagnostic Dashboard</p>
            </header>

            {/* Step Indicator */}
            <div className="step-indicator">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className={`step-dot ${step >= i ? 'active' : ''}`} />
                ))}
            </div>

            <AnimatePresence mode='wait'>
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderStep()}
                </motion.div>
            </AnimatePresence>

            {/* Global Chatbot */}
            {step > 1 && (
                <Chatbot
                    initialOpen={step === 6}
                    analysisData={analysisData}
                />
            )}
        </div>
    );
}

export default App;
