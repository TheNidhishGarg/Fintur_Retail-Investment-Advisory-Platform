import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { googleLogin } from "../lib/api/auth.ts";

export default function LoginPage() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen bg-[#F7F6F2]">
            {/* LEFT PANEL */}
            <motion.div
                className="hidden lg:flex w-[55%] relative flex-col justify-center items-center text-center px-12 overflow-hidden"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <img
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1080"
                    alt="Abstract Architecture"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(15,26,46,0.75) 0%, rgba(94,139,126,0.45) 100%)",
                    }}
                />

                <div className="relative z-10">
                    <h1 className="font-serif font-bold text-5xl mb-4 text-white">
                        Fin<span style={{ color: "#5E8B7E" }}>tur</span>
                    </h1>
                    <p className="font-sans text-[14px] text-white/75 mb-10">
                        One Stop AI Powered Investment Advisor
                    </p>

                    <div className="flex gap-4">
                        <span className="px-4 py-2 rounded-full font-sans text-[11px] text-white bg-white/12 border border-white/5 backdrop-blur-sm">
                            🔒 Secure
                        </span>
                        <span className="px-4 py-2 rounded-full font-sans text-[11px] text-white bg-white/12 border border-white/5 backdrop-blur-sm">
                            🇮🇳 Built for India
                        </span>
                        <span className="px-4 py-2 rounded-full font-sans text-[11px] text-white bg-white/12 border border-white/5 backdrop-blur-sm">
                            🤖 AI Powered
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* RIGHT PANEL */}
            <div className="w-full lg:w-[45%] flex justify-center items-center p-6">
                <motion.div
                    className="bg-white rounded-2xl w-full max-w-md p-12 text-center"
                    style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <h2 className="font-serif text-[28px] text-[#0F1A2E] mb-2 font-semibold">
                        Welcome to Fintur
                    </h2>
                    <p className="font-sans text-[14px] text-[#6B7A8D] mb-8">
                        Sign in to start building your portfolio
                    </p>

                    <button
                        onClick={googleLogin}
                        className="w-full h-14 rounded-xl border border-black/10 bg-white flex items-center justify-center gap-3 hover:bg-[#F7F6F2] hover:border-[#5E8B7E] transition-all duration-200"
                    >
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                            <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                        <span className="font-sans text-[15px] text-[#1A2E22] font-medium">
                            Continue with Google
                        </span>
                    </button>

                    <p className="font-sans text-[12px] text-[#6B7A8D] text-center mt-6 leading-relaxed">
                        By continuing, you agree to our Terms of Service<br />
                        and Privacy Policy
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
