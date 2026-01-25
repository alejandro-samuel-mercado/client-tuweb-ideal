"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const PHRASES = [
  "Tu presencia digital es tu mejor carta de presentación.",
  "La creatividad es la inteligencia divirtiéndose.",
  "El diseño no es solo lo que se ve, sino cómo funciona.",
  "Convierte tus ideas en una realidad digital impactante.",
  "La simplicidad es la máxima sofisticación.",
  "Tu sitio web es el escaparate de tu éxito.",
  "Innovar es ver lo que todos ven y pensar lo que nadie piensa.",
  "El futuro pertenece a quienes creen en la belleza de sus sueños.",
  "Hazlo simple, pero significativo.",
  "La calidad nunca es un accidente; siempre es el resultado de un esfuerzo inteligente.",
  "El diseño es el embajador silencioso de tu marca.",
  "Cada detalle cuenta en la construcción de tu legado digital.",
  "No busques clientes, busca que te encuentren.",
  "Tu historia merece ser contada con elegancia.",
  "La excelencia no es un acto, es un hábito.",
  "Crea algo hoy que tu 'yo' del futuro agradezca.",
  "La primera impresión es la que queda; hazla inolvidable.",
  "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
  "Diseñamos experiencias, no solo páginas web.",
  "Tu visión, nuestra pasión por el código.",
  "Haz que tu marca sea imposible de ignorar.",
  "La tecnología al servicio de tu creatividad.",
  "Un buen diseño es un buen negocio.",
  "Eleva tu estándar, eleva tu marca.",
  "Donde la estética se encuentra con la funcionalidad.",
  "El límite es tu imaginación.",
  "Construyendo puentes digitales hacia tus metas.",
  "La belleza salvará al mundo, y también a tu web.",
  "Sé el cambio que quieres ver en el mundo digital.",
  "La inspiración existe, pero tiene que encontrarte trabajando.",
  "Haz que cada píxel cuente.",
  "Tu éxito online comienza con una gran decisión.",
  "El diseño es inteligencia hecha visible.",
  "No sueñes con el éxito, trabaja para conseguirlo.",
  "La elegancia es la única belleza que nunca se desvanece.",
  "Transformamos visitantes en clientes.",
  "Tu web, tu mundo, tus reglas.",
  "La innovación distingue a los líderes de los seguidores.",
  "Crea. Inspira. Conecta.",
  "El arte de la web es el arte de la comunicación.",
  "Dale vida a tu proyecto con un diseño único.",
  "La perfección se logra no cuando no hay nada más que añadir, sino cuando no hay nada más que quitar.",
  "Tu marca es lo que dicen de ti cuando no estás en la habitación.",
  "El diseño web es el alma de internet.",
  "Hazlo memorable.",
  "La pasión por el detalle marca la diferencia.",
  "Conectando ideas con resultados.",
  "Tu web es tu activo digital más valioso.",
  "El futuro es digital, y el futuro es hoy.",
  "Crea experiencias que la gente ame.",
  "La simplicidad es la clave de la verdadera elegancia.",
];

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("hasSeenWelcomeModal");
    
    if (!hasSeenModal) {
      const randomPhrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
      setPhrase(randomPhrase);
      
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenWelcomeModal", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden group"
          >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all hover:scale-110 active:scale-95 group-hover:border-primary/30 z-20"
              aria-label="Cerrar"
            >
              <FiX className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/20 text-primary text-sm font-bold tracking-wide uppercase mb-2"
              >
                Bienvenido a TuWebIdeal
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-5xl font-bold text-white leading-tight"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
                    "{phrase}"
                </span>
              </motion.h2>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                 <button
                    onClick={handleClose}
                    className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300 text-lg"
                 >
                    Comenzar Experiencia
                 </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
