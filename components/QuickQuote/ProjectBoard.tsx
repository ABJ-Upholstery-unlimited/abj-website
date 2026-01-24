"use client";

import React, { useState, useEffect } from "react";
import { Check, Loader2 } from "lucide-react";

export default function ProjectBoard() {
    const [currentStep, setCurrentStep] = useState(1);
    const [images, setImages] = useState<File[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);

    // Step State
    const [loading, setLoading] = useState(0); // Step 3
    const [authorized, setAuthorized] = useState(false); // Step 4
    const [fabricSelected, setFabricSelected] = useState<string | null>(null); // Step 5
    const [formData, setFormData] = useState({ name: "", phone: "", zip: "", desc: "" }); // Step 6

    // Submission State
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [lastMethod, setLastMethod] = useState<'SMS' | 'WHATSAPP' | null>(null);

    // Background Image Mapping
    const getStepImage = (step: number) => {
        switch (step) {
            case 1: return "/assets/quick_quote/QUICK_QUOTE_Step1_Load1.jpg";
            case 2: return "/assets/quick_quote/QUICK_QUOTE_Step1_Drop2.jpg";
            case 3: return "/assets/quick_quote/QUICK_QUOTE_Step1_Upload4.jpg"; // Renamed logic
            case 4: return "/assets/quick_quote/QUICK_QUOTE_Step1_Project3.jpg"; // Renamed logic (Auth)
            case 5: return "/assets/quick_quote/QUICK_QUOTE_Step2_Fabric5.jpg";
            case 6: return "/assets/quick_quote/QUICK_QUOTE_Step2_Contact6.jpg";
            default: return "/assets/quick_quote/QUICK_QUOTE_Step1_Load1.jpg";
        }
    };

    // --- LOGIC ---

    const handleFiles = (newFiles: File[]) => {
        if (newFiles.length > 0) {
            setImages(prev => [...prev, ...newFiles]);
            setCurrentStep(3);
            // Simulate Upload
            setLoading(0);
            const interval = setInterval(() => {
                setLoading(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 30); // Fast simulation
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleSubmit = async (method: 'SMS' | 'WHATSAPP') => {
        setIsSubmitting(true);
        setLastMethod(method);

        try {
            // Prepare payload
            const payload = {
                client: formData,
                images: images.map(f => f.name), // In real app, upload first then send URLs
                method: method,
                fabric: fabricSelected
            };

            const res = await fetch('/api/quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setSubmitSuccess(true);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("Network error.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="w-full bg-navy-950 py-10 px-4 flex justify-center items-center min-h-[80vh] select-none">
            <div
                className={`relative w-full max-w-6xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 transition-all group bg-black ${isDragOver ? 'ring-4 ring-gold scale-[1.01]' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {/* Active Step Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
                    style={{ backgroundImage: `url('${getStepImage(currentStep)}')` }}
                />

                {/* --- STEP 1 & 2: GLOBAL CLICK UPLOAD --- */}
                {(currentStep === 1 || currentStep === 2) && (
                    <div className="absolute inset-0 z-10 cursor-pointer">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
                        />
                    </div>
                )}

                {/* --- STEP 3: UPLOAD SIMULATION --- */}
                {currentStep === 3 && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-[10%]">
                        {/* Visual Barrier to prevent clicking next too early */}
                        {loading < 100 && <div className="absolute inset-0 z-20" />}

                        {/* Next Button Hitbox (Appears when loaded) */}
                        {loading === 100 && (
                            <button
                                onClick={() => setCurrentStep(4)}
                                className="w-[200px] h-[80px] bg-white/0 hover:bg-gold/10 rounded-full transition-colors cursor-pointer absolute bottom-[10%] left-1/2 -translate-x-1/2"
                                title="Proceed"
                            />
                        )}
                    </div>
                )}

                {/* --- STEP 4: AUTHORIZATION --- */}
                {currentStep === 4 && (
                    <div className="absolute inset-0 z-10">
                        {/* Checkbox Hitbox */}
                        <div
                            className="absolute top-[48%] left-[28%] w-[50px] h-[50px] cursor-pointer bg-white/0 hover:bg-gold/10 rounded flex items-center justify-center"
                            onClick={() => setAuthorized(!authorized)}
                        >
                            {authorized && <Check className="text-gold w-10 h-10 font-bold" strokeWidth={4} />}
                        </div>

                        {/* Next Button Hitbox */}
                        {authorized && (
                            <button
                                onClick={() => setCurrentStep(5)}
                                className="absolute bottom-[5%] right-[5%] w-[200px] h-[80px] cursor-pointer bg-white/0 hover:bg-gold/10 rounded-lg"
                                title="Authorized Next"
                            />
                        )}
                    </div>
                )}

                {/* --- STEP 5: FABRIC SELECTION --- */}
                {currentStep === 5 && (
                    <div className="absolute inset-0 z-10">
                        {/* Hitbox covering the fabric grid */}
                        <div
                            className="absolute top-[20%] left-[10%] right-[30%] bottom-[20%] cursor-pointer bg-white/0 hover:bg-gold/5 flex items-center justify-center"
                            onClick={() => setFabricSelected("Generic Selection")}
                        >
                            {fabricSelected && <div className="text-gold font-bold text-4xl bg-black/50 px-6 py-2 rounded backdrop-blur-md">Selection Active</div>}
                        </div>

                        {/* Next Button Hitbox */}
                        {fabricSelected && (
                            <button
                                onClick={() => setCurrentStep(6)}
                                className="absolute bottom-[5%] right-[5%] w-[200px] h-[80px] cursor-pointer bg-white/0 hover:bg-gold/10 rounded-lg"
                                title="Next"
                            />
                        )}
                    </div>
                )}

                {/* --- STEP 6: CONTACT FORM --- */}
                {currentStep === 6 && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pt-[12%] gap-4 animate-in fade-in duration-500">

                        {/* Inputs */}
                        <div className="flex gap-4 w-[60%] justify-center">
                            <input
                                placeholder="NAME"
                                value={formData.name}
                                className="flex-1 p-3 bg-navy-900/80 border border-gold/30 rounded backdrop-blur-sm focus:bg-navy-900 focus:border-gold outline-none text-white placeholder:text-white/30 transition-all font-serif"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <input
                                placeholder="ZIP"
                                value={formData.zip}
                                className="w-[120px] p-3 bg-navy-900/80 border border-gold/30 rounded backdrop-blur-sm focus:bg-navy-900 focus:border-gold outline-none text-white placeholder:text-white/30 transition-all font-serif text-center"
                                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                            />
                        </div>

                        <input
                            placeholder="PHONE / EMAIL"
                            value={formData.phone}
                            className="w-[60%] p-3 bg-navy-900/80 border border-gold/30 rounded backdrop-blur-sm focus:bg-navy-900 focus:border-gold outline-none text-white placeholder:text-white/30 transition-all font-serif"
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />

                        <textarea
                            placeholder="Describe your project (e.g. 'Fabric is torn, cushion is sagging')..."
                            value={formData.desc}
                            className="w-[60%] h-[100px] p-3 bg-navy-900/80 border border-gold/30 rounded backdrop-blur-sm focus:bg-navy-900 focus:border-gold outline-none text-white resize-none placeholder:text-white/30 transition-all font-serif"
                            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                        />

                        {/* Actions */}
                        <div className="flex gap-4 mt-2 w-[60%]">
                            <button
                                onClick={() => handleSubmit('SMS')}
                                disabled={isSubmitting}
                                className="flex-1 py-3 bg-navy-900/90 border border-gold text-gold font-bold rounded hover:bg-gold hover:text-navy transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : "No, Send Text"}
                            </button>
                            <button
                                onClick={() => handleSubmit('WHATSAPP')}
                                disabled={isSubmitting}
                                className="flex-1 py-3 bg-gold text-navy font-bold rounded hover:bg-white transition shadow-lg shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : "Yes, WhatsApp"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Success Overlay */}
                {submitSuccess && (
                    <div className="absolute inset-0 z-50 bg-navy-950/95 flex flex-col items-center justify-center text-center p-8 animate-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-green-500/20">
                            <Check className="text-white w-10 h-10" strokeWidth={4} />
                        </div>
                        <h3 className="text-3xl font-serif text-white mb-2">Request Received!</h3>
                        <p className="text-white/60 max-w-md">
                            We have received your project details. <br />
                            Master Upholsterer <strong>Mike</strong> will review your photos and send you a preliminary quote shortly via <strong>{lastMethod === 'WHATSAPP' ? 'WhatsApp' : 'Text Message'}</strong>.
                        </p>
                        <button
                            onClick={() => {
                                setSubmitSuccess(false);
                                setCurrentStep(1);
                                setImages([]);
                                setFormData({ name: "", zip: "", phone: "", desc: "" });
                            }}
                            className="mt-8 text-gold hover:text-white text-sm underline underline-offset-4"
                        >
                            Start Another Project
                        </button>
                    </div>
                )}

                {/* Debug Overlay */}
                <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm pointer-events-none z-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    Step {currentStep} | Uploaded: {images.length}
                </div>

            </div>
        </section>
    );
}
