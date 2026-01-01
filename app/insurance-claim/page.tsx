"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Calculator, Info, AlertTriangle, Building } from "lucide-react";
import { SITE, SLIP_FALL_CONSTANTS_2026, formatCurrency, parseFormattedNumber } from "../site-config";

export default function InsuranceClaimPage() {
    const [medicalExpenses, setMedicalExpenses] = useState("");
    const [propertyDamage, setPropertyDamage] = useState("");
    const [liabilityLimit, setLiabilityLimit] = useState("100000");
    const [faultPercent, setFaultPercent] = useState(0);
    const [result, setResult] = useState<{
        liabilityPayout: number;
        medCoverage: number;
        totalClaim: number;
        recommendation: string;
    } | null>(null);

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value.replace(/[^0-9]/g, "");
            if (raw === "") {
                setter("");
                return;
            }
            setter(parseInt(raw).toLocaleString("en-US"));
        };

    const liabilityOptions = [
        { value: "50000", label: "$50K" },
        { value: "100000", label: "$100K" },
        { value: "300000", label: "$300K" },
        { value: "500000", label: "$500K" },
        { value: "1000000", label: "$1M" },
    ];

    const handleCalculate = () => {
        const medical = parseFormattedNumber(medicalExpenses) || 0;
        const property = parseFormattedNumber(propertyDamage) || 0;
        const limit = parseInt(liabilityLimit);

        const totalDamages = medical + property;
        const adjustedDamages = totalDamages * (1 - faultPercent / 100);
        const liabilityPayout = Math.min(adjustedDamages, limit);
        const medCoverage = Math.min(medical * (1 - faultPercent / 100), limit * 0.8);
        const totalClaim = liabilityPayout;

        let recommendation = "";
        if (adjustedDamages > limit) {
            recommendation = "Your damages exceed the property owner's liability limit. Consider consulting an attorney to explore additional recovery options.";
        } else if (faultPercent > 20) {
            recommendation = "Your comparative fault may reduce your recovery. Document evidence showing the property owner's negligence.";
        } else {
            recommendation = "Your claim appears to be within the insurance limits. File a claim with the property owner's liability insurer.";
        }

        setResult({
            liabilityPayout,
            medCoverage,
            totalClaim,
            recommendation,
        });
    };

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Header */}
            <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-amber-500" />
                        <span className="text-lg font-bold text-white">Insurance Claim Calculator</span>
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
                        {SITE.year} Premises Liability Insurance Calculator
                    </h1>
                    <p className="text-sm text-slate-400 mb-6">
                        Estimate how much the property owner&apos;s insurance will pay for your slip and fall claim
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
                                    placeholder="25,000"
                                    className="w-full pl-8 pr-4 py-4 text-lg bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
                                />
                            </div>
                        </div>

                        {/* Property Damage */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Property Damage (phone, clothing, etc.)
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                                <input
                                    type="text"
                                    value={propertyDamage}
                                    onChange={handleInputChange(setPropertyDamage)}
                                    placeholder="500"
                                    className="w-full pl-8 pr-4 py-4 text-lg bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
                                />
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
                                <span>0% (Not your fault)</span>
                                <span>100% (All your fault)</span>
                            </div>
                        </div>

                        {/* Property Owner's Liability Limit */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Property Owner&apos;s Liability Limit (Estimate)
                            </label>
                            <div className="grid grid-cols-5 gap-2">
                                {liabilityOptions.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => setLiabilityLimit(opt.value)}
                                        className={`py-2 px-2 rounded-lg border text-xs font-medium transition ${liabilityLimit === opt.value
                                            ? "bg-amber-600 text-white border-amber-600"
                                            : "bg-slate-700 text-slate-300 border-slate-600 hover:border-amber-500"
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-slate-500 mt-2">
                                Most businesses carry $100K-$1M in liability coverage
                            </p>
                        </div>
                    </div>

                    {/* Calculate Button */}
                    <button
                        onClick={handleCalculate}
                        className="w-full py-4 bg-amber-600 text-white rounded-lg font-semibold text-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <Calculator className="w-5 h-5" />
                        Calculate Insurance Payout
                    </button>
                </div>

                {/* Results */}
                {result && (
                    <div className="mt-6 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                        {/* Summary Header */}
                        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6">
                            <p className="text-sm text-amber-100 mb-1">Estimated Insurance Payout</p>
                            <p className="text-4xl font-bold">{formatCurrency(result.totalClaim)}</p>
                        </div>

                        {/* Breakdown */}
                        <div className="p-6">
                            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                                Claim Breakdown
                            </h3>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between py-2 border-b border-slate-700">
                                    <span className="text-slate-300">Liability Coverage Payout</span>
                                    <span className="font-medium text-white">{formatCurrency(result.liabilityPayout)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-700">
                                    <span className="text-slate-300">Medical Expense Coverage</span>
                                    <span className="font-medium text-white">{formatCurrency(result.medCoverage)}</span>
                                </div>
                                <div className="flex justify-between pt-4 text-lg">
                                    <span className="text-white font-bold">Total Insurance Claim</span>
                                    <span className="font-bold text-amber-400">{formatCurrency(result.totalClaim)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Recommendation */}
                        <div className="p-4 bg-blue-900/30 border-t border-blue-700/50">
                            <div className="flex items-start gap-2 text-sm">
                                <Info className="w-4 h-4 text-blue-400 mt-0.5" />
                                <p className="text-blue-200">{result.recommendation}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Warning */}
                <div className="mt-6 bg-amber-900/20 border border-amber-700/50 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
                        <div className="text-sm text-amber-200">
                            <p className="font-medium text-white mb-1">Pain & Suffering Not Included</p>
                            <p>
                                This calculator only estimates the insurance payout for economic damages.
                                Pain and suffering compensation requires negotiation or litigation beyond the basic claim.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-8 text-center">
                    <Link
                        href="/slip-fall-settlement"
                        className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Calculate Full Settlement Value (Including Pain & Suffering) →
                    </Link>
                </div>

                {/* Disclaimer */}
                <p className="mt-8 text-xs text-slate-500 text-center">
                    Insurance payout estimates for educational purposes.
                    Actual payouts depend on policy terms, state laws, and claim specifics.
                </p>
            </main>
        </div>
    );
}
