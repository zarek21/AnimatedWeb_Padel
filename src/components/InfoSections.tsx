"use client";

import { motion, type Variants } from "framer-motion";
import { Zap, Trophy, Sun, Star } from "lucide-react";
import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

import { Particles } from "@/components/ui/particles";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const cardVariants: Variants = {
  offscreen: { y: 300 },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: { type: "spring", bounce: 0.4, duration: 0.8 },
  },
};

const splashStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
};

function FeatureCard({ item, i }: { item: (typeof FEATURES)[0]; i: number }) {
  const background = `linear-gradient(306deg, #FE3C0A, #ff6b4a)`;
  return (
    <motion.div
      className={`relative mx-auto w-[300px] h-[430px] flex justify-center items-center mb-[60px]`}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
      <div style={{ ...splashStyle, background }} />
      <motion.div
        style={{
          fontSize: 164,
          width: 300,
          height: 430,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
          // Use semantic colors: card background (white in light, black in dark)
        }}
        variants={cardVariants}
        className="card flex-col p-6 text-center relative z-20 shadow-2xl bg-card border border-border"
      >
        <div className="text-blazing-flame mb-6 scale-125">{item.icon}</div>
        <h3 className="text-2xl font-display font-bold mb-4 tracking-tight text-foreground uppercase">
          {item.title}
        </h3>
        <p className="text-muted-foreground font-sans leading-relaxed text-sm">
          {item.desc}
        </p>
      </motion.div>
    </motion.div>
  );
}

const FEATURES = [
  {
    icon: <Sun className="w-12 h-12 text-blazing-flame mb-4" />,
    title: "PANORAMIC GLASS",
    desc: "Seamless visibility. 12mm tempered safety glass for pure spectator immersion.",
  },
  {
    icon: <Trophy className="w-12 h-12 text-blazing-flame mb-4" />,
    title: "WPT SURFACE",
    desc: "The official World Padel Tour turf. Precision bounce and optimal grip.",
  },
  {
    icon: <Zap className="w-12 h-12 text-blazing-flame mb-4" />,
    title: "PRO-LED LIGHTING",
    desc: "Anti-glare, broadcast-ready lighting. Play perfectly, day or night.",
  },
];

const REVIEWS = [
  {
    name: "ALEX R.",
    role: "PRO PLAYER",
    body: "The surface is indistinguishable from the WPT finals. A masterpiece of engineering.",
    img: "https://avatar.vercel.sh/alex",
  },
  {
    name: "SARAH M.",
    role: "CLUB MEMBER",
    body: "The vibe is unmatched. It's not just a club, it's a lifestyle statement.",
    img: "https://avatar.vercel.sh/sarah",
  },
  {
    name: "JAVIER G.",
    role: "COACH",
    body: "Perfect lighting, perfect acoustics. The best facility I've ever coached in.",
    img: "https://avatar.vercel.sh/javier",
  },
  {
    name: "MIGUEL P.",
    role: "TOP 10 REGIONAL",
    body: "Fast courts, amazing hospitality. The best padel experience in the city.",
    img: "https://avatar.vercel.sh/miguel",
  },
  {
    name: "ELENA S.",
    role: "BEGINNER",
    body: "Incredibly welcoming atmosphere despite the luxury feel. Love the clinics!",
    img: "https://avatar.vercel.sh/elena",
  },
  {
    name: "TOM H.",
    role: "ENTHUSIAST",
    body: "The lounge after the game is just as good as the match itself.",
    img: "https://avatar.vercel.sh/tom",
  },
];

// Duplicate for robust scrolling
const EXTENDED_REVIEWS = [...REVIEWS, ...REVIEWS];
const firstRow = EXTENDED_REVIEWS.slice(0, EXTENDED_REVIEWS.length / 2);
const secondRow = EXTENDED_REVIEWS.slice(EXTENDED_REVIEWS.length / 2);

const ReviewCard = ({
  img,
  name,
  role,
  body,
}: {
  img: string;
  name: string;
  role: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-80 cursor-pointer overflow-hidden rounded-xl border p-6 transition-all duration-300",
        "border-border bg-card/50 dark:bg-carbon-black/50 hover:bg-card hover:dark:bg-gray-900 hover:border-blazing-flame backdrop-blur-sm z-10",
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <img
          className="rounded-full border border-border"
          width="40"
          height="40"
          alt=""
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-display font-bold text-white uppercase tracking-wider">
            {name}
          </figcaption>
          <p className="text-xs font-mono text-blazing-flame">{role}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-1">
        {[...Array(5)].map((_, k) => (
          <Star
            key={k}
            className="w-3 h-3 text-blazing-flame fill-blazing-flame"
          />
        ))}
      </div>
      <blockquote className="mt-4 text-sm font-light italic text-muted-foreground">
        "{body}"
      </blockquote>
    </figure>
  );
};

