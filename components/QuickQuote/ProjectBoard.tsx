"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Upload, Loader2, Camera, User, FileText, Phone } from "lucide-react";

export default function ProjectBoard() {
    const [images, setImages] = useState<File[]>([]);
    const [fabricSelected, setFabricSelected] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: "", phone: "", zip: "", desc: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [activeCol, setActiveCol] = useState(1);

    // --- LOGIC ---
    const handleFiles = (newFiles: File[]) => {
        if (newFiles.length + images.length > 10) {
            alert("Maximum 10 photos allowed.");
            return;
        }
        setImages(prev => [...prev, ...newFiles]);
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
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

        // --- NEW: Open Tab Immediately (Synchronous to Click) ---
        // This prevents popup blockers from stopping the new window later.
        let newWindow: Window | null = null;
        if (method === 'WHATSAPP') {
            newWindow = window.open('', '_blank');
            if (newWindow) {
                newWindow.document.write(`
                    <html>
                        <head><title>Redirecting to WhatsApp...</title></head>
                        <body style="background-color: #0b1120; color: #d4af37; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0;">
                            <div style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">ABJ Upholstery Unlimited</div>
                            <div style="font-size: 18px;">Preparing your quote...</div>
                            <div style="font-size: 14px; opacity: 0.7; margin-top: 10px;">Please wait while we upload your photos.</div>
                        </body>
                    </html>
                `);
            } else {
                alert("Popup blocker prevented opening WhatsApp. Please allow popups for this site.");
                return;
            }
        }

        setIsSubmitting(true);
        try {
            // Backend Submission
            // Convert images to Base64
            const imagePromises = images.map(file => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve({
                        name: file.name,
                        type: file.type,
                        base64: reader.result as string
                    });
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });

            const processedImages = await Promise.all(imagePromises);

            const payload = {
                client: formData,
                images: processedImages, // Now sending full data
                method,
                fabric: fabricSelected
            };

            const res = await fetch('/api/quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Failed to submit quote");
            }

            // Redirect logic (Only on success)
            if (method === 'WHATSAPP' && newWindow) {
                const text = `Hi ABJ! I'm ${formData.name}. Zip: ${formData.zip}. I have uploaded ${images.length} photos via your website. ${formData.desc}`;
                const whatsappUrl = `https://wa.me/573004004503?text=${encodeURIComponent(text)}`;

                // Update the already-open window
                newWindow.location.href = whatsappUrl;

            } else if (method === 'SMS') {
                const text = `Hi ABJ! Quote Request from ${formData.name}.`;
                window.location.href = `sms:+1573004004503?&body=${encodeURIComponent(text)}`;
            }

            setSubmitSuccess(true);
        } catch (e: any) {
            console.error(e);
            alert(`Error: ${e.message || "Connection error. Please try again."}`);

            // Close the pending window if failed
            if (newWindow) newWindow.close();

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="w-full bg-navy-950 py-12 px-4 flex flex-col justify-center items-center select-none font-sans">

            {/* Added: Section Title */}
            <div className="mb-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="text-gold text-sm font-bold uppercase tracking-widest mb-2 block">Quick Estimate</span>
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Start Your Project</h2>
                <p className="text-white/60 max-w-lg mx-auto">
                    Upload photos of your furniture to get a fast, accurate quote.
                </p>
            </div>

            <div className="relative w-full max-w-6xl min-h-[600px] bg-navy-900 rounded-xl shadow-2xl border border-white/10 flex flex-col md:flex-row overflow-hidden">

                {/* --- COL 1: UPLOAD PROJECT --- */}
                <div
                    className={`relative border-b md:border-b-0 md:border-r border-gold/30 flex flex-col transition-colors 
                        ${isDragOver ? 'bg-navy-800' : ''} 
                        ${activeCol === 1 ? 'flex-1' : 'flex-1'}
                    `}
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                >
                    {/* ... (Vertical Header Logic) ... */}

                    {/* Content */}
                    <div
                        className={`overflow-hidden transition-all duration-500 ease-out md:overflow-visible md:h-full md:flex md:flex-col md:pl-12 md:p-6 md:pt-6
                            ${activeCol === 1 ? 'max-h-[1000px] opacity-100 p-6 pt-0' : 'max-h-0 opacity-0 md:opacity-100 md:max-h-full md:flex'}
                        `}
                    >
                        <h2 className="text-2xl font-serif text-white mb-6 hidden md:block">Upload Project</h2>

                        {/* Drop Zone */}
                        <div className="flex-1 border-2 border-dashed border-gold/40 rounded-lg flex flex-col items-center justify-center p-8 text-center group hover:border-gold hover:bg-gold/5 transition-all cursor-pointer relative">
                            {/* ... input ... */}
                            <input
                                aria-label="Upload Project Photos"
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
                                <div key={i} className="aspect-square bg-black/50 rounded border border-white/10 flex items-center justify-center overflow-hidden relative group/img">
                                    <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover opacity-80" />
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                                        className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-500 text-white rounded-full p-1 opacity-0 group-hover/img:opacity-100 transition-opacity desktop-hover-fix"
                                        title="Remove photo"
                                    >
                                        <div className="w-3 h-3 flex items-center justify-center font-bold leading-none">×</div>
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                                        className="md:hidden absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                    >
                                        <div className="w-3 h-3 flex items-center justify-center font-bold leading-none">×</div>
                                    </button>
                                </div>
                            ))}
                            {images.length === 0 && (
                                <div className="col-span-3 flex items-center justify-center text-white/20 italic text-sm">
                                    No photos added yet
                                </div>
                            )}
                        </div>

                        {/* Added: Next Button */}
                        {images.length > 0 && (
                            <button
                                onClick={() => setActiveCol(2)}
                                className="w-full mt-6 py-4 bg-gold text-navy font-bold uppercase tracking-wider rounded hover:bg-white transition-all shadow-lg shadow-gold/20 flex items-center justify-center gap-2 group animate-in slide-in-from-bottom-2 fade-in duration-500"
                            >
                                Next: Select Fabric <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        )}
                    </div>
                </div>


                {/* --- COL 2: FABRIC SELECTION --- */}
                <div
                    className={`relative border-b md:border-b-0 md:border-r border-gold/30 flex flex-col transition-all duration-700 ease-out 
                    ${activeCol === 2 ? 'flex-[2] bg-navy-800/50' : 'flex-1 hover:flex-[1.2] opacity-60 hover:opacity-100'}
                    ${images.length === 0 ? 'opacity-50 pointer-events-none md:pointer-events-auto md:opacity-60 cursor-not-allowed' : ''}
                    `}
                // Removing onMouseEnter per user request -> Click Only
                >
                    {/* Header */}
                    <div
                        className={`absolute left-0 top-0 bottom-0 w-12 hidden md:flex items-center justify-center border-r border-white/5 transition-colors cursor-pointer 
                            ${activeCol === 2 ? 'bg-gold/10' : 'bg-navy-950/50'}
                            ${images.length === 0 ? 'cursor-not-allowed' : ''}
                        `}
                        onClick={() => {
                            if (images.length === 0) {
                                alert("Please upload at least 1 photo first.");
                                return;
                            }
                            setActiveCol(2);
                        }}
                    >
                        <h3 className={`tracking-[0.2em] font-serif text-sm whitespace-nowrap -rotate-90 origin-center transition-colors ${activeCol === 2 ? 'text-gold' : 'text-white/50'}`}>
                            FABRIC SELECTION
                        </h3>
                    </div>

                    {/* Mobile Accordion Header */}
                    <button
                        onClick={() => {
                            if (images.length === 0) {
                                alert("Please upload at least 1 photo first.");
                                return;
                            }
                            setActiveCol(2);
                        }}
                        className={`md:hidden w-full p-6 flex justify-between items-center text-left transition-colors relative
                            ${activeCol === 2 ? 'bg-navy-800/50 text-gold' : 'text-white/60'}
                            ${images.length === 0 ? 'opacity-50' : ''}
                        `}
                    >
                        <span className="text-xl font-serif">Fabric Selection</span>
                        {images.length === 0 && <div className="absolute inset-0 bg-navy-950/50" />}
                        {fabricSelected && <span className="text-xs bg-gold/10 text-gold px-2 py-1 rounded">Selected</span>}
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-500 ease-out md:overflow-visible md:h-full md:flex md:flex-col md:pl-12 md:p-6 md:pt-6
                            ${activeCol === 2 ? 'max-h-[1000px] opacity-100 p-6 pt-0' : 'max-h-0 opacity-0 md:opacity-100 md:max-h-full md:flex'}
                        `}
                    >
                        <h2 className="text-2xl font-serif text-white mb-6 hidden md:block">Fabric Selection</h2>

                        {/* Fabric Grid */}
                        <div className="grid grid-cols-2 gap-4 flex-1 content-start overflow-y-auto pr-2 custom-scrollbar">
                            {[
                                {
                                    id: 'Crypton',
                                    label: 'Crypton\nFabric',
                                    price: 'Average yardage\n$60-$80',
                                    img: '/assets/quick_quote/Crypton.jpg'
                                },
                                {
                                    id: 'Regular',
                                    label: 'Regular\nFabric',
                                    price: 'Average yardage\n$20-$60',
                                    img: '/assets/quick_quote/Regular_Fabric.jpg'
                                },
                                {
                                    id: 'Synthetic',
                                    label: 'Synthetic',
                                    price: 'Average yardage\n$20-$50',
                                    img: '/assets/quick_quote/Synthetic-Leather-Fabric.jpeg'
                                },
                                {
                                    id: 'Leather',
                                    label: 'Genuine\nLeather',
                                    price: 'Average yardage\n$144-$252',
                                    img: '/assets/quick_quote/Genuine_Leather.jpg'
                                },
                                {
                                    id: 'Client',
                                    label: 'Client\nMaterial',
                                    price: 'You provide\nthe fabric',
                                    img: '/assets/quick_quote/Client_Material.jpg'
                                },
                                {
                                    id: 'Other',
                                    label: 'Other',
                                    price: 'Unsure?',
                                    img: null
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

                {/* --- COL 3: CONTACT INFORMATION --- */}
                <div
                    className={`relative border-b md:border-b-0 md:border-r border-gold/30 flex flex-col bg-navy-800/30 transition-all duration-700 ease-out 
                    ${activeCol === 3 ? 'flex-[2] bg-navy-800/50' : 'flex-1 hover:flex-[1.2] opacity-60 hover:opacity-100'}
                    ${!fabricSelected ? 'opacity-50 pointer-events-none md:pointer-events-auto md:opacity-60 cursor-not-allowed' : ''}
                    `}
                // Removing onMouseEnter per user request -> Click Only
                >
                    {/* Header */}
                    <div
                        className={`absolute left-0 top-0 bottom-0 w-12 hidden md:flex items-center justify-center border-r border-white/5 transition-colors cursor-pointer 
                            ${activeCol === 3 ? 'bg-gold/10' : 'bg-navy-950/50'}
                            ${!fabricSelected ? 'cursor-not-allowed' : ''}
                        `}
                        onClick={() => {
                            if (!fabricSelected) {
                                alert("Please select a Material first.");
                                return;
                            }
                            setActiveCol(3);
                        }}
                    >
                        <h3 className={`tracking-[0.2em] font-serif text-sm whitespace-nowrap -rotate-90 origin-center transition-colors ${activeCol === 3 ? 'text-gold' : 'text-white/50'}`}>
                            CONTACT INFORMATION
                        </h3>
                    </div>

                    {/* Mobile Accordion Header */}
                    <button
                        onClick={() => {
                            if (!fabricSelected) {
                                alert("Please select a Material first.");
                                return;
                            }
                            setActiveCol(3);
                        }}
                        className={`md:hidden w-full p-6 flex justify-between items-center text-left transition-colors relative
                            ${activeCol === 3 ? 'bg-navy-800/50 text-gold' : 'text-white/60'}
                            ${!fabricSelected ? 'opacity-50' : ''}
                        `}
                    >
                        <span className="text-xl font-serif">Contact Info</span>
                        {!fabricSelected && <div className="absolute inset-0 bg-navy-950/50" />}
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-500 ease-out md:overflow-visible md:h-full md:flex md:flex-col md:justify-between md:pl-12 md:p-6 md:pt-6
                            ${activeCol === 3 ? 'max-h-[1000px] opacity-100 p-6 pt-0' : 'max-h-0 opacity-0 md:opacity-100 md:max-h-full md:flex'}
                        `}
                    >
                        <h2 className="text-2xl font-serif text-white mb-6 hidden md:block">Contact Info</h2>

                        {/* Form Fields */}
                        <div className="space-y-6">
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50 w-5 h-5 group-focus-within:text-gold transition-colors" />
                                <input
                                    aria-label="Your Name"
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
                                        aria-label="Phone Number"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-navy-950 border border-gold/30 rounded p-4 pl-12 text-white placeholder:text-white/20 focus:border-gold outline-none transition-all"
                                    />
                                </div>
                                <div className="relative group flex-1">
                                    <input
                                        aria-label="Zip Code"
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
                                    aria-label="Project Description"
                                    placeholder="Describe your project..."
                                    value={formData.desc}
                                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                    className="w-full h-32 bg-navy-950 border border-gold/30 rounded p-4 pl-12 text-white placeholder:text-white/20 focus:border-gold outline-none transition-all resize-none leading-relaxed"
                                />
                            </div>
                        </div>

                        {/* --- SUCCESS MESSAGE LOCATION (Inline) --- */}
                        {submitSuccess && (
                            <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-2 min-h-[300px]">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(34,197,94,0.4)] animate-bounce">
                                    <Check className="text-white w-8 h-8" strokeWidth={4} />
                                </div>
                                <h3 className="text-2xl font-serif text-white mb-2">Request Received!</h3>
                                <p className="text-white/60 text-sm text-center max-w-xs mb-8">
                                    Expect a reply via <span className="text-white font-medium">300-400-4503</span> shortly.
                                </p>
                                <button
                                    onClick={() => {
                                        setSubmitSuccess(false);
                                        setImages([]);
                                        setFormData({ name: "", zip: "", phone: "", desc: "" });
                                        setActiveCol(1);
                                        setFabricSelected(null);
                                    }}
                                    className="px-6 py-2 border border-gold/30 rounded-full text-gold hover:text-white hover:bg-gold/10 transition-all text-xs uppercase tracking-widest"
                                >
                                    Start Another Project
                                </button>
                            </div>
                        )}

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
