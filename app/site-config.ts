// ============================================
// SLIP AND FALL CALCULATOR - SITE CONFIG
// 2026 Data - Premises Liability Settlements
// ============================================

import { Scale, Building, Shield, Calculator, Stethoscope, AlertTriangle } from 'lucide-react';

// ============================================
// SITE METADATA
// ============================================
export const SITE = {
    name: "Slip and Fall Settlement Calculator",
    tagline: "Free Premises Liability Estimator",
    description: "Calculate your slip and fall settlement value. Free 2026 calculator for premises liability, trip and fall accidents, and property owner negligence claims.",
    year: 2026,
    baseUrl: "https://slip-and-fall.mysmartcalculators.com",
};

// ============================================
// 2026 SLIP AND FALL CONSTANTS
// Sources: Insurance industry data, Legal databases, Premises liability reports
// ============================================
export const SLIP_FALL_CONSTANTS_2026 = {
    // Pain & Suffering Multipliers by Injury Severity
    multipliers: {
        minor: { min: 1.5, max: 3, avg: 2 },        // Bruises, minor sprains
        moderate: { min: 3, max: 5, avg: 4 },       // Fractures, ligament tears
        severe: { min: 5, max: 10, avg: 7 },        // Surgery, long recovery
        catastrophic: { min: 10, max: 20, avg: 15 }, // TBI, spinal injury, permanent disability
    },

    // Common Slip and Fall Injury Costs (2026)
    injuryCosts: {
        brokenHip: { min: 30000, max: 150000 },
        brokenWrist: { min: 5000, max: 40000 },
        backInjury: { min: 15000, max: 200000 },
        headInjury: { min: 20000, max: 300000 },
        kneeInjury: { min: 10000, max: 80000 },
        ankleInjury: { min: 5000, max: 50000 },
        shoulderInjury: { min: 8000, max: 60000 },
    },

    // Location-based settlement factors
    locationFactors: {
        grocery: 1.1,       // Grocery stores - higher insurance limits
        restaurant: 1.0,
        retail: 1.0,
        workplace: 1.2,     // Workers comp may apply
        publicProperty: 0.9, // Government immunity issues
        residential: 0.85,   // Lower insurance limits
        parking: 1.0,
    },

    // Attorney Fees (Contingency)
    attorneyFees: {
        preSettlement: 0.33,
        postTrial: 0.40,
    },

    // Statistics
    statistics: {
        avgSettlement: 45000,
        avgMedicalCost: 30000,
        annualCases: 1000000, // 1 million slip and fall injuries per year
        hipFracturePercent: 5, // 5% result in hip fractures
    },

    // Average Daily Wage
    avgDailyWage: 220,
} as const;

// ============================================
// SLIP AND FALL INJURY TYPES
// ============================================
export const SLIP_FALL_INJURIES = {
    brokenHip: {
        name: "Broken Hip / Hip Fracture",
        severity: "catastrophic",
        avgSettlement: { min: 75000, max: 500000 },
        recoveryTime: "6-12 months",
        description: "Common in elderly victims. Often requires surgery and extensive rehabilitation.",
    },
    brokenWrist: {
        name: "Broken Wrist / Arm",
        severity: "moderate",
        avgSettlement: { min: 15000, max: 75000 },
        recoveryTime: "6-12 weeks",
        description: "Occurs when trying to break the fall. May require surgery for complex fractures.",
    },
    backInjury: {
        name: "Back / Spinal Injury",
        severity: "severe",
        avgSettlement: { min: 50000, max: 300000 },
        recoveryTime: "3-12 months",
        description: "Herniated discs, compression fractures, chronic pain from impact.",
    },
    headInjury: {
        name: "Head Injury / TBI",
        severity: "catastrophic",
        avgSettlement: { min: 100000, max: 1000000 },
        recoveryTime: "Months to permanent",
        description: "Concussion to severe TBI. Can occur even without direct head impact.",
    },
    kneeInjury: {
        name: "Knee Injury / ACL Tear",
        severity: "moderate",
        avgSettlement: { min: 25000, max: 150000 },
        recoveryTime: "4-9 months",
        description: "Ligament tears, meniscus damage, may require reconstructive surgery.",
    },
    ankleInjury: {
        name: "Ankle Sprain / Fracture",
        severity: "minor",
        avgSettlement: { min: 10000, max: 50000 },
        recoveryTime: "4-12 weeks",
        description: "Sprains to fractures. Common in uneven surface or stair falls.",
    },
    shoulderInjury: {
        name: "Shoulder Injury / Rotator Cuff",
        severity: "moderate",
        avgSettlement: { min: 20000, max: 100000 },
        recoveryTime: "3-6 months",
        description: "Rotator cuff tears, dislocations from impact or bracing during fall.",
    },
    softTissue: {
        name: "Soft Tissue / Bruising",
        severity: "minor",
        avgSettlement: { min: 5000, max: 25000 },
        recoveryTime: "2-6 weeks",
        description: "Sprains, strains, bruises, minor cuts. Quick recovery expected.",
    },
} as const;