export default function InfoSections() {
  return (
    <div className="bg-background relative w-full overflow-hidden">
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 z-0 h-full w-full"
        quantity={100}
        ease={80}
        color="#FE3C0A"
        refresh
      />

      {/* FEATURES SECTION (ScrollTriggered) */}
      <section className="py-24 px-6 md:px-12 bg-transparent text-foreground relative z-10">
        <div
          style={{
            margin: "50px auto",
            maxWidth: "100%",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "40px",
            justifyItems: "center",
          }}
        >
          {FEATURES.map((feat, idx) => (
            <FeatureCard key={idx} item={feat} i={idx} />
          ))}
        </div>
      </section>

      {/* WHO WE ARE SECTION */}
      <section className="min-h-screen flex flex-col md:flex-row bg-background relative overflow-hidden z-10">
        {/* Extra Particles for this dark section */}
        <Particles
          className="absolute inset-0 z-0 h-full w-full opacity-50"
          quantity={50}
          ease={100}
          color="#888888"
          refresh
        />
        {/* Image Side */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative z-10">
          <Image
            src="/assets/padel_action_shot_1769308819604.png"
            alt="Pro player action shot"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Text Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-12 md:p-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-blazing-flame font-mono text-sm tracking-widest mb-6">
              WHO WE ARE
            </h4>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-8 leading-tight">
              BEYOND THE <br /> GLASS WALLS.
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed font-light">
              We didn't just build courts; we curated an arena. Born from a
              passion for precision and high-performance social contrast. Here,
              the game is sacred, and the après-padel is legendary.
            </p>
            <div className="inline-block border-b-2 border-blazing-flame pb-1 text-foreground font-mono uppercase tracking-widest text-sm hover:text-blazing-flame cursor-pointer transition-colors">
              Read Our Story
            </div>
          </motion.div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-24 bg-background overflow-hidden relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="mb-12 px-6 md:px-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground uppercase tracking-tighter">
            The Venue
          </h2>
        </motion.div>

        {/* Bento Grid Layout - Gestalt: Common Region & Similarity */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6 md:px-12 max-w-[1920px] mx-auto h-auto md:h-[800px]">
          {/* Large Left Item (2x2) */}
          <div className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group h-[300px] md:h-full cursor-pointer">
            <Image
              src="/assets/padel_lounge_luxury_1769308833734.png"
              alt="Luxury Lounge"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient for text readability (Figure/Ground) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

            {/* Visual Advise: Hover Interaction Line */}
            <div className="absolute top-6 right-6 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-lg font-light">+</span>
            </div>

            <div className="absolute bottom-0 left-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-blazing-flame font-mono text-xs tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                SOCIAL HUB
              </p>
              <p className="text-white font-display font-bold text-3xl mb-2">
                THE LOUNGE
              </p>
              <p className="text-gray-400 font-sans text-sm max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                Where connections are made over signature cocktails.
              </p>
            </div>
          </div>

          {/* Top Right Item (2x1) */}
          <div className="md:col-span-2 md:row-span-1 relative rounded-2xl overflow-hidden group h-[300px] md:h-full cursor-pointer">
            <Image
              src="/assets/padel_surface_detail_1769308806437.png"
              alt="WPT Surface"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

            <div className="absolute top-6 right-6 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-lg font-light">+</span>
            </div>

            <div className="absolute bottom-0 left-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-blazing-flame font-mono text-xs tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                TECHNICAL
              </p>
              <p className="text-white font-display font-bold text-2xl mb-2">
                PRECISION SURFACE
              </p>
            </div>
          </div>

          {/* Bottom Middle Item (1x1) */}
          <div className="md:col-span-1 md:row-span-1 relative rounded-2xl overflow-hidden group h-[300px] md:h-full cursor-pointer">
            <Image
              src="/assets/padel_action_shot_1769308819604.png"
              alt="Night Play"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-blazing-flame font-mono text-xs tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                ATMOSPHERE
              </p>
              <p className="text-white font-display font-bold text-xl mb-1">
                NIGHT PLAY
              </p>
            </div>
          </div>

          {/* Bottom Right Item (1x1) */}
          <div className="md:col-span-1 md:row-span-1 relative rounded-2xl overflow-hidden group h-[300px] md:h-full cursor-pointer">
            <Image
              src="/assets/padel_lounge_luxury_1769308833734.png"
              alt="Bar Area"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-blazing-flame font-mono text-xs tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                RELAX
              </p>
              <p className="text-white font-display font-bold text-xl mb-1">
                THE BAR
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-background border-y border-foreground/10 relative z-10">
        <div className="w-full flex flex-col items-center justify-center overflow-hidden">
          <h2 className="text-center text-blazing-flame font-mono text-sm tracking-widest mb-16 relative z-10">
            VOICES FROM THE COURT
          </h2>

          <div className="relative w-full">
            <Marquee pauseOnHover className="[--duration:40s]">
              {firstRow.map((review, i) => (
                <ReviewCard key={i} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:40s] mt-8">
              {secondRow.map((review, i) => (
                <ReviewCard key={i} {...review} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background z-20"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background z-20"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
