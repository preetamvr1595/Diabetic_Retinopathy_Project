import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import avatarImg from '../assets/chatbot_avatar.png';

const Chatbot = ({ initialOpen = false, analysisData = {} }) => {
    const [isOpen, setIsOpen] = useState(initialOpen);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: "Hello! I'm your RetinaCore clinical assistant. How can I help you with your analysis today?" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (initialOpen) setIsOpen(true);
    }, [initialOpen]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const getStatusResponse = () => {
        const { classification } = analysisData;
        if (!classification) return "I'm currently on standby. Please upload a retinal image to begin the analysis.";

        const severity = classification.label.replace(/_/g, ' ');
        const confidence = Math.round(classification.confidence * 100);

        return `The current analysis shows ${severity} with a confidence level of ${confidence}%. Would you like to know more about this grade?`;
    };

    const responses = {
        "status": getStatusResponse(),
        "diagnosis": getStatusResponse(),
        "result": getStatusResponse(),
        "exudates": "Exudates appear as yellowish deposits on the retina, typically caused by lipid leakage from damaged blood vessels. They are a significant marker for retinopathy.",
        "dr": "Diabetic Retinopathy (DR) is a condition where high blood sugar levels cause damage to blood vessels in the retina. It's graded from Stage 0 (None) to Stage 3 (Severe/Proliferative).",
        "treatment": "Treatment recommendations depend on the severity. Mild cases may require closer monitoring, while severe cases might need specialist intervention like laser therapy or injections.",
        "help": "You can ask me about the 'status' of the analysis, details on 'exudates', facts about 'DR', or 'treatment' options."
    };

    const handleSend = (text = input) => {
        if (!text.trim()) return;

        const newMessages = [...messages, { role: 'user', text: text }];
        setMessages(newMessages);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            let aiResponse = "I'm not quite sure about that. You can ask for 'help' to see what I can assist with.";

            const lowerText = text.toLowerCase();
            for (const key in responses) {
                if (lowerText.includes(key)) {
                    aiResponse = responses[key];
                    break;
                }
            }

            setMessages([...newMessages, { role: 'assistant', text: aiResponse }]);
            setIsTyping(false);
        }, 800);
    };

    const quickPrompts = ["Diagnostic Status", "About DR Pathology", "Treatment Info"];

    return (
        <div className="position-fixed bottom-0 end-0 p-4" style={{ zIndex: 1050 }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="med-card shadow-lg mb-4 d-flex flex-column p-0 overflow-hidden"
                        style={{
                            width: '380px',
                            height: '550px',
                            border: '1px solid var(--med-border)',
                            borderRadius: '24px',
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        {/* Clinical Header */}
                        <div className="p-4 bg-primary text-white d-flex justify-content-between align-items-center shadow-sm">
                            <div className="d-flex align-items-center gap-3">
                                <div className="position-relative">
                                    <div className="bg-white p-1 rounded-circle">
                                        <img src={avatarImg} alt="AI" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                    </div>
                                    <span className="position-absolute bottom-0 end-0 bg-success border border-white border-2 rounded-circle" style={{ width: '12px', height: '12px' }}></span>
                                </div>
                                <div>
                                    <h6 className="mb-0 fw-bold">Clinical AI Bot</h6>
                                    <span style={{ fontSize: '0.7rem', opacity: 0.9 }}>Online & Analysis Tooling</span>
                                </div>
                            </div>
                            <button
                                className="btn btn-sm btn-light rounded-circle p-0 d-flex align-items-center justify-content-center shadow-sm"
                                style={{ width: '32px', height: '32px' }}
                                onClick={() => setIsOpen(false)}
                            >
                                <i className="bi bi-x-lg text-primary fw-bold" style={{ fontSize: '0.9rem' }}></i>
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div
                            ref={scrollRef}
                            className="flex-grow-1 p-4 overflow-auto bg-light bg-opacity-10"
                            style={{ scrollBehavior: 'smooth' }}
                        >
                            {messages.map((m, i) => (
                                <div
                                    key={i}
                                    className={`d-flex mb-4 ${m.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                                >
                                    {m.role === 'assistant' && (
                                        <div className="me-2 mt-auto">
                                            <img src={avatarImg} alt="Bot" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                                        </div>
                                    )}
                                    <div
                                        className={`p-3 rounded-4 shadow-sm ${m.role === 'user'
                                            ? 'bg-primary text-white'
                                            : 'bg-white text-main border'
                                            }`}
                                        style={{
                                            maxWidth: '80%',
                                            fontSize: '0.85rem',
                                            lineHeight: '1.5',
                                            borderBottomRightRadius: m.role === 'user' ? '4px' : '16px',
                                            borderBottomLeftRadius: m.role === 'user' ? '16px' : '4px'
                                        }}
                                    >
                                        {m.text}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="d-flex justify-content-start mb-4">
                                    <div className="me-2 mt-auto">
                                        <img src={avatarImg} alt="Bot" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                                    </div>
                                    <div className="px-3 py-2 bg-white rounded-4 shadow-sm text-muted border">
                                        <div className="d-flex gap-1 align-items-center">
                                            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="bg-primary rounded-circle" style={{ width: '4px', height: '4px' }} />
                                            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="bg-primary rounded-circle" style={{ width: '4px', height: '4px' }} />
                                            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="bg-primary rounded-circle" style={{ width: '4px', height: '4px' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Prompts */}
                        <div className="px-3 py-3 bg-white border-top">
                            <div className="d-flex gap-2 overflow-auto pb-1 no-scrollbar">
                                {quickPrompts.map((p, i) => (
                                    <button
                                        key={i}
                                        className="btn btn-sm btn-outline-primary rounded-pill py-1 px-3 white-space-nowrap"
                                        style={{ fontSize: '0.75rem', fontWeight: '500' }}
                                        onClick={() => handleSend(p)}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-top">
                            <div className="d-flex gap-2 align-items-center">
                                <input
                                    type="text"
                                    className="form-control border-0 bg-light rounded-pill px-4 py-2"
                                    style={{ fontSize: '0.9rem' }}
                                    placeholder="Type your message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="btn btn-primary rounded-circle p-0 d-flex align-items-center justify-content-center"
                                    style={{ width: '42px', height: '42px' }}
                                    onClick={() => handleSend()}
                                >
                                    <i className="bi bi-send-fill"></i>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Avatar Button */}
            <motion.div
                initial={false}
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className={`position-relative ${isOpen ? 'd-none' : ''}`}
            >
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="btn p-0 shadow-lg rounded-circle overflow-hidden border-4 border-white bg-white"
                    style={{ width: '80px', height: '80px' }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <img src={avatarImg} alt="Chatbot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </motion.button>
                <div className="position-absolute top-0 end-0 bg-danger rounded-circle border border-white border-3" style={{ width: '20px', height: '20px' }}></div>
            </motion.div>
        </div>
    );
};

export default Chatbot;