// ============================================
// COMMON SLIP AND FALL LOCATIONS
// ============================================
export const FALL_LOCATIONS = {
    grocery: {
        name: "Grocery Store",
        examples: "Wet floors, spilled products, uneven mats",
        avgSettlement: { min: 25000, max: 150000 },
    },
    restaurant: {
        name: "Restaurant / Bar",
        examples: "Wet floors, grease, inadequate lighting",
        avgSettlement: { min: 20000, max: 100000 },
    },
    retail: {
        name: "Retail Store",
        examples: "Merchandise on floor, wet entrance, torn carpet",
        avgSettlement: { min: 20000, max: 125000 },
    },
    workplace: {
        name: "Workplace",
        examples: "Wet floors, cables, construction hazards",
        avgSettlement: { min: 30000, max: 200000 },
    },
    parking: {
        name: "Parking Lot / Garage",
        examples: "Potholes, ice, poor lighting, oil spills",
        avgSettlement: { min: 15000, max: 100000 },
    },
    stairs: {
        name: "Stairs / Escalator",
        examples: "Broken handrails, uneven steps, poor lighting",
        avgSettlement: { min: 30000, max: 175000 },
    },
    sidewalk: {
        name: "Sidewalk / Public Property",
        examples: "Cracked pavement, tree roots, ice",
        avgSettlement: { min: 10000, max: 75000 },
    },
} as const;

// ============================================
// CALCULATOR DEFINITIONS
// ============================================
export const CALCULATORS = [
    {
        id: "slip-fall-settlement",
        name: "Slip and Fall Settlement Calculator",
        shortName: "Settlement",
        description: "Calculate your premises liability settlement value",
        longDescription: "Free 2026 slip and fall settlement calculator. Estimate compensation based on injury severity, location, and property owner negligence.",
        icon: Calculator,
        category: "legal",
        keywords: ["slip and fall calculator", "premises liability settlement", "trip and fall compensation"],
        featured: true,
    },
    {
        id: "injury-types",
        name: "Fall Injury Value Guide",
        shortName: "Injury Guide",
        description: "Average settlements by slip and fall injury type",
        longDescription: "See average settlement values for hip fractures, back injuries, head injuries, and more from slip and fall accidents.",
        icon: Stethoscope,
        category: "legal",
        keywords: ["slip and fall injury settlement", "broken hip settlement", "fall injury compensation"],
        featured: true,
    },
    {
        id: "insurance-claim",
        name: "Insurance Claim Calculator",
        shortName: "Insurance Claim",
        description: "Estimate your premises liability insurance payout",
        longDescription: "Calculate how much the property owner's insurance will pay for your slip and fall claim.",
        icon: Shield,
        category: "insurance",
        keywords: ["slip and fall insurance claim", "premises liability insurance", "property liability payout"],
        featured: false,
    },
] as const;

// ============================================
// SETTLEMENT CALCULATION FUNCTION
// ============================================
export interface SettlementResult {
    medicalExpenses: number;
    lostWages: number;
    painSufferingMultiplier: number;
    painSufferingAmount: number;
    totalBeforeFees: number;
    faultReduction: number;
    attorneyFees: number;
    netSettlement: number;
    settlementRange: { min: number; max: number };
}

export function calculateSlipFallSettlement(
    medicalExpenses: number,
    lostWages: number,
    faultPercent: number,
    severity: 'minor' | 'moderate' | 'severe' | 'catastrophic',
    hasAttorney: boolean = true,
    location: string = 'retail'
): SettlementResult {
    const multipliers = SLIP_FALL_CONSTANTS_2026.multipliers[severity];
    const locationFactor = SLIP_FALL_CONSTANTS_2026.locationFactors[location as keyof typeof SLIP_FALL_CONSTANTS_2026.locationFactors] || 1.0;

    // Economic damages
    const economicDamages = medicalExpenses + lostWages;

    // Pain & suffering
    const painSufferingMultiplier = multipliers.avg;
    const painSufferingAmount = Math.round(medicalExpenses * painSufferingMultiplier * locationFactor);

    // Total before adjustments
    const subtotal = economicDamages + painSufferingAmount;

    // Comparative fault reduction
    const faultReduction = Math.round(subtotal * (faultPercent / 100));
    const afterFault = subtotal - faultReduction;

    // Attorney fees
    const attorneyFees = hasAttorney
        ? Math.round(afterFault * SLIP_FALL_CONSTANTS_2026.attorneyFees.preSettlement)
        : 0;

    const netSettlement = afterFault - attorneyFees;

    // Calculate range
    const minTotal = (economicDamages + (medicalExpenses * multipliers.min * locationFactor)) * (1 - faultPercent / 100);
    const maxTotal = (economicDamages + (medicalExpenses * multipliers.max * locationFactor)) * (1 - faultPercent / 100);

    return {
        medicalExpenses,
        lostWages,
        painSufferingMultiplier,
        painSufferingAmount,
        totalBeforeFees: afterFault,
        faultReduction,
        attorneyFees,
        netSettlement,
        settlementRange: {
            min: Math.round(hasAttorney ? minTotal * 0.67 : minTotal),
            max: Math.round(hasAttorney ? maxTotal * 0.67 : maxTotal),
        },
    };
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function parseFormattedNumber(value: string): number {
    return parseInt(value.replace(/[^0-9]/g, '')) || 0;
}

export function getSeverityLabel(severity: string): string {
    const labels: Record<string, string> = {
        minor: "Minor Injury",
        moderate: "Moderate Injury",
        severe: "Severe Injury",
        catastrophic: "Catastrophic Injury",
    };
    return labels[severity] || severity;
}

export function getSeverityColor(severity: string): string {
    const colors: Record<string, string> = {
        minor: "text-green-400",
        moderate: "text-yellow-400",
        severe: "text-orange-400",
        catastrophic: "text-red-400",
    };
    return colors[severity] || "text-slate-400";
}
