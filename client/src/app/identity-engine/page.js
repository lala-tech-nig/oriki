"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Compass, Sparkles } from 'lucide-react';
import { fetchAPI } from '@/lib/api';

export default function IdentityEngine() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);

    const [formData, setFormData] = useState({
        surnames: '',
        orikiFragments: '',
        languages: '',
        familyStories: '',
        knownTowns: ''
    });

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Process inputs into arrays
            const payload = {
                surnames: formData.surnames.split(',').map(s => s.trim()).filter(Boolean),
                orikiFragments: formData.orikiFragments,
                languages: formData.languages.split(',').map(s => s.trim()).filter(Boolean),
                familyStories: formData.familyStories,
                knownTowns: formData.knownTowns.split(',').map(s => s.trim()).filter(Boolean)
            };

            const data = await fetchAPI('/discovery/inference', {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            setResults(data);
            setStep(5); // Results step
        } catch (error) {
            console.error("Inference failed", error);
            alert("Something went wrong analyzing your inputs. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-12">
                    <div className="flex justify-between mb-2 text-sm font-medium text-stone-500">
                        <span>Start</span>
                        <span>Analysis</span>
                    </div>
                    <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-amber-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${(step / 5) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100 min-h-[500px] flex flex-col">
                    <div className="p-8 md:p-12 flex-grow flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <Step1
                                    key="step1"
                                    data={formData}
                                    onChange={(e) => setFormData({ ...formData, surnames: e.target.value })}
                                />
                            )}
                            {step === 2 && (
                                <Step2
                                    key="step2"
                                    data={formData}
                                    onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                                />
                            )}
                            {step === 3 && (
                                <Step3
                                    key="step3"
                                    data={formData}
                                    onChange={(e) => setFormData({ ...formData, orikiFragments: e.target.value })}
                                />
                            )}
                            {step === 4 && (
                                <Step4
                                    key="step4"
                                    data={formData}
                                    onChange={(e) => setFormData({ ...formData, familyStories: e.target.value })}
                                />
                            )}
                            {step === 5 && results && (
                                <Results key="results" results={results} />
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer Navigation */}
                    {step < 5 && (
                        <div className="bg-stone-50 px-8 py-6 border-t border-stone-100 flex justify-between items-center">
                            {step > 1 ? (
                                <button onClick={handleBack} className="flex items-center text-stone-600 hover:text-stone-900 font-medium">
                                    <ArrowLeft className="mr-2" size={18} /> Back
                                </button>
                            ) : (
                                <div></div> // Spacer
                            )}

                            {step < 4 ? (
                                <button
                                    onClick={handleNext}
                                    className="bg-stone-900 hover:bg-black text-white px-6 py-3 rounded-full font-medium flex items-center transition-all"
                                >
                                    Continue <ArrowRight className="ml-2" size={18} />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-medium flex items-center transition-all shadow-lg shadow-amber-900/20"
                                >
                                    {loading ? (
                                        <span>Analyzing...</span>
                                    ) : (
                                        <>
                                            Reveal My Origins <Sparkles className="ml-2" size={18} />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Step Components
function Step1({ data, onChange }) {
    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-3xl font-bold font-heading text-stone-900 mb-4">What names do you carry?</h2>
            <p className="text-stone-600 mb-8">
                Surnames and first names often hold the strongest clues to ethnic origin. Enter the names you know (yours, parents, grandparents), separated by commas.
            </p>
            <input
                autoFocus
                type="text"
                value={data.surnames}
                onChange={onChange}
                placeholder="e.g. Adebayo, Nwosu, Danjuma..."
                className="w-full text-2xl p-4 border-b-2 border-stone-200 focus:border-amber-600 focus:outline-none bg-transparent placeholder-stone-300 font-medium"
            />
        </motion.div>
    );
}

function Step2({ data, onChange }) {
    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-3xl font-bold font-heading text-stone-900 mb-4">Are there words you remember?</h2>
            <p className="text-stone-600 mb-8">
                Do you recall any specific words, greetings, or phrases spoken by your elders? Even fragments helps.
            </p>
            <input
                autoFocus
                type="text"
                value={data.languages}
                onChange={onChange}
                placeholder="e.g. Bawo ni, Kedu..."
                className="w-full text-2xl p-4 border-b-2 border-stone-200 focus:border-amber-600 focus:outline-none bg-transparent placeholder-stone-300 font-medium"
            />
        </motion.div>
    );
}

function Step3({ data, onChange }) {
    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-3xl font-bold font-heading text-stone-900 mb-4">The sound of praise?</h2>
            <p className="text-stone-600 mb-8">
                Oríkì (praise poetry) is central to identity. Do you know any fragments, nicknames, or animals associated with your family?
            </p>
            <textarea
                autoFocus
                rows={4}
                value={data.orikiFragments}
                onChange={onChange}
                placeholder="e.g. Omo Ekun (Child of the Leopard)..."
                className="w-full text-xl p-4 border border-stone-200 rounded-xl focus:border-amber-600 focus:outline-none bg-transparent placeholder-stone-300"
            />
        </motion.div>
    );
}

function Step4({ data, onChange }) {
    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-3xl font-bold font-heading text-stone-900 mb-4">Any family stories?</h2>
            <p className="text-stone-600 mb-8">
                "We came from a place near a great river..." or "Our ancestors were blacksmiths." These details matter.
            </p>
            <textarea
                autoFocus
                rows={4}
                value={data.familyStories}
                onChange={onChange}
                placeholder="Share any consistent stories passed down..."
                className="w-full text-xl p-4 border border-stone-200 rounded-xl focus:border-amber-600 focus:outline-none bg-transparent placeholder-stone-300"
            />
        </motion.div>
    );
}

function Results({ results }) {
    const { analysisResult } = results;
    const bestMatch = analysisResult?.likelyEthnicGroups?.[0];

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full text-amber-600 mb-6">
                <Compass size={32} />
            </div>

            <h2 className="text-4xl font-bold font-heading text-stone-900 mb-2">We found a connection.</h2>
            <p className="text-stone-500 mb-8">Based on your inputs, your heritage strongly aligns with:</p>

            {bestMatch ? (
                <div className="bg-amber-900 text-amber-50 p-8 rounded-2xl shadow-xl mb-8 transform transition-all hover:scale-105">
                    <h3 className="text-5xl font-bold mb-2">{bestMatch.group}</h3>
                    <div className="text-amber-300 font-medium text-lg mb-6">{bestMatch.confidence}% Confidence Match</div>
                    <p className="text-amber-100/90 leading-relaxed italic border-t border-amber-800 pt-4">
                        "{bestMatch.reasoning}"
                    </p>
                </div>
            ) : (
                <div className="p-6 bg-stone-100 rounded-xl mb-6">
                    <p>We couldn't determine a strong match yet, but your data has been saved for deeper analysis by our researchers.</p>
                </div>
            )}

            <div className="space-y-4">
                <p className="text-sm text-stone-500">Other possibilities:</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {analysisResult?.likelyEthnicGroups?.slice(1).map((match, i) => (
                        <span key={i} className="px-4 py-2 bg-stone-100 rounded-full text-stone-600 text-sm font-medium">
                            {match.group} ({match.confidence}%)
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <button className="text-amber-700 font-bold hover:underline">
                    Save to My Profile
                </button>
            </div>
        </motion.div>
    );
}
