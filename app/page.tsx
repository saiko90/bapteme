'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import NeoCardFloatingBadge from './components/NeoCardFloatingBadge';
import { 
  Cross, 
  Sun, 
  MapPin, 
  Calendar, 
  Clock, 
  Heart, 
  Check, 
  X, 
  Mail, 
  Users, 
  ChevronDown,
  BookOpen,
  Music
} from 'lucide-react';

// --- DATA ---
const DATA = {
  childName: "GABRIEL",
  date: "Dimanche 24 Mai 2026",
  verse: "L'Éternel est ma lumière et mon salut.",
  verseReference: "Psaume 27:1",
  church: {
    name: "Église Saint-Sulpice",
    address: "2 Rue Palatine, 75006 Paris",
    time: "10h30",
    map: "https://goo.gl/maps/example"
  },
  reception: {
    name: "Chapelle de Saint-Roch",
    address: "Rue de St-Roch 19, 1004Lausanne",
    time: "12h30",
    map: "https://maps.app.goo.gl/GAQfGBjNYkbvD5uC6"
  },
  images: {
    hero: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=1920&auto=format&fit=crop", // Church Interior Light
    baby: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop", // Baby in white
    dove: "https://images.unsplash.com/photo-1534947926214-411a00a18439?q=80&w=1920&auto=format&fit=crop", // Sky/Clouds/Light
  }
};

export default function BaptismPage() {
  const [isRsvpOpen, setRsvpOpen] = useState(false);

  // Confetti Or et Blanc au chargement
  useEffect(() => {
    const end = Date.now() + 2000;
    const colors = ['#fcd34d', '#ffffff', '#fef3c7'];
    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        shapes: ['circle', 'square'],
        scalar: 1.2
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        shapes: ['circle', 'square'],
        scalar: 1.2
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  }, []);

  return (
    <div className="bg-slate-50 text-slate-600 font-serif selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden relative">
      <HeroSection />
      <VerseSection />
      <CeremonyDetails />
      <BabySection />
      <NeoCardFloatingBadge theme="light" />
      
      {/* RSVP Fixed Button */}
      <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setRsvpOpen(true)}
          className="pointer-events-auto bg-white text-amber-600 px-10 py-4 rounded-full font-sans font-bold uppercase tracking-widest shadow-[0_10px_40px_rgba(217,119,6,0.2)] border border-amber-100 flex items-center gap-3 ring-4 ring-white/50"
        >
          <Mail size={16} /> Répondre à l'invitation
        </motion.button>
      </div>

      <AnimatePresence>
        {isRsvpOpen && <RsvpModal onClose={() => setRsvpOpen(false)} />}
      </AnimatePresence>

      <footer className="py-24 text-center bg-white border-t border-amber-100/50 mt-12">
        <Cross className="w-8 h-8 text-amber-200 mx-auto mb-4" />
        <h2 className="text-2xl text-slate-800">{DATA.childName}</h2>
        <p className="text-slate-400 text-xs uppercase tracking-widest mt-2">Béni soit ce jour</p>
      </footer>
    </div>
  );
}

// --- SECTIONS ---

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
       {/* Background */}
       <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img src={DATA.images.hero} className="w-full h-full object-cover opacity-60" alt="Church" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-slate-50" />
       </motion.div>

       {/* Floating Elements */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <motion.div 
             animate={{ y: [-20, 20], opacity: [0.5, 1] }} 
             transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
             className="absolute top-[15%] left-[10%] text-amber-200/50"
           >
              <Sun size={120} />
           </motion.div>
       </div>

       {/* Content */}
       <motion.div style={{ opacity }} className="relative z-10 px-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 1.2 }}
            className="mb-8"
          >
             <div className="w-px h-24 bg-gradient-to-b from-transparent via-amber-400 to-transparent mx-auto mb-8"></div>
             <Cross className="w-12 h-12 text-amber-500 mx-auto drop-shadow-lg" strokeWidth={1} />
          </motion.div>

          <h2 className="text-amber-600 uppercase tracking-[0.4em] text-sm font-sans font-bold mb-4">Saint Baptême</h2>
          
          <h1 className="text-6xl md:text-9xl text-slate-800 mb-6 drop-shadow-sm font-medium">
            {DATA.childName}
          </h1>

          <div className="inline-flex items-center gap-4 text-slate-500 font-sans text-sm uppercase tracking-widest border-y border-amber-200 py-3 px-8 bg-white/50 backdrop-blur-sm rounded-full">
             <span>{DATA.date}</span>
             <span className="w-1 h-1 bg-amber-400 rounded-full"></span>
             <span>Paris</span>
          </div>
       </motion.div>

       <motion.div 
         animate={{ y: [0, 10, 0] }} 
         transition={{ repeat: Infinity, duration: 2 }}
         className="absolute bottom-12 text-amber-300"
       >
          <ChevronDown />
       </motion.div>
    </section>
  );
}

function VerseSection() {
    return (
        <section className="py-32 bg-slate-50 relative text-center px-6">
            <div className="max-w-3xl mx-auto relative">
                <BookOpen className="w-8 h-8 text-amber-300 mx-auto mb-6" />
                <h3 className="text-3xl md:text-5xl text-slate-700 italic leading-relaxed font-light">
                    &quot;{DATA.verse}&quot;
                </h3>
                <p className="mt-6 text-amber-600 font-sans uppercase tracking-widest text-xs font-bold">— {DATA.verseReference}</p>
                
                {/* Decorative Elements */}
                <div className="absolute -top-10 -left-10 text-amber-100/50 pointer-events-none">
                    <Cross size={100} />
                </div>
            </div>
        </section>
    )
}

