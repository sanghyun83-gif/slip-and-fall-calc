import Link from "next/link";
import { SITE, CALCULATORS, SLIP_FALL_CONSTANTS_2026, FALL_LOCATIONS, formatCurrency } from "./site-config";
import { ArrowRight, Building, AlertTriangle, TrendingUp, Scale } from "lucide-react";

export default function Home() {
  const featuredCalculators = CALCULATORS.filter(c => c.featured);
  const otherCalculators = CALCULATORS.filter(c => !c.featured);
  const locations = Object.entries(FALL_LOCATIONS).slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="w-6 h-6 text-amber-500" />
            <span className="text-lg font-bold text-white">{SITE.name}</span>
          </div>
          <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">
            {SITE.year} Data
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-slate-900 to-orange-900/20" />
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-300">Free {SITE.year} Calculator</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Slip and Fall
            <span className="text-amber-400"> Settlement Calculator</span>
          </h1>

          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Calculate your premises liability claim in seconds.
            Estimate compensation for injuries, medical bills, and pain & suffering from slip, trip, and fall accidents.
          </p>

          <Link
            href="/slip-fall-settlement"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
          >
            Calculate Your Settlement
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Warning Banner */}
          <div className="mt-8 bg-amber-900/30 border border-amber-700/50 rounded-lg p-4 max-w-xl mx-auto">
            <div className="flex items-center gap-2 text-amber-300 text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Over <strong>1 million</strong> Americans are injured in slip and fall accidents every year</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-800/50 border-y border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-400">
                {formatCurrency(SLIP_FALL_CONSTANTS_2026.statistics.avgSettlement)}
              </p>
              <p className="text-sm text-slate-400 mt-1">Avg Slip & Fall Settlement</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-400">1M+</p>
              <p className="text-sm text-slate-400 mt-1">Annual Injuries</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-400">2-7x</p>
              <p className="text-sm text-slate-400 mt-1">Pain & Suffering Multiplier</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400">
                {formatCurrency(SLIP_FALL_CONSTANTS_2026.statistics.avgMedicalCost)}
              </p>
              <p className="text-sm text-slate-400 mt-1">Avg Medical Costs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Calculators */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Free Slip and Fall Calculators
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {featuredCalculators.map((calc) => {
            const IconComponent = calc.icon;
            return (
              <Link
                key={calc.id}
                href={`/${calc.id}`}
                className="group bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-amber-500/50 transition-all hover:bg-slate-800/80"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
                      {calc.name}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {calc.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-amber-400 text-sm mt-3 group-hover:gap-2 transition-all">
                      Calculate Now <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Other Calculators */}
        {otherCalculators.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4">
            {otherCalculators.map((calc) => {
              const IconComponent = calc.icon;
              return (
                <Link
                  key={calc.id}
                  href={`/${calc.id}`}
                  className="group bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-amber-500/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5 text-slate-400 group-hover:text-amber-400" />
                    <span className="text-sm text-slate-300 group-hover:text-white">
                      {calc.shortName}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Proving Negligence */}
      <section className="bg-slate-800/30 border-y border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            What Makes a Strong Slip and Fall Case?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Hazardous Condition</h3>
              <p className="text-sm text-slate-400">
                Wet floors, uneven surfaces, poor lighting, broken stairs, or debris that caused your fall.
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <Building className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Property Owner Negligence</h3>
              <p className="text-sm text-slate-400">
                Owner knew or should have known about the hazard and failed to fix it or warn visitors.
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                <Scale className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Documented Injuries</h3>
              <p className="text-sm text-slate-400">
                Medical records, photos of injuries, incident reports, and witness statements strengthen your case.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Locations */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Settlements by Accident Location
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {locations.map(([key, location]) => (
            <div key={key} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <h3 className="font-semibold text-white mb-1">{location.name}</h3>
              <p className="text-xs text-slate-500 mb-2">{location.examples}</p>
              <p className="text-lg font-bold text-amber-400">
                {formatCurrency(location.avgSettlement.min)} - {formatCurrency(location.avgSettlement.max)}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/injury-types"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300"
          >
            View All Injury Types & Settlements <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Find Out What Your Slip and Fall Case Is Worth
        </h2>
        <p className="text-slate-400 mb-8">
          Get a free estimate in under 2 minutes. No email required.
        </p>
        <Link
          href="/slip-fall-settlement"
          className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
        >
          Start Free Calculator
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-amber-500" />
              <span className="font-semibold text-white">{SITE.name}</span>
            </div>
            <p className="text-sm text-slate-400 text-center">
              For informational purposes only. Not legal advice. Consult an attorney for your specific case.
            </p>
            <p className="text-sm text-slate-500">
              © {SITE.year} {SITE.name}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
