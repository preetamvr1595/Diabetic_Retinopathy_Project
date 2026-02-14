import React from 'react';

const TopBar = ({ currentStep, onLogout, onNavigate, user }) => {
    const steps = [
        { id: 1, label: 'Upload' },
        { id: 2, label: 'Filter' },
        { id: 3, label: 'Segment' },
        { id: 4, label: 'Diagnose' },
        { id: 5, label: 'Classify' }
    ];

    return (
        <header className="med-navbar">
            <div className="navbar-brand">
                <div className="p-2 rounded-circle bg-primary bg-opacity-10">
                    <i className="bi bi-activity h4 mb-0 text-primary"></i>
                </div>
                <span>RETINACORE <span className="fw-light opacity-50">CLINICAL</span></span>
            </div>

            <nav className="step-stepper d-none d-lg-flex">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className="d-flex align-items-center gap-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => onNavigate(step.id)}
                    >
                        <div className={`step-bubble ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}>
                            {currentStep > step.id ? <i className="bi bi-check-lg"></i> : step.id}
                        </div>
                        <span className={`small fw-bold ${currentStep === step.id ? 'text-primary' : 'text-muted'}`}>
                            {step.label}
                        </span>
                        {step.id < 5 && <div style={{ width: '20px', height: '2px', background: 'var(--med-border)' }}></div>}
                    </div>
                ))}
            </nav>

            <div className="d-flex align-items-center gap-3">
                <div className="d-none d-md-block text-end">
                    <div className="small fw-800 text-main uppercase tracking-tighter">{user?.name || 'Authorized User'}</div>
                    <div className="smaller text-muted opacity-50" style={{ fontSize: '10px' }}>{user?.email || 'CLINICAL ACCOUNT'}</div>
                </div>
                <button className="btn-med btn-med-outline" onClick={onLogout}>
                    <i className="bi bi-box-arrow-right"></i>
                    LOGOUT
                </button>
            </div>
        </header>
    );
};

export default TopBar;
