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
                            <div
                                className={`relative flex-1 border-b md:border-b-0 md:border-r border-gold/30 p-6 flex flex-col transition-all duration-700 ease-out ${activeCol === 2 ? 'flex-[2] bg-navy-800/50' : 'flex-1 hover:flex-[1.2] opacity-60 hover:opacity-100'}`}
                                onMouseEnter={() => setActiveCol(2)}
                                onClick={() => setActiveCol(2)}
                            >
                                {/* Header */}
                                <div className={`absolute left-0 top-0 bottom-0 w-12 hidden md:flex items-center justify-center border-r border-white/5 transition-colors ${activeCol === 2 ? 'bg-gold/10' : 'bg-navy-950/50'}`}>
                                    <h3 className={`tracking-[0.2em] font-serif text-sm whitespace-nowrap -rotate-90 origin-center transition-colors ${activeCol === 2 ? 'text-gold' : 'text-white/50'}`}>
                                        FABRIC SELECTION
                                    </h3>
                                </div>

                                <div className="md:pl-12 h-full flex flex-col">
                                    <h2 className="text-2xl font-serif text-white mb-6 md:hidden">Fabric Selection</h2>

                                    {/* Fabric Grid */}
                                    <div className="grid grid-cols-2 gap-4 flex-1 content-start overflow-y-auto pr-2 custom-scrollbar">
                                        {[
                                            {
                                                id: 'Crypton',
                                                label: 'Crypton\nFabric',
                                                price: 'Average yardage\n$60-$80',
                                                img: '/assets/quick_quote/fabric_crypton.jpg' // Using uploaded image
                                            },
                                            {
                                                id: 'Regular',
                                                label: 'Regular\nFabric',
                                                price: 'Average yardage\n$20-$60',
                                                img: '/assets/quick_quote/fabric_regular.jpg' // Using uploaded image
                                            },
                                            {
                                                id: 'Synthetic',
                                                label: 'Synthetic',
                                                price: 'Average yardage\n$20-$50',
                                                img: '/assets/quick_quote/fabric_crypton.jpg' // PLACEHOLDER (Reusing uploaded)
                                            },
                                            {
                                                id: 'Leather',
                                                label: 'Genuine\nLeather',
                                                price: 'Average yardage\n$144-$252',
                                                img: '/assets/quick_quote/fabric_regular.jpg' // PLACEHOLDER (Reusing uploaded)
                                            },
                                            {
                                                id: 'Client',
                                                label: 'Client\nMaterial',
                                                price: 'You provide\nthe fabric',
                                                img: '/assets/quick_quote/fabric_crypton.jpg' // PLACEHOLDER
                                            },
                                            {
                                                id: 'Other',
                                                label: 'Other',
                                                price: 'Unsure?',
                                                img: null // No image for 'Other', or maybe a default gray?
                                            }
                                        ].map((item) => {
                                            const isSelected = fabricSelected === item.id;
                                            return (
                                                <button
                                                    key={item.id}
                                                    onClick={() => { setFabricSelected(item.id); setActiveCol(3); }}
                                                    className={`
                                            relative h-32 rounded-lg border overflow-hidden group transition-all text-center flex flex-col items-center justify-center p-2
                                            ${isSelected
                                                            ? 'border-gold shadow-lg shadow-gold/20 scale-[1.02]'
                                                            : 'border-white/10 hover:border-gold/50'
                                                        }
                                        `}
                                                >
                                                    {/* Background Image */}
                                                    {item.img ? (
                                                        <div className="absolute inset-0">
                                                            <img
                                                                src={item.img}
                                                                alt={item.label}
                                                                className={`w-full h-full object-cover transition-all duration-300 
                                                        ${isSelected ? 'brightness-50 sepia-0 hue-rotate-[190deg] saturate-[1.5]' : 'group-hover:brightness-50 brightness-100'} 
                                                    `}
                                                            />
                                                            {/* Note: 'blue filter' roughly approximated by hue-rotate/saturate or just overlaid color. 
                                                    Let's try a simpler overlay approach for "Blue Filter" */}
                                                            {isSelected && <div className="absolute inset-0 bg-blue-900/40 mix-blend-overlay" />}
                                                        </div>
                                                    ) : (
                                                        <div className={`absolute inset-0 ${isSelected ? 'bg-navy-800' : 'bg-navy-900'} group-hover:bg-navy-800 transition-colors`} />
                                                    )}

                                                    {/* Content Layer */}
                                                    <div className="relative z-10 flex flex-col items-center gap-1">
                                                        {/* Icon Check for Selected */}
                                                        {isSelected && <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5"><Check className="w-3 h-3 text-navy font-bold" /></div>}

                                                        {/* Title */}
                                                        <span
                                                            className={`
                                                    font-serif font-bold tracking-wide uppercase whitespace-pre-line leading-tight text-shadow-sm
                                                    ${isSelected || (!item.img) ? 'text-white' : 'text-black group-hover:text-white'}
                                                `}
                                                        >
                                                            {item.label}
                                                        </span>

                                                        {/* Price / Subtext (Visible on Hover or Selected) */}
                                                        <span
                                                            className={`
                                                    text-[10px] font-sans font-medium whitespace-pre-line leading-tight
                                                    transition-opacity duration-300
                                                    ${isSelected ? 'opacity-100 text-white/90' : 'opacity-0 group-hover:opacity-100 text-white/90'}
                                                `}
                                                        >
                                                            {item.price}
                                                        </span>
                                                    </div>
                                                </button>
                                            );
                                        })}
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
                            <div
                                className={`relative flex-[1.2] p-6 flex flex-col bg-navy-800/30 transition-all duration-700 ease-out ${activeCol === 3 ? 'flex-[2] bg-navy-800/50' : 'flex-1 hover:flex-[1.2] opacity-60 hover:opacity-100'}`}
                                onMouseEnter={() => setActiveCol(3)}
                                onClick={() => setActiveCol(3)}
                            >
                                {/* Header */}
                                <div className={`absolute left-0 top-0 bottom-0 w-12 hidden md:flex items-center justify-center border-r border-white/5 transition-colors ${activeCol === 3 ? 'bg-gold/10' : 'bg-navy-950/50'}`}>
                                    <h3 className={`tracking-[0.2em] font-serif text-sm whitespace-nowrap -rotate-90 origin-center transition-colors ${activeCol === 3 ? 'text-gold' : 'text-white/50'}`}>
                                        CONTACT INFORMATION
                                    </h3>
                                </div>

                                <div className="md:pl-12 h-full flex flex-col justify-between">
                                    <h2 className="text-2xl font-serif text-white mb-6 md:hidden">Contact Info</h2>

                                    {/* Form Fields */}
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
                                                placeholder="Describe your project..."
                                                value={formData.desc}
                                                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                                className="w-full h-32 bg-navy-950 border border-gold/30 rounded p-4 pl-12 text-white placeholder:text-white/20 focus:border-gold outline-none transition-all resize-none leading-relaxed"
                                            />
                                        </div>
                                    </div>

                                    {/* --- SUCCESS MESSAGE LOCATION (Inline) --- */}
                                    {submitSuccess && (
                                        <div className="mt-4 flex flex-col items-center animate-in fade-in slide-in-from-bottom-2">
                                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2 shadow-lg shadow-green-500/20">
                                                <Check className="text-white w-6 h-6" strokeWidth={4} />
                                            </div>
                                            <h3 className="text-xl font-serif text-white">Request Received!</h3>
                                            <p className="text-white/60 text-xs text-center max-w-xs">
                                                We are reviewing your request. <br />
                                                Expect a reply via <strong>{formData.phone}</strong> shortly.
                                            </p>
                                            <button
                                                onClick={() => {
                                                    setSubmitSuccess(false);
                                                    setImages([]);
                                                    setFormData({ name: "", zip: "", phone: "", desc: "" });
                                                }}
                                                className="mt-2 text-gold hover:text-white text-[10px] underline underline-offset-2"
                                            >
                                                Start Another Project
                                            </button>
                                        </div>
                                    )}

                                    {/* Actions (Hidden if success? Or visible to verify?) 
                            The user said "appears below the contact section and above the buttons".
                            So buttons should still be there? Or maybe below the *inputs* and above the *submit buttons*?
                            "appears below the contact section and above the buttons" implies:
                            Inputs
                            [Success Message]
                            Buttons
                        */}

                                    {/* Submit Buttons */}
                                    {!submitSuccess && (
                                        <div className="mt-8 flex gap-4">
                                            <button
                                                onClick={() => handleSubmit('SMS')}
                                                disabled={isSubmitting}
                                                className="flex-1 py-4 bg-transparent border border-gold text-gold font-bold uppercase tracking-wider rounded hover:bg-gold hover:text-navy transition-all disabled:opacity-50 text-sm"
                                            >
                                                {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "Text Me Quote"}
                                            </button>
                                            <button
                                                onClick={() => handleSubmit('WHATSAPP')}
                                                disabled={isSubmitting}
                                                className="flex-1 py-4 bg-gold text-navy font-bold uppercase tracking-wider rounded hover:bg-white transition-all shadow-lg shadow-gold/20 disabled:opacity-50 text-sm"
                                            >
                                                {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "WhatsApp"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                    </div>
                </section>
                );
}
