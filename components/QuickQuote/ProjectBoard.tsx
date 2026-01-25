"use client";

import React, { useState } from "react";
import { Check, Upload, Loader2, Camera, User, FileText, Phone } from "lucide-react";

export default function ProjectBoard() {
    const [images, setImages] = useState<File[]>([]);
    const [fabricSelected, setFabricSelected] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: "", phone: "", zip: "", desc: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    // --- LOGIC ---
    const handleFiles = (newFiles: File[]) => {
        if (newFiles.length + images.length > 5) {
            alert("Maximum 5 photos allowed.");
            return;
        }
        setImages(prev => [...prev, ...newFiles]);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleSubmit = async (method: 'SMS' | 'WHATSAPP') => {
        if (!formData.phone || formData.phone.length < 5) {
            alert("Please enter a valid phone number.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Backend Submission
            const payload = {
                client: formData,
                images: images.map(f => f.name),
                method,
                fabric: fabricSelected
            };

            await fetch('/api/quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            // Redirect logic
            if (method === 'WHATSAPP') {
                const text = `Hi ABJ! I'm ${formData.name}. I'm interested in a quote. I have ${images.length} photos. Zip: ${formData.zip}. Info: ${formData.desc}`;
                window.open(`https://wa.me/573004004503?text=${encodeURIComponent(text)}`, '_blank');
            } else {
                const text = `Hi ABJ! Quote Request from ${formData.name}.`;
                window.open(`sms:+1573004004503?&body=${encodeURIComponent(text)}`, '_self');
            }

            setSubmitSuccess(true);
        } catch (e) {
            console.error(e);
            alert("Connection error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="w-full bg-navy-950 py-12 px-4 flex justify-center items-center select-none font-sans">
            <div className="relative w-full max-w-6xl min-h-[600px] bg-navy-900 rounded-xl shadow-2xl border border-white/10 flex flex-col md:flex-row overflow-hidden">

                {/* --- COL 1: UPLOAD PROJECT --- */}
                <div
                    className={`relative flex-1 border-b md:border-b-0 md:border-r border-gold/30 p-6 flex flex-col transition-colors ${isDragOver ? 'bg-navy-800' : ''}`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                >
                    {/* Header (Vertical on Desktop) */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 hidden md:flex items-center justify-center border-r border-white/5 bg-navy-950/50">
                        <h3 className="text-gold tracking-[0.2em] font-serif text-sm whitespace-nowrap -rotate-90 origin-center opacity-70">
                            UPLOAD PROJECT
                        </h3>
                    </div>

                    <div className="md:pl-12 h-full flex flex-col">
                        <h2 className="text-2xl font-serif text-white mb-6 md:hidden">Upload Project</h2>

                        {/* Drop Zone */}
                        <div className="flex-1 border-2 border-dashed border-gold/40 rounded-lg flex flex-col items-center justify-center p-8 text-center group hover:border-gold hover:bg-gold/5 transition-all cursor-pointer relative">
                            <input
                                type="file"
                                multiple
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
                            />
                            <Upload className="w-10 h-10 text-gold mb-4 group-hover:scale-110 transition-transform" />
                            <p className="text-white/80 font-medium">Drag & Drop Photos</p>
                            <p className="text-white/40 text-sm mt-2">or click to browse</p>
                        </div>

                        {/* Photo Stack Preview */}
                        <div className="mt-6 min-h-[100px] grid grid-cols-3 gap-2">
                            {images.map((file, i) => (
                                <div key={i} className="aspect-square bg-black/50 rounded border border-white/10 flex items-center justify-center overflow-hidden relative">
                                    <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover opacity-80" />
                                </div>
                            ))}
                            {images.length === 0 && (
                                <div className="col-span-3 flex items-center justify-center text-white/20 italic text-sm">
                                    No photos added yet
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- COL 2: FABRIC SELECTION --- */}
                <div className="relative flex-1 border-b md:border-b-0 md:border-r border-gold/30 p-6 flex flex-col">
                    {/* Header */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 hidden md:flex items-center justify-center border-r border-white/5 bg-navy-950/50">
                        <h3 className="text-gold tracking-[0.2em] font-serif text-sm whitespace-nowrap -rotate-90 origin-center opacity-70">
                            FABRIC SELECTION
                        </h3>
                    </div>

                    <div className="md:pl-12 h-full flex flex-col">
                        <h2 className="text-2xl font-serif text-white mb-6 md:hidden">Fabric Selection</h2>

                        <div className="grid grid-cols-2 gap-4 flex-1 content-start">
                            {['Leather', 'Velvet', 'Linen', 'Pattern', 'Vinyl', 'Other'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFabricSelected(type)}
                                    className={`p-4 rounded border transition-all text-left group ${fabricSelected === type ? 'bg-gold text-navy border-gold' : 'bg-transparent border-white/20 text-white hover:border-gold/50'}`}
                                >
                                    <span className="block text-sm font-bold tracking-wide uppercase">{type}</span>
                                    {fabricSelected === type && <Check className="w-4 h-4 ml-auto mt-2" />}
                                </button>
                            ))}
                        </div>

                        <div className="mt-8 p-4 bg-navy-950/50 rounded border border-white/5">
                            <p className="text-white/60 text-xs leading-relaxed">
                                Don't know yet? Select <strong>"Other"</strong>. <br />
                                Master Mike will bring sample books to your appointment.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- COL 3: CONTACT INFO --- */}
                <div className="relative flex-[1.2] p-6 flex flex-col bg-navy-800/30">
                    {/* Header */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 hidden md:flex items-center justify-center border-r border-white/5 bg-navy-950/50">
                        <h3 className="text-gold tracking-[0.2em] font-serif text-sm whitespace-nowrap -rotate-90 origin-center opacity-70">
                            CONTACT INFORMATION
                        </h3>
                    </div>

                    <div className="md:pl-12 h-full flex flex-col justify-between">
                        <h2 className="text-2xl font-serif text-white mb-6 md:hidden">Contact Info</h2>

                        <div className="space-y-6">
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50 w-5 h-5 group-focus-within:text-gold transition-colors" />
                                <input
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-navy-950 border border-gold/30 rounded p-4 pl-12 text-white placeholder:text-white/20 focus:border-gold outline-none transition-all"
                                />
                            </div>

                            <div className="flex gap-4">
                                <div className="relative group flex-[2]">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50 w-5 h-5 group-focus-within:text-gold transition-colors" />
                                    <input
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-navy-950 border border-gold/30 rounded p-4 pl-12 text-white placeholder:text-white/20 focus:border-gold outline-none transition-all"
                                    />
                                </div>
                                <div className="relative group flex-1">
                                    <input
                                        placeholder="Zip"
                                        value={formData.zip}
                                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                        className="w-full bg-navy-950 border border-gold/30 rounded p-4 text-center text-white placeholder:text-white/20 focus:border-gold outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <FileText className="absolute left-4 top-4 text-gold/50 w-5 h-5 group-focus-within:text-gold transition-colors" />
                                <textarea
                                    placeholder="Describe your project (e.g., 'Sofa needs reupholstery, cushions are sagging')..."
                                    value={formData.desc}
                                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                    className="w-full h-32 bg-navy-950 border border-gold/30 rounded p-4 pl-12 text-white placeholder:text-white/20 focus:border-gold outline-none transition-all resize-none leading-relaxed"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button
                                onClick={() => handleSubmit('SMS')}
                                disabled={isSubmitting}
                                className="flex-1 py-4 bg-transparent border border-gold text-gold font-bold uppercase tracking-wider rounded hover:bg-gold hover:text-navy transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "Text Me Quote"}
                            </button>
                            <button
                                onClick={() => handleSubmit('WHATSAPP')}
                                disabled={isSubmitting}
                                className="flex-1 py-4 bg-gold text-navy font-bold uppercase tracking-wider rounded hover:bg-white transition-all shadow-lg shadow-gold/20 disabled:opacity-50"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "WhatsApp"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Success Overlay */}
                {submitSuccess && (
                    <div className="absolute inset-0 z-50 bg-navy-950/98 flex flex-col items-center justify-center text-center p-8 animate-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-green-500/20">
                            <Check className="text-white w-10 h-10" strokeWidth={4} />
                        </div>
                        <h3 className="text-3xl font-serif text-white mb-2">Request Received!</h3>
                        <p className="text-white/60 max-w-md">
                            We are reviewing your request. <br />
                            Expect a reply via <strong>{formData.phone}</strong> shortly.
                        </p>
                        <button
                            onClick={() => {
                                setSubmitSuccess(false);
                                setImages([]);
                                setFormData({ name: "", zip: "", phone: "", desc: "" });
                            }}
                            className="mt-8 text-gold hover:text-white text-sm underline underline-offset-4"
                        >
                            Start Another Project
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
}
