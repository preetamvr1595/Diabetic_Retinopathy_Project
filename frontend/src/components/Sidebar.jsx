import React from 'react';

const Sidebar = ({ currentStep, onReset }) => {
    const steps = [
        { id: 1, label: 'ACQUISITION', icon: 'bi-camera' },
        { id: 2, label: 'ENHANCEMENT', icon: 'bi-sliders' },
        { id: 3, label: 'SEGMENTATION', icon: 'bi-diagram-3' },
        { id: 4, label: 'DIAGNOSIS', icon: 'bi-heart-pulse' },
        { id: 5, label: 'SEVERITY', icon: 'bi-bar-chart' },
        { id: 6, label: 'FINAL REPORT', icon: 'bi-file-earmark-medical' }
    ];

    return (
        <aside className="sidebar-container d-flex flex-column shadow-sm">
            <div className="px-4 mb-5 pb-3 border-bottom border-light">
                <div className="d-flex align-items-center gap-3">
                    <div className="bg-primary bg-opacity-10 p-2 rounded-3 text-primary">
                        <i className="bi bi-eye-fill fs-3"></i>
                    </div>
                    <div>
                        <h4 className="med-title h5 mb-0">RETINACORE</h4>
                        <span className="med-label" style={{ fontSize: '0.6rem' }}>Clinical Analysis Hub</span>
                    </div>
                </div>
            </div>

            <nav className="flex-grow-1">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className={`nav-item-med ${currentStep === step.id ? 'active' : ''}`}
                    >
                        <i className={`bi ${currentStep > step.id ? 'bi-check-circle-fill text-success' : step.icon} fs-5`}></i>
                        <span style={{ fontSize: '0.9rem' }}>{step.label}</span>
                    </div>
                ))}
            </nav>

            <div className="mt-auto px-4 pb-4">
                <button
                    onClick={onReset}
                    className="btn btn-medical-outline w-100 py-3"
                    style={{ fontSize: '0.8rem' }}
                >
                    <i className="bi bi-plus-lg me-2"></i>
                    NEW SCAN
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