function CeremonyDetails() {
    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative">
                    {/* Vertical Line */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-200 to-transparent"></div>

                    {/* Church */}
                    <div className="text-center md:text-right">
                         <div className="inline-block p-4 bg-amber-50 rounded-full mb-6">
                             <Music className="w-8 h-8 text-amber-600" />
                         </div>
                         <h3 className="text-3xl text-slate-800 mb-2">La Cérémonie</h3>
                         <p className="text-amber-600 font-sans font-bold text-lg mb-4">{DATA.church.time}</p>
                         <p className="text-slate-600 font-bold mb-1">{DATA.church.name}</p>
                         <p className="text-slate-500 mb-6 font-sans text-sm">{DATA.church.address}</p>
                         <a href={DATA.church.map} target="_blank" className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-amber-600 hover:text-amber-800 border border-amber-200 px-6 py-3 rounded-full hover:bg-amber-50 transition-colors">
                             <MapPin size={14} /> Itinéraire
                         </a>
                    </div>

                    {/* Reception */}
                    <div className="text-center md:text-left">
                         <div className="inline-block p-4 bg-amber-50 rounded-full mb-6">
                             <Sun className="w-8 h-8 text-amber-600" />
                         </div>
                         <h3 className="text-3xl text-slate-800 mb-2">La Réception</h3>
                         <p className="text-amber-600 font-sans font-bold text-lg mb-4">{DATA.reception.time}</p>
                         <p className="text-slate-600 font-bold mb-1">{DATA.reception.name}</p>
                         <p className="text-slate-500 mb-6 font-sans text-sm">{DATA.reception.address}</p>
                         <a href={DATA.reception.map} target="_blank" className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-amber-600 hover:text-amber-800 border border-amber-200 px-6 py-3 rounded-full hover:bg-amber-50 transition-colors">
                             <MapPin size={14} /> Itinéraire
                         </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

function BabySection() {
    return (
        <section className="py-32 relative overflow-hidden bg-slate-50">
             <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
                 <div className="w-full md:w-1/2 relative">
                     <div className="absolute inset-0 bg-amber-200/20 rounded-full blur-3xl transform scale-90"></div>
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative z-10 p-4 border border-white bg-white/50 shadow-2xl rotate-2"
                     >
                         <img src={DATA.images.baby} className="w-full aspect-[3/4] object-cover" alt="Baby" />
                     </motion.div>
                 </div>
                 
                 <div className="w-full md:w-1/2 text-center md:text-left">
                     <Heart className="w-12 h-12 text-amber-300 mx-auto md:mx-0 mb-6" fill="currentColor" />
                     <h2 className="text-4xl md:text-5xl text-slate-800 mb-6">Un Enfant de Lumière</h2>
                     <p className="text-lg text-slate-600 leading-relaxed mb-8 font-light">
                         Nous sommes infiniment heureux de présenter Gabriel devant Dieu et devant vous. 
                         Ce baptême marque le début de son chemin spirituel, entouré de l'amour de sa famille et de ses parrains.
                     </p>
                     <div className="h-px w-24 bg-amber-300 mx-auto md:mx-0"></div>
                 </div>
             </div>
        </section>
    )
}

// --- RSVP MODAL (Style Carte d'Invitation) ---
function RsvpModal({ onClose }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
    >
       <div className="bg-white p-8 md:p-12 shadow-2xl max-w-lg w-full relative border-[12px] border-amber-50 outline outline-1 outline-amber-100">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X size={24} /></button>
          
          <div className="text-center mb-10">
              <Cross className="w-8 h-8 text-amber-500 mx-auto mb-4" />
              <h3 className="text-2xl font-sans font-bold text-slate-800 uppercase tracking-widest">Confirmation</h3>
              <p className="text-slate-500 text-sm italic mt-2">Réponse souhaitée avant le 30 Avril</p>
          </div>
          
          <div className="space-y-6 font-sans">
             <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Prénom</label>
                    <input type="text" className="w-full bg-slate-50 border-b border-slate-200 p-3 text-slate-800 outline-none focus:border-amber-400 transition-colors" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nom</label>
                    <input type="text" className="w-full bg-slate-50 border-b border-slate-200 p-3 text-slate-800 outline-none focus:border-amber-400 transition-colors" />
                 </div>
             </div>
             
             <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-3">Présence</label>
                <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg cursor-pointer hover:bg-amber-50/50 transition-colors">
                        <input type="checkbox" className="w-5 h-5 accent-amber-500" defaultChecked />
                        <span className="text-slate-700 font-medium">Cérémonie Religieuse</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg cursor-pointer hover:bg-amber-50/50 transition-colors">
                        <input type="checkbox" className="w-5 h-5 accent-amber-500" defaultChecked />
                        <span className="text-slate-700 font-medium">Réception (Déjeuner)</span>
                    </label>
                </div>
             </div>

             <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-2">
                    <Users size={12} /> Nombre d'adultes
                </label>
                <input type="number" min="1" className="w-full bg-slate-50 border-b border-slate-200 p-3 text-slate-800 outline-none focus:border-amber-400 transition-colors" defaultValue="1" />
             </div>
             
             <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 uppercase tracking-widest text-xs transition-all shadow-lg shadow-amber-200 mt-4">
                Confirmer ma présence
             </button>
          </div>
       </div>
    </motion.div>
  );
}