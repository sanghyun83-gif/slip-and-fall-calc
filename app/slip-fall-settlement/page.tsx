"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building, Calculator, Info, AlertTriangle } from "lucide-react";
import {
    SITE,
    SLIP_FALL_CONSTANTS_2026,
    calculateSlipFallSettlement,
    formatCurrency,
    parseFormattedNumber,
    SettlementResult
} from "../site-config";

export default function SlipFallSettlementPage() {
    const [medicalExpenses, setMedicalExpenses] = useState("");
    const [lostWages, setLostWages] = useState("");
    const [faultPercent, setFaultPercent] = useState(0);
    const [severity, setSeverity] = useState<"minor" | "moderate" | "severe" | "catastrophic">("moderate");
    const [location, setLocation] = useState("retail");
    const [hasAttorney, setHasAttorney] = useState(true);
    const [result, setResult] = useState<SettlementResult | null>(null);

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value.replace(/[^0-9]/g, "");
            if (raw === "") {
                setter("");
                return;
            }
            setter(parseInt(raw).toLocaleString("en-US"));
        };

    const handleCalculate = () => {
        const medical = parseFormattedNumber(medicalExpenses) || 15000;
        const wages = parseFormattedNumber(lostWages) || 0;
        setResult(calculateSlipFallSettlement(medical, wages, faultPercent, severity, hasAttorney, location));
    };

    const severityOptions = [
        { value: "minor", label: "Minor", desc: "Bruises, sprains", multiplier: "1.5-3x" },
        { value: "moderate", label: "Moderate", desc: "Fractures, surgery", multiplier: "3-5x" },
        { value: "severe", label: "Severe", desc: "Back injury, long recovery", multiplier: "5-10x" },
        { value: "catastrophic", label: "Catastrophic", desc: "TBI, hip fracture, permanent", multiplier: "10-20x" },
    ];

    const locationOptions = [
        { value: "grocery", label: "Grocery Store" },
        { value: "restaurant", label: "Restaurant" },
        { value: "retail", label: "Retail Store" },
        { value: "workplace", label: "Workplace" },
        { value: "parking", label: "Parking Lot" },
        { value: "publicProperty", label: "Public Property" },
    ];

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Header */}
            <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Building className="w-5 h-5 text-amber-500" />
                        <span className="text-lg font-bold text-white">Settlement Calculator</span>
                    </div>
                    <span className="ml-auto text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">
                        {SITE.year}
                    </span>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                {/* Calculator Card */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h1 className="text-xl font-bold text-white mb-2">
                        {SITE.year} Slip and Fall Settlement Calculator
                    </h1>
                    <p className="text-sm text-slate-400 mb-6">
                        Calculate your premises liability claim based on injuries, location, and negligence
                    </p>

                    {/* Inputs */}
                    <div className="space-y-5 mb-6">
                        {/* Medical Expenses */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Total Medical Expenses
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                                <input
                                    type="text"
                                    value={medicalExpenses}
                                    onChange={handleInputChange(setMedicalExpenses)}
                                    placeholder="15,000"
                                    className="w-full pl-8 pr-4 py-4 text-lg bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                ER, surgery, physical therapy, and future treatment costs
                            </p>
                        </div>

                        {/* Lost Wages */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Lost Wages (Optional)
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                                <input
                                    type="text"
                                    value={lostWages}
                                    onChange={handleInputChange(setLostWages)}
                                    placeholder="0"
                                    className="w-full pl-8 pr-4 py-4 text-lg bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* Accident Location */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Where Did the Fall Occur?
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {locationOptions.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => setLocation(opt.value)}
                                        className={`py-2 px-3 rounded-lg border text-sm font-medium transition ${location === opt.value
                                            ? "bg-amber-600 text-white border-amber-600"
                                            : "bg-slate-700 text-slate-300 border-slate-600 hover:border-amber-500"
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Fault Percentage */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Your Fault Percentage: {faultPercent}%
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={faultPercent}
                                onChange={(e) => setFaultPercent(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-1">
                                <span>0% (Property owner&apos;s fault)</span>
                                <span>100% (All your fault)</span>
                            </div>
                        </div>

                        {/* Injury Severity */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Injury Severity
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {severityOptions.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => setSeverity(opt.value as typeof severity)}
                                        className={`py-3 px-3 rounded-lg border font-medium transition text-left ${severity === opt.value
                                            ? "bg-amber-600 text-white border-amber-600"
                                            : "bg-slate-700 text-slate-300 border-slate-600 hover:border-amber-500"
                                            }`}
                                    >
                                        <div className="text-sm font-semibold">{opt.label}</div>
                                        <div className="text-xs opacity-75">{opt.desc}</div>
                                        <div className="text-xs mt-1 text-amber-300">{opt.multiplier}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Attorney Toggle */}
                        <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                            <div>
                                <p className="text-sm font-medium text-white">Using a Slip and Fall Lawyer?</p>
                                <p className="text-xs text-slate-400">Attorney fees: 33% of settlement</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setHasAttorney(!hasAttorney)}
                                className={`w-14 h-8 rounded-full transition-colors ${hasAttorney ? "bg-amber-600" : "bg-slate-600"
                                    }`}
                            >
                                <div className={`w-6 h-6 bg-white rounded-full transition-transform mx-1 ${hasAttorney ? "translate-x-6" : "translate-x-0"
                                    }`} />
                            </button>
                        </div>
                    </div>

                    {/* Calculate Button */}
                    <button
                        onClick={handleCalculate}
                        className="w-full py-4 bg-amber-600 text-white rounded-lg font-semibold text-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <Calculator className="w-5 h-5" />
                        Calculate Settlement Value
                    </button>
                </div>

                {/* Results */}
                {result && (
                    <div className="mt-6 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                        {/* Summary Header */}
                        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6">
                            <p className="text-sm text-amber-100 mb-1">Estimated Slip and Fall Settlement</p>
                            <p className="text-4xl font-bold">{formatCurrency(result.netSettlement)}</p>
                            <p className="text-sm text-amber-100 mt-2">
                                Range: {formatCurrency(result.settlementRange.min)} - {formatCurrency(result.settlementRange.max)}
                            </p>
                        </div>

                        {/* Breakdown */}
                        <div className="p-6">
                            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                                Settlement Breakdown
                            </h3>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between py-2 border-b border-slate-700">
                                    <span className="text-slate-300">Medical Expenses</span>
                                    <span className="font-medium text-white">{formatCurrency(result.medicalExpenses)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-700">
                                    <span className="text-slate-300">Lost Wages</span>
                                    <span className="font-medium text-white">{formatCurrency(result.lostWages)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-700">
                                    <span className="text-slate-300">Pain & Suffering ({result.painSufferingMultiplier}x)</span>
                                    <span className="font-medium text-amber-400">+{formatCurrency(result.painSufferingAmount)}</span>
                                </div>
                                {result.faultReduction > 0 && (
                                    <div className="flex justify-between py-2 border-b border-slate-700">
                                        <span className="text-slate-300">Comparative Fault ({faultPercent}%)</span>
                                        <span className="font-medium text-red-400">-{formatCurrency(result.faultReduction)}</span>
                                    </div>
                                )}
                                {result.attorneyFees > 0 && (
                                    <div className="flex justify-between py-2 border-b border-slate-700">
                                        <span className="text-slate-300">Attorney Fees (33%)</span>
                                        <span className="font-medium text-red-400">-{formatCurrency(result.attorneyFees)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between pt-4 text-lg">
                                    <span className="text-white font-bold">Your Net Settlement</span>
                                    <span className="font-bold text-amber-400">{formatCurrency(result.netSettlement)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="p-4 bg-blue-900/30 border-t border-blue-700/50">
                            <div className="flex items-start gap-2 text-sm">
                                <Info className="w-4 h-4 text-blue-400 mt-0.5" />
                                <p className="text-blue-200">
                                    Slip and fall cases require proving the property owner knew about the hazard. Document everything with photos and witnesses.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Ad Placeholder */}
                <div className="my-8 p-6 bg-slate-800 border border-slate-700 rounded-xl text-center">
                    <p className="text-sm text-slate-500">Advertisement</p>
                </div>

                {/* FAQ Section */}
                <section className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Info className="w-5 h-5 text-amber-500" />
                        Slip and Fall Settlement FAQ
                    </h2>

                    <div className="space-y-4 text-sm">
                        <div>
                            <h3 className="font-semibold text-white mb-1">
                                What is the average slip and fall settlement?
                            </h3>
                            <p className="text-slate-400">
                                The average slip and fall settlement ranges from $15,000 to $50,000. Severe cases involving hip fractures, TBI, or permanent injuries can settle for $100,000 to $500,000 or more.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-1">
                                How do I prove the property owner was negligent?
                            </h3>
                            <p className="text-slate-400">
                                You must show the owner knew or should have known about the hazard and failed to fix it or warn visitors. Surveillance footage, incident reports, and witness statements are key evidence.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-1">
                                What if I was partially at fault for my fall?
                            </h3>
                            <p className="text-slate-400">
                                Most states follow comparative negligence rules, meaning your settlement is reduced by your percentage of fault. In some states, if you&apos;re more than 50% at fault, you may receive nothing.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-1">
                                Should I hire a slip and fall lawyer?
                            </h3>
                            <p className="text-slate-400">
                                For significant injuries, yes. Studies show victims with attorneys receive 3-4x higher settlements on average. Most work on contingency (33%), so you pay nothing upfront.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Disclaimer */}
                <p className="mt-8 text-xs text-slate-500 text-center">
                    This calculator provides estimates based on {SITE.year} industry data.
                    Every case is unique. Consult with a premises liability attorney for accurate case evaluation.
                </p>
            </main>

            {/* Schema.org FAQPage */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: [
                            {
                                "@type": "Question",
                                name: "What is the average slip and fall settlement?",
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: "The average slip and fall settlement ranges from $15,000 to $50,000. Severe cases can settle for $100,000 to $500,000 or more.",
                                },
                            },
                            {
                                "@type": "Question",
                                name: "How do I prove the property owner was negligent?",
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: "You must show the owner knew or should have known about the hazard and failed to fix it or warn visitors.",
                                },
                            },
                        ],
                    }),
                }}
            />
        </div>
    );
}
