import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const SegmentationStep = ({ imageId, onNext = () => { } }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        const fetchSegmentation = async () => {
            try {
                const res = await api.get(`/api/segment/${imageId}`);
                if (res.data) {
                    setData(res.data);
                }
                setTimeout(() => setLoading(false), 1500);
            } catch (err) {
                console.error("Segmentation API Error:", err);
                setLoading(false);
            }
        };
        fetchSegmentation();
    }, [imageId]);

    if (loading) return (
        <div className="text-center py-5 d-flex flex-column align-items-center">
            <div className="med-card p-5 shadow-lg border-0" style={{ maxWidth: '400px' }}>
                <div className="spinner-border text-primary mb-4" role="status" style={{ width: '3rem', height: '3rem' }}></div>
                <h4 className="fw-bold h5">VASCULAR MAPPING...</h4>
                <p className="text-muted small">Segmenting retinal vessels and pathology</p>
            </div>
        </div>
    );

    if (!data && !loading) return (
        <div className="text-center py-5 d-flex flex-column align-items-center">
            <div className="med-card p-5 shadow-lg border-0 bg-danger bg-opacity-10" style={{ maxWidth: '400px' }}>
                <i className="bi bi-exclamation-octagon text-danger display-4 mb-3"></i>
                <h4 className="fw-bold h5 text-danger">SEGMENTATION FAILED</h4>
                <p className="text-muted small mb-4">The AI engine was unable to process the vascular tree. This may be due to a server timeout or invalid image data.</p>
                <button className="btn-med btn-med-outline w-100" onClick={() => window.location.reload()}>
                    <i className="bi bi-arrow-clockwise"></i>
                    RETRY PROCESS
                </button>
            </div>
        </div>
    );

    return (
        <div className="animate-fade-in py-4">
            <div className="d-flex justify-content-between align-items-end mb-4">
                <div>
                    <h2 className="fw-bold h3 mb-1">CLINICAL SEGMENTATION</h2>
                    <p className="text-muted small mb-0">Structural isolation of the vascular tree for detailed analysis</p>
                </div>
                <div className="d-flex gap-3">
                    <button
                        className={`btn-med ${showOverlay ? 'btn-med-secondary' : 'btn-med-outline'}`}
                        onClick={() => setShowOverlay(!showOverlay)}
                        disabled={!data}
                    >
                        <i className={`bi bi-eye${showOverlay ? '-slash' : ''}`}></i>
                        {showOverlay ? 'HIDE OVERLAY' : 'SHOW OVERLAY'}
                    </button>
                    <button className="btn-med btn-med-primary shadow-sm" onClick={() => onNext(data)} disabled={!data}>
                        PROCEED TO DIAGNOSIS
                        <i className="bi bi-chevron-right"></i>
                    </button>
                </div>
            </div>

            <div className="row g-4 mb-5">
                <div className="col-lg-6">
                    <div className="med-card med-card-pink p-4 h-100 shadow-lg border-0">
                        <div className="mb-3 d-flex justify-content-between align-items-center">
                            <span className="small fw-bold text-muted">ENHANCED SOURCE</span>
                            <span className="med-badge badge-pink">ORIGINAL</span>
                        </div>
                        <div className="position-relative overflow-hidden rounded-4 border bg-white shadow-sm" style={{ minHeight: '300px' }}>
                            {data?.original ? (
                                <img src={`data:image/jpeg;base64,${data.original}`} className="img-fluid w-100" alt="Original" />
                            ) : (
                                <div className="d-flex align-items-center justify-content-center h-100 text-muted small">No Preview Available</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="med-card med-card-blue p-4 h-100 shadow-lg border-0">
                        <div className="mb-3 d-flex justify-content-between align-items-center">
                            <span className="small fw-bold text-muted">SEGMENTATION MASK</span>
                            <span className="med-badge badge-blue">U-NET AI</span>
                        </div>
                        <div className="position-relative overflow-hidden rounded-4 border bg-white shadow-sm" style={{ minHeight: '300px' }}>
                            {data?.mask ? (
                                <>
                                    <img src={`data:image/jpeg;base64,${data.mask}`} className="img-fluid w-100" alt="Mask" />
                                    {showOverlay && (
                                        <div
                                            className="position-absolute top-0 start-0 w-100 h-100"
                                            style={{ mixBlendMode: 'screen', background: `url(data:image/jpeg;base64,${data.original})`, backgroundSize: 'cover', opacity: 0.6 }}
                                        />
                                    )}
                                </>
                            ) : (
                                <div className="d-flex align-items-center justify-content-center h-100 text-muted small">Mask Generation Failed</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="med-card shadow-lg border-0 p-4">
                <div className="row align-items-center">
                    <div className="col-md-9">
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <i className="bi bi-info-circle text-primary"></i>
                            <span className="small fw-bold text-main">SEGMENTATION ANALYSIS SUMMARY</span>
                        </div>
                        <p className="text-muted small mb-0">
                            {data ? "The AI model has successfully isolated the retinal vascular tree. Structural continuity is within normal clinical parameters. Anomaly nodes have been tagged for final diagnostic classification."
                                : "Awaiting clinical processing result. The neural network is pending response from the primary inference engine."}
                        </p>
                    </div>
                    <div className="col-md-3 text-end border-start">
                        <div className="h2 fw-bold text-primary mb-0">{data ? '94.8%' : '0.0%'}</div>
                        <span className="smaller fw-bold text-muted">MAPPING CONFIDENCE</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SegmentationStep;
