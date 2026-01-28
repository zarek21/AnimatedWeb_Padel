"use client";

import { ShinyButton } from "@/components/ui/shiny-button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Particles } from "@/components/ui/particles";

export default function BookingMap() {
  return (
    <section className="bg-background relative overflow-hidden">
      <Particles
        className="absolute inset-0 z-0 h-full w-full"
        quantity={80}
        ease={80}
        color="#FE3C0A"
        refresh
      />
      {/* Map Placeholder - Dark Theme */}
      <div className="w-full h-[60vh] bg-gray-900 relative grayscale invert-[.9] contrast-125 transition-all hover:grayscale-0 hover:invert-0 hover:contrast-100 duration-1000">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14902.133291880468!2d-103.4216965761895!3d20.702952874403175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428ae4e98d5453d%3A0xc4fdd3929a2ecbd1!2sPuerta%20de%20Hierro%2C%20Zapopan%2C%20Jalisco!5e0!3m2!1sen!2smx!4v1714930123456!5m2!1sen!2smx"
          width="100%"
          height="100%"
          style={{ border: 0, opacity: 0.6 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>

        <div className="absolute bottom-12 left-6 md:left-12 bg-black p-6 border-l-4 border-blazing-flame pointer-events-none">
          <h3 className="text-white font-display text-2xl font-bold">
            THE ARENA
          </h3>
          <p className="text-gray-400 font-sans">
            Av. Patria, Zapopan, Jalisco
          </p>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="py-32 px-6 flex flex-col items-center justify-center text-center bg-background relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blazing-flame/10 blur-[120px] rounded-full pointer-events-none" />

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-display font-bold text-foreground mb-12 relative z-10"
        >
          READY TO <span className="text-blazing-flame">SERVE?</span>
        </motion.h2>

        <ShinyButton
          className="group relative px-12 py-6 bg-blazing-flame text-white font-display font-bold text-xl md:text-2xl tracking-tight clip-path-slant hover:bg-foreground hover:text-background transition-colors duration-300"
          style={{ clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0% 100%)" }}
        >
          <span className="flex items-center gap-3">
            RESERVE YOUR COURT{" "}
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </span>
        </ShinyButton>

        <footer className="absolute bottom-6 text-muted-foreground text-xs font-mono uppercase">
          Designed by Zarek © 2026 LUXURY PADEL CLUB. ALL RIGHTS RESERVED.
        </footer>
      </div>
    </section>
  );
}
