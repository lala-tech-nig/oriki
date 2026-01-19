"use client";

import Link from 'next/link';
import { LayoutMap, Users, BookOpen, Compass } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative bg-stone-900 text-white min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Abstract Pattern / Image placeholder */}
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1547610738-4e3518a38d78?q=80&w=2678&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 via-stone-900/60 to-stone-900"></div>
        </div>

        <div className="relative z-10 max-w-4xl px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight leading-tight">
            Discover Your <span className="text-amber-500">Ancestral Roots</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-200 mb-10 max-w-2xl mx-auto">
            Reconnect with your history, explore your lineage, and learn the oríkì of your people.
            A journey back home for the African diaspora.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/identity-engine" className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-amber-900/20">
              Trace My Origin
            </Link>
            <Link href="/explore" className="px-8 py-4 bg-stone-100 hover:bg-white text-stone-900 font-semibold rounded-full transition-all transform hover:scale-105">
              Explore Heritage
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-stone-900 mb-4">Reclaim Your Identity</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Our platform combines oral history, linguistic analysis, and community knowledge to help you find your way home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Compass className="w-8 h-8 text-amber-600" />}
              title="Ancestry Intelligence"
              description="Input what little you know—names, fragments of songs, or stories. Our engine connects the dots to suggest your likely origin."
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8 text-amber-600" />}
              title="Living Library"
              description="Access a vast repository of Oríkì (praise poetry), history, and cultural practices from towns across Nigeria."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-amber-600" />}
              title="Community Validation"
              description="Connect with others from your village or ethnic group. Share stories and verify historical records together."
            />
          </div>
        </div>
      </section>

      {/* Visual Break / Quote */}
      <section className="w-full py-24 bg-amber-900 text-amber-100 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-3xl md:text-4xl font-heading italic leading-relaxed">
            "A river that forgets its source will surely dry up."
          </blockquote>
          <p className="mt-6 text-amber-300 font-medium">— Yoruba Proverb</p>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
      <div className="mb-6 p-3 bg-amber-50 w-fit rounded-xl">{icon}</div>
      <h3 className="text-xl font-bold text-stone-900 mb-3">{title}</h3>
      <p className="text-stone-600 leading-relaxed">{description}</p>
    </div>
  );
}
