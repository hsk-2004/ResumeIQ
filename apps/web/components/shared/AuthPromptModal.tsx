"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

interface AuthPromptModalProps {
    isOpen: boolean
    onClose: () => void
    onContinue: () => void
    feature: string
}

export default function AuthPromptModal({ isOpen, onClose, onContinue, feature }: AuthPromptModalProps) {
    const router = useRouter()

    if (!isOpen) return null

    const handleLogin = () => {
        router.push("/login")
    }

    const handleSignup = () => {
        router.push("/signup")
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md rounded-xl border border-white/10 bg-[#0B0F1A] p-6 shadow-2xl">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-white transition"
                    aria-label="Close"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Icon */}
                <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-amber-500/10 p-3">
                        <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-white mb-2">
                        Your Progress Won't Be Saved
                    </h2>
                    <p className="text-sm text-gray-400">
                        You're about to use <span className="text-white font-medium">{feature}</span> as a guest.
                        Your analysis results and scores won't be saved to your profile.
                    </p>
                </div>

                {/* Benefits */}
                <div className="mb-6 rounded-lg bg-white/5 border border-white/10 p-4">
                    <p className="text-xs font-medium text-gray-400 mb-2">With an account, you get:</p>
                    <ul className="space-y-1.5 text-sm text-gray-300">
                        <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Save all your analysis results</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Track your progress over time</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Access your data from anywhere</span>
                        </li>
                    </ul>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <div className="flex gap-3">
                        <button
                            onClick={handleLogin}
                            className="flex-1 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition"
                        >
                            Login
                        </button>
                        <button
                            onClick={handleSignup}
                            className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition border border-white/10"
                        >
                            Sign Up
                        </button>
                    </div>
                    <button
                        onClick={onContinue}
                        className="w-full px-4 py-2 text-sm text-gray-400 hover:text-white transition"
                    >
                        Continue without saving
                    </button>
                </div>
            </div>
        </div>
    )
}
