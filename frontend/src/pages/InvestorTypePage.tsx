import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../lib/store/authStore.ts";
import axios from "axios";

const CARDS = [
    {
        id: "passive",
        accent: "#5E8B7E",
        title: "Passive Investor",
        desc: "A relaxed investing approach where AI builds and manages a diversified portfolio for you, focusing on long term growth, stability, and the power of compounding.",
    },
    {
        id: "active",
        accent: "#4F6D8A",
        title: "Active Investor",
        desc: "Take control of your investments with market insights, deep analysis and advanced tools to research opportunities and craft your own investment strategies.",
    },
    {
        id: "unsure",
        accent: "#D6B97B",
        title: "Not Sure Yet",
        desc: "No problem. Answer a few more questions and we will recommend the right approach for you.",
    },
];

export default function InvestorTypePage() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState("");
    const [loading, setLoading] = useState(false);

    const handleContinue = async () => {
        const token = useAuthStore.getState().token;
        setLoading(true);
        try {
            console.log("Sending investor_type:", selected);
            await axios.patch(
                `${import.meta.env.VITE_API_URL || "http://localhost:4000"}/auth/profile`,
                { investor_type: selected },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate("/learn");
        } catch (err) {
            console.error("Failed to save investor type", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F7F6F2] flex flex-col">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 h-16 bg-[#F7F6F2] z-50 flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
                        <ellipse cx="18" cy="19.5" rx="9.5" ry="8" fill="#5E8B7E" opacity="0.96" />
                        <path d="M18 12 L18 27.5" stroke="rgba(0,0,0,0.13)" strokeWidth="0.9" strokeLinecap="round" />
                        <path d="M10.5 17 L25.5 17" stroke="rgba(0,0,0,0.13)" strokeWidth="0.9" strokeLinecap="round" />
                        <ellipse cx="18" cy="8.2" rx="3" ry="2.5" fill="#5E8B7E" opacity="0.96" />
                        <rect x="16.3" y="10.2" width="3.4" height="2.2" rx="1.2" fill="#5E8B7E" />
                        <ellipse cx="6.5" cy="15" rx="3" ry="1.7" transform="rotate(-35 6.5 15)" fill="#5E8B7E" opacity="0.88" />
                        <ellipse cx="29.5" cy="15" rx="3" ry="1.7" transform="rotate(35 29.5 15)" fill="#5E8B7E" opacity="0.88" />
                        <ellipse cx="7.5" cy="24.5" rx="2.5" ry="1.6" transform="rotate(35 7.5 24.5)" fill="#5E8B7E" opacity="0.88" />
                        <ellipse cx="28.5" cy="24.5" rx="2.5" ry="1.6" transform="rotate(-35 28.5 24.5)" fill="#5E8B7E" opacity="0.88" />
                        <ellipse cx="18" cy="28.5" rx="1.3" ry="2" fill="#5E8B7E" opacity="0.75" />
                    </svg>
                    <span style={{ fontFamily: "Playfair Display, serif" }} className="font-bold text-[1.4rem] text-[#0F1A2E]">
                        Fin<span className="text-[#5E8B7E]">tur</span>
                    </span>
                </div>
                <span className="text-[#6B7A8D] text-[13px]" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    Step 2 of 3
                </span>
            </nav>

            {/* Progress Bar */}
            <div className="fixed top-16 left-0 right-0 h-[3px] flex z-50">
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className={`flex-1 transition-colors duration-300 ${i < 2 ? "bg-[#5E8B7E]" : "bg-[#5E8B7E]/20"}`}
                    />
                ))}
            </div>

            {/* Main Content */}
            <main className="flex-1 pt-32 pb-16 px-6 max-w-2xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h1
                        style={{ fontFamily: "Playfair Display, serif" }}
                        className="text-[32px] font-bold text-[#0F1A2E]"
                    >
                        How would you like to invest?
                    </h1>
                    <p
                        style={{ fontFamily: "DM Sans, sans-serif" }}
                        className="text-[#6B7A8D] text-[15px] mt-3 max-w-lg mx-auto leading-relaxed"
                    >
                        Choose the style that matches how involved you want to be with your investments.
                    </p>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-4">
                    {CARDS.map((card, index) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelected(card.id)}
                            className={`p-8 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex items-start gap-6 hover:-translate-y-1 ${selected === card.id
                                ? "bg-[#F0F7F4] border-[#5E8B7E]"
                                : "bg-white border-transparent"
                                }`}
                            style={{
                                boxShadow:
                                    selected === card.id
                                        ? "0 8px 32px rgba(94,139,126,0.15)"
                                        : "0 4px 24px rgba(0,0,0,0.06)",
                            }}
                        >
                            {/* Accent Bar */}
                            <div
                                className="w-[3px] self-stretch rounded-[4px] shrink-0"
                                style={{ backgroundColor: card.accent, minHeight: "60px" }}
                            />
                            {/* Content */}
                            <div>
                                <h3
                                    style={{ fontFamily: "Playfair Display, serif" }}
                                    className="text-[20px] font-semibold text-[#0F1A2E] mb-2"
                                >
                                    {card.title}
                                </h3>
                                <p
                                    style={{ fontFamily: "DM Sans, sans-serif" }}
                                    className="text-[14px] text-[#6B7A8D] leading-relaxed"
                                >
                                    {card.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Continue Button */}
                <button
                    onClick={handleContinue}
                    disabled={!selected || loading}
                    className={`mt-10 w-full h-14 rounded-full text-white text-[16px] font-medium transition-all duration-300 ${!selected || loading
                        ? "bg-[#5E8B7E] opacity-40 cursor-not-allowed"
                        : "bg-[#5E8B7E] hover:bg-[#4A7A6D] hover:-translate-y-0.5 shadow-lg shadow-[#5E8B7E]/30"
                        }`}
                    style={{ fontFamily: "Playfair Display, serif" }}
                >
                    {loading ? "Saving..." : "Continue"}
                </button>
            </main>
        </div>
    );
}
