"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

const NAV_LINKS = [
  { name: "COURTS", href: "#features" },
  { name: "MEMBERSHIP", href: "#membership" },
  { name: "LOCATION", href: "#location" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Hide nav on scroll down, show on scroll up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    // Add background when scrolled
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-white/10 dark:border-white/10 border-black/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="relative z-50 group">
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-2xl text-foreground tracking-tighter group-hover:text-blazing-flame transition-colors">
                LUXURY
              </span>
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground group-hover:text-foreground transition-colors">
                PADEL CLUB
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-mono tracking-widest text-muted-foreground hover:text-blazing-flame transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blazing-flame transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <ModeToggle />
            <button className="px-6 py-2 border border-foreground/20 text-foreground font-display font-bold text-sm tracking-wide hover:bg-blazing-flame hover:border-blazing-flame hover:text-white transition-all duration-300 uppercase">
              Book Now
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex items-center gap-4 md:hidden">
            <ModeToggle />
            <button
              className="relative z-50 text-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE FULLSCREEN MENU */}
      <motion.div
        initial={{ opacity: 0, pointerEvents: "none" }}
        animate={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 md:hidden"
      >
        {NAV_LINKS.map((link, i) => (
          <motion.div
            key={link.name}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: menuOpen ? 0 : 20, opacity: menuOpen ? 1 : 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            <Link
              href={link.href}
              className="text-4xl font-display font-bold text-foreground hover:text-blazing-flame transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
