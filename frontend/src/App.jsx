import React, { useState } from 'react';
import UploadStep from './components/UploadStep';
import FilterStep from './components/FilterStep';
import SegmentationStep from './components/SegmentationStep';
import DiagnosisStep from './components/DiagnosisStep';
import ClassificationStep from './components/ClassificationStep';
import Chatbot from './components/Chatbot';
import PrescriptionSection from './components/PrescriptionSection';
import Login from './components/Login';
import TopBar from './components/TopBar';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [step, setStep] = useState(1);
    const [imageId, setImageId] = useState(null);
    const [analysisData, setAnalysisData] = useState({
        filters: null,
        segmentation: null,
        diagnosis: null,
        classification: null
    });

    const nextStep = () => setStep(s => Math.min(s + 1, 6));
    const setStepManually = (s) => setStep(s);

    const reset = () => {
        setStep(1);
        setImageId(null);
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

    if (!isAuthenticated) {
        return <Login onLogin={() => setIsAuthenticated(true)} />;
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return <UploadStep onUpload={(id) => { setImageId(id); nextStep(); }} />;
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
                    <div className="animate-fade-in text-center pb-5">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="med-card p-5 border-0 shadow-lg bg-white mb-4"
                        >
                            <div className="mb-4 d-inline-flex p-4 rounded-circle bg-primary bg-opacity-10 text-primary">
                                <i className="bi bi-file-earmark-medical display-4"></i>
                            </div>
                            <h1 className="fw-bold h2 mb-2 text-main">CLINICAL ANALYSIS COMPLETE</h1>
                            <p className="text-muted mb-4 uppercase small fw-bold" style={{ letterSpacing: '2px' }}>
                                Retinal Diagnostic Chain Validated // Secure Clinical Report
                            </p>

                            <div className="d-flex justify-content-center gap-3">
                                <button className="btn-med btn-med-outline px-5 py-3" onClick={() => window.print()}>
                                    <i className="bi bi-printer me-2"></i>
                                    PRINT REPORT
                                </button>
                                <button className="btn-med btn-med-primary px-5 py-3 shadow-sm" onClick={reset}>
                                    <i className="bi bi-plus-lg me-2"></i>
                                    NEW CASE STUDY
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
        <div className="app-container">
            <TopBar
                currentStep={step}
                onLogout={() => setIsAuthenticated(false)}
                onNavigate={setStepManually}
            />

            <main className="main-content">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>
            </main>

            <Chatbot
                initialOpen={step === 6}
                analysisData={analysisData}
            />

            <footer className="py-4 text-center border-top border-light mt-auto">
                <p className="text-muted small mb-0">
                    &copy; 2026 RETINACORE CLINICAL SYSTEMS // HIPAA COMPLIANT // SECURE_SSL_AES256
                </p>
            </footer>
        </div>
    );
}

export default App;
