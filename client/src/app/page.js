import Link from 'next/link';
import { ArrowRight, BookOpen, Music, Users, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white">
        {/* Abstract/Cultural Background Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
            The Ultimate <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-100">Yoruba Knowledge Zone</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Oriki.ng is the home for all details you can ever imagine.
            Research Yoruba history, culture, family names, kings, and stories.
            Access verified history, audio pronunciations, and rich heritage data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
            >
              Start Your Journey <ArrowRight size={18} />
            </Link>
            <Link
              href="/discover"
              className="px-8 py-4 border border-white/30 text-white font-medium hover:bg-white/10 transition-all"
            >
              Explore Free Content
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition / Pitch */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-black">Why Oriki.ng?</h2>
            <div className="w-24 h-1 bg-indigo-900 mx-auto"></div>
            <p className="mt-4 text-gray-600 max-w-xl mx-auto">
              We are the one-stop place for all verified Yoruba history.
              A digital museum and library in your pocket.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<BookOpen size={40} className="text-indigo-900" />}
              title="Comprehensive History"
              desc="From the Oyo Empire to modern times. Read detailed accounts of Obas, wars, and migrations."
            />
            <FeatureCard
              icon={<Users size={40} className="text-indigo-900" />}
              title="Family & Heritage"
              desc="Discover the meaning of your name, your family's Oriki, and trace your lineage to your town of origin."
            />
            <FeatureCard
              icon={<Music size={40} className="text-indigo-900" />}
              title="Language & Tones"
              desc="Learn the correct accent and tones. Listen to native speakers recite poetry and proverbs."
            />
          </div>
        </div>
      </section>

      {/* Featured Section (Placeholder for "Oba of Abeokuta" etc) */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-black">Trending Histories</h2>
              <p className="text-gray-500 mt-2">Recently updated verified stories.</p>
            </div>
            <Link href="/discover" className="text-indigo-900 font-semibold flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Mock Content Cards */}
            <ContentCard
              category="Royalty"
              title="The Alake of Egbaland"
              preview="The history of the Alake throne in Abeokuta..."
              tag="Abeokuta"
            />
            <ContentCard
              category="War"
              title="Kiriji War"
              preview="The longest civil war in Yoruba history..."
              tag="History"
            />
            <ContentCard
              category="Culture"
              title="Odun Olojo"
              preview="Significance of the Olojo festival in Ile-Ife..."
              tag="Ile-Ife"
            />
            <ContentCard
              category="Mythology"
              title="Moremi Ajasoro"
              preview="The legendary queen who saved her people..."
              tag="Legend"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-indigo-900 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-display font-bold mb-6">Join the Knowledge Zone</h2>
          <p className="text-indigo-200 mb-8 max-w-xl mx-auto">
            Get unlimited access to thousands of verified historical records, audio files, and videos for just $2/month.
          </p>
          <Link
            href="/register"
            className="inline-block px-10 py-4 bg-white text-indigo-900 font-bold rounded-none hover:bg-indigo-50 transition-all shadow-xl"
          >
            Subscribe Now
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-center text-center p-6 border border-transparent hover:border-indigo-100 hover:shadow-lg transition-all duration-300 bg-white">
      <div className="mb-6 p-4 bg-indigo-50 rounded-full">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function ContentCard({ category, title, preview, tag }) {
  return (
    <Link href="#" className="group block bg-white border border-gray-100 hover:border-indigo-900 transition-colors h-full">
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        {/* Placeholder image */}
        <div className="absolute inset-0 bg-gray-800/10 group-hover:bg-gray-800/0 transition-all"></div>
        <div className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
          {category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-900 transition-colors">{title}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{preview}</p>
        <span className="text-xs font-medium text-gray-400">#{tag}</span>
      </div>
    </Link>
  );
}
