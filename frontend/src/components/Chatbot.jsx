import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaUserMd, FaLightbulb, FaExclamationTriangle } from 'react-icons/fa';

const Chatbot = ({ initialOpen = false, analysisData = {} }) => {
    const [isOpen, setIsOpen] = useState(initialOpen);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: "Hello! I am your AI Clinical Assistant. I've analyzed your current session data and I'm ready to provide personalized insights. How can I assist you today?" }
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
        const { classification, diagnosis } = analysisData;
        if (!classification) return "We are still processing your data. Please continue through the diagnostic steps.";

        const severity = classification.label.replace('_', ' ');
        const confidence = Math.round(classification.confidence * 100);

        return `Based on our analysis, the scan shows patterns consistent with ${severity} Diabetic Retinopathy with ${confidence}% confidence. Our neural models ${diagnosis?.label !== 'No_DR' ? 'detected' : 'did not detect'} significant vascular abnormalities.`;
    };

    const responses = {
        "status": getStatusResponse(),
        "my diagnosis": getStatusResponse(),
        "result": getStatusResponse(),
        "exudates": "Exudates are fluid leakages from damaged retinal blood vessels. They appear as yellowish spots and indicate active disease.",
        "dr": "Diabetic Retinopathy (DR) is a complication of diabetes that affects the eyes. It's caused by damage to the blood vessels of the light-sensitive tissue at the back of the eye (retina).",
        "help": "I can explain medical terms or discuss your specific 'status'. Just ask!"
    };

    const handleSend = (text = input) => {
        if (!text.trim()) return;

        const newMessages = [...messages, { role: 'user', text }];
        setMessages(newMessages);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            let aiResponse = "I'm sorry, I don't have specific information on that yet. You can ask about your 'status', 'exudates', or 'Diabetic Retinopathy'.";

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

    const quickPrompts = ["What are exudates?", "Explain NPDR", "How is DR treated?"];

    return (
        <div className="position-fixed bottom-0 end-0 p-4" style={{ zIndex: 1050 }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="glass-card shadow-2xl overflow-hidden border-primary mb-3"
                        style={{ width: '380px', height: '550px', display: 'flex', flexDirection: 'column' }}
                    >
                        {/* Header */}
                        <div className="p-3 bg-primary text-white d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-2">
                                <div className="bg-white rounded-circle p-2 text-primary">
                                    <FaRobot size={20} />
                                </div>
                                <div>
                                    <h6 className="mb-0 fw-bold">Clinical Assistant</h6>
                                    <span className="x-small opacity-75">Online | Precision-V2 Engine</span>
                                </div>
                            </div>
                            <button className="btn btn-link text-white p-0" onClick={() => setIsOpen(false)}>
                                <FaTimes />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div
                            ref={scrollRef}
                            className="flex-grow-1 p-3 overflow-auto bg-light bg-opacity-50"
                            style={{ scrollBehavior: 'smooth' }}
                        >
                            <div className="alert alert-warning x-small border-0 flex-row gap-2 d-flex mb-3">
                                <FaExclamationTriangle className="flex-shrink-0 mt-1" />
                                <span>Educational support only. Not for self-diagnosis.</span>
                            </div>

                            {messages.map((m, i) => (
                                <div key={i} className={`d-flex mb-3 ${m.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                                    <div
                                        className={`p-3 rounded-4 shadow-sm small ${m.role === 'user'
                                            ? 'bg-primary text-white rounded-te-none'
                                            : 'bg-white text-dark rounded-ts-none border'
                                            }`}
                                        style={{ maxWidth: '85%' }}
                                    >
                                        {m.text}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="d-flex justify-content-start mb-3">
                                    <div className="bg-white p-3 rounded-4 border">
                                        <div className="typing-indicator d-flex gap-1">
                                            <span></span><span></span><span></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Prompts */}
                        <div className="px-3 py-2 bg-light border-top">
                            <div className="d-flex gap-2 overflow-auto pb-1" style={{ whiteSpace: 'nowrap' }}>
                                {quickPrompts.map((p, i) => (
                                    <button
                                        key={i}
                                        className="btn btn-xs btn-outline-primary rounded-pill small px-2 py-1"
                                        onClick={() => handleSend(p)}
                                    >
                                        <FaLightbulb className="me-1" /> {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white border-top">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control border-0 bg-light rounded-start-pill ps-3"
                                    placeholder="Ask me anything..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <button
                                    className="btn btn-primary rounded-end-pill px-3"
                                    onClick={() => handleSend()}
                                >
                                    <FaPaperPlane size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`btn rounded-circle shadow-lg p-3 d-flex align-items-center justify-content-center ${isOpen ? 'btn-light text-primary' : 'btn-primary'}`}
                style={{ width: '60px', height: '60px' }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
            </motion.button>

            <style>{`
        .x-small { font-size: 0.75rem; }
        .btn-xs { font-size: 0.7rem; }
        .typing-indicator span {
          width: 4px;
          height: 4px;
          background: #3b82f6;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
        .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
      `}</style>
        </div>
    );
};

export default Chatbot;
