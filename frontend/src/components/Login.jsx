import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
    const [mode, setMode] = useState('login'); // 'login' or 'signup'
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        onLogin();
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center p-4" style={{ background: 'var(--med-bg)' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="med-card p-5 w-100 shadow-lg border-0"
                style={{ maxWidth: '480px', borderRadius: 'var(--radius-lg)' }}
            >
                {/* Brand Header */}
                <div className="text-center mb-5">
                    <div className="d-inline-flex p-3 rounded-circle bg-primary bg-opacity-10 mb-3">
                        <i className="bi bi-activity fs-1 text-primary"></i>
                    </div>
                    <h1 className="h3 mb-1 fw-bold">RETINACORE</h1>
                    <p className="text-muted small">Diagnostic Analysis Platform</p>
                </div>

                {/* Mode Toggle */}
                <div className="d-flex p-1 bg-light rounded-pill mb-5 border">
                    <button
                        className={`btn flex-grow-1 rounded-pill py-2 fw-bold small ${mode === 'login' ? 'bg-white shadow-sm text-primary' : 'text-muted'}`}
                        onClick={() => setMode('login')}
                    >
                        SIGN IN
                    </button>
                    <button
                        className={`btn flex-grow-1 rounded-pill py-2 fw-bold small ${mode === 'signup' ? 'bg-white shadow-sm text-pink' : 'text-muted'}`}
                        style={{ color: mode === 'signup' ? 'var(--med-secondary)' : '' }}
                        onClick={() => setMode('signup')}
                    >
                        CREATE ACCOUNT
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="animate-fade-in">
                    {mode === 'signup' && (
                        <div className="mb-4">
                            <label className="small fw-bold text-muted mb-2 d-block">FULL NAME</label>
                            <input type="text" className="med-input" placeholder="Dr. John Doe" required />
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="small fw-bold text-muted mb-2 d-block">EMAIL ADDRESS</label>
                        <input type="email" className="med-input" placeholder="clinician@hospital.org" required />
                    </div>

                    <div className="mb-4">
                        <label className="small fw-bold text-muted mb-2 d-block">PASSWORD</label>
                        <input type="password" className="med-input" placeholder="••••••••" required />
                    </div>

                    {mode === 'signup' && (
                        <div className="mb-5">
                            <label className="small fw-bold text-muted mb-2 d-block">CONFIRM PASSWORD</label>
                            <input type="password" className="med-input" placeholder="••••••••" required />
                        </div>
                    )}

                    <div className="mb-5">
                        <button
                            type="submit"
                            className={`btn-med w-100 py-3 justify-content-center ${mode === 'login' ? 'btn-med-primary' : 'btn-med-secondary'}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm" role="status"></span>
                                    <span>PROCESSING...</span>
                                </>
                            ) : (
                                mode === 'login' ? 'SIGN IN TO DASHBOARD' : 'CREATE CLINICIAN ACCOUNT'
                            )}
                        </button>
                    </div>
                </form>

                <div className="text-center pt-4 border-top">
                    <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                        <div className="p-1 rounded-circle bg-success"></div>
                        <span className="smaller fw-bold text-muted" style={{ fontSize: '10px' }}>HIPAA COMPLIANT & SECURE</span>
                    </div>
                </div>
            </motion.div>

            {/* Decorative Palette Elements */}
            <div className="position-absolute bottom-0 start-0 p-5 opacity-20 d-none d-lg-block">
                <div className="rounded-circle" style={{ width: '300px', height: '300px', background: 'var(--med-primary-soft)', filter: 'blur(80px)' }}></div>
            </div>
            <div className="position-absolute top-0 end-0 p-5 opacity-20 d-none d-lg-block">
                <div className="rounded-circle" style={{ width: '300px', height: '300px', background: 'var(--med-secondary-soft)', filter: 'blur(80px)' }}></div>
            </div>
        </div>
    );
};

export default Login;
