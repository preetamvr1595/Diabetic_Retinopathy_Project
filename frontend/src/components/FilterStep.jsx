import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { motion, AnimatePresence } from 'framer-motion';

const FilterStep = ({ imageId, onNext }) => {
    const [filters, setFilters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState("ACE_ME_Novel");

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const res = await api.get(`/api/filters/${imageId}`);
                setFilters(res.data);
                if (res.data.find(f => f.name === 'ACE_ME_Novel')) {
                    setSelectedFilter('ACE_ME_Novel');
                } else if (res.data.length > 0) {
                    setSelectedFilter(res.data[0].name);
                }
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchFilters();
    }, [imageId]);

    if (loading) return (
        <div className="text-center py-5 d-flex flex-column align-items-center">
            <div className="med-card p-5 shadow-lg border-0" style={{ maxWidth: '400px' }}>
                <div className="spinner-border text-primary mb-4" role="status" style={{ width: '3rem', height: '3rem' }}></div>
                <h4 className="fw-bold h5">ENHANCING SOURCE...</h4>
                <p className="text-muted small">Applying clinical preprocessing filters</p>
            </div>
        </div>
    );

    const activeFilter = filters.find(f => f.name === selectedFilter) || filters[0];

    return (
        <div className="animate-fade-in py-4">
            <div className="d-flex justify-content-between align-items-end mb-4">
                <div>
                    <h2 className="fw-bold h3 mb-1">IMAGE ENHANCEMENT</h2>
                    <p className="text-muted small mb-0">Select the optimal enhancement algorithm for final diagnosis</p>
                </div>
                <button className="btn-med btn-med-primary shadow-sm" onClick={() => onNext(filters)}>
                    PROCEED TO SEGMENTATION
                    <i className="bi bi-chevron-right"></i>
                </button>
            </div>

            <div className="row g-4 mb-5">
                <div className="col-lg-12">
                    <div className="med-card p-0 overflow-hidden shadow-lg border-0">
                        <div className="row g-0">
                            {/* Study Selection Panel */}
                            <div className="col-md-3 border-end bg-light bg-opacity-30 p-4">
                                <h6 className="small fw-bold text-muted mb-4">ALGORITHM SELECTION</h6>
                                <div className="d-flex flex-column gap-2 overflow-auto pe-2" style={{ maxHeight: '600px' }}>
                                    {filters.map((f, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setSelectedFilter(f.name)}
                                            className={`p-3 rounded-3 cursor-pointer border transition-all ${selectedFilter === f.name
                                                ? 'border-primary bg-white shadow-sm'
                                                : 'border-transparent opacity-75'
                                                }`}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <span className={`small fw-bold ${selectedFilter === f.name ? 'text-primary' : 'text-main'}`}>
                                                    {f.name.replace(/_/g, ' ')}
                                                </span>
                                                {selectedFilter === f.name && (
                                                    <div className="bg-primary rounded-circle" style={{ width: '6px', height: '6px' }}></div>
                                                )}
                                            </div>
                                            <div className="smaller text-muted" style={{ fontSize: '10px' }}>
                                                SSIM FIDELITY: {f.metrics?.SSIM?.toFixed(3)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Viewport */}
                            <div className="col-md-9 p-5 position-relative bg-white">
                                <div className="text-center mb-5">
                                    <div className="med-badge badge-blue mb-2">{selectedFilter.replace(/_/g, ' ')}</div>
                                    <h4 className="fw-bold h5 mb-0">Active Viewport</h4>
                                </div>

                                <div className="mx-auto position-relative" style={{ maxWidth: '500px' }}>
                                    <img
                                        src={`data:image/jpeg;base64,${activeFilter?.image}`}
                                        className="img-fluid rounded-4 shadow-lg border shadow-sm"
                                        style={{ width: '100%', height: 'auto', background: '#f8fafc' }}
                                        alt="Enhanced View"
                                    />
                                    <div className="mt-3 d-flex justify-content-between align-items-center px-2">
                                        <span className="smaller fw-bold text-muted">RESOLUTION: 1240x1240 PX</span>
                                        <span className="smaller fw-bold text-primary">SCAN COMPLETED</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Validation Table */}
            <div className="med-card shadow-lg border-0 p-4">
                <div className="mb-4">
                    <h4 className="fw-bold h5 mb-1">VALIDATION METRICS</h4>
                    <p className="text-muted smaller">Comparative performance analysis of all available enhancement algorithms</p>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="border-0 small fw-bold text-muted py-3">NAME</th>
                                <th className="border-0 small fw-bold text-muted py-3 text-center">SSIM FIDELITY</th>
                                <th className="border-0 small fw-bold text-muted py-3 text-center">PSNR (dB)</th>
                                <th className="border-0 small fw-bold text-muted py-3 text-center">MSE ERROR</th>
                                <th className="border-0 small fw-bold text-muted py-3 text-end">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filters.map((f, i) => (
                                <tr key={i} className={f.name === selectedFilter ? 'bg-primary bg-opacity-5' : ''}>
                                    <td className="py-3 fw-bold small text-main">{f.name.replace(/_/g, ' ')}</td>
                                    <td className="text-center py-3">
                                        <div className="d-flex align-items-center justify-content-center gap-3">
                                            <div className="flex-grow-1 bg-light rounded-pill overflow-hidden" style={{ maxWidth: '100px', height: '6px' }}>
                                                <div className="h-100 bg-primary" style={{ width: `${(f.metrics?.SSIM || 0) * 100}%` }}></div>
                                            </div>
                                            <span className="smaller fw-bold text-main">{f.metrics?.SSIM?.toFixed(4)}</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-3 smaller text-muted">{f.metrics?.PSNR?.toFixed(2)}</td>
                                    <td className="text-center py-3 smaller text-muted">{f.metrics?.MSE?.toFixed(2)}</td>
                                    <td className="text-end py-3">
                                        {f.name === selectedFilter ? (
                                            <span className="med-badge badge-blue">ACTIVE</span>
                                        ) : (
                                            <span className="smaller fw-bold text-muted opacity-50">READY</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FilterStep;
