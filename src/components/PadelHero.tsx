"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";

const FRAME_COUNT = 192;

export default function PadelHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [loading, setLoading] = useState(true);

  // Scroll progress for the entire 300vh - 400vh tall hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform scroll progress to frame index (0 to FRAME_COUNT - 1)
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const promises = [];

      for (let i = 0; i < FRAME_COUNT; i++) {
        const promise = new Promise<void>((resolve) => {
          const img = new Image();
          // Pad index with zeros (e.g., 001, 012, 123)
          const paddedIndex = i.toString().padStart(3, "0");
          // Determine filename pattern.
          // NOTE: We need to match the actual filenames in public/frames
          // Based on file list: frame_000_delay-0.042s.jpg
          // We might need to handle the variable delay suffix or just rename them,
          // BUT since I can't easily rename them all perfectly now without a script,
          // I should probably finding the files.
          // OR, since I saw the filenames, they are like `frame_XXX_delay-...`.
          // I'll try to guess, or better, I should have renamed them to simplified names.
          // Let's assume for now I will use a simple robust loader or I'll implement a rename script first.

          // Actually, let's look at the filenames again. They vary.
          // frame_000_delay-0.042s.jpg, frame_001_delay-0.041s.jpg
          // The delay suffix changes. This is annoying for static URL generation.
          // PLAN: I should rename the files in public/frames to frame_000.jpg, frame_001.jpg, etc.
          // I will do that in a separate step before this file works.

          img.src = `/frames/frame_${paddedIndex}.jpg`;
          img.onload = () => {
            loadedImages[i] = img;
            setImagesLoaded((prev) => prev + 1);
            resolve();
          };
          img.onerror = () => {
            // console.error(`Failed to load frame ${i}`);
            resolve();
          };
        });
        promises.push(promise);
      }

      await Promise.all(promises);
      setImages(loadedImages);
      setLoading(false);
    };

    loadImages();
  }, []);

  // Optimize for low power / reduced motion
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) setIsLowPower(true);

    // Check battery status
    if ("getBattery" in navigator) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigator as any).getBattery().then((battery: any) => {
        if (battery.saveMode) setIsLowPower(true);
      });
    }
  }, []);

  // Canvas rendering loop
  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvasRef.current.width = 1920;
    canvasRef.current.height = 1080;

    const render = () => {
      // If low power, simplify: just show one frame (e.g. frame 0 or middle) or update less frequently
      // Here we will just lock it to the current frame index but skip the heavy interpolation if we wanted,
      // but simpler: if isLowPower, maybe just clamp to a few keyframes?
      // For now, we will still render but maybe we could limit FPS.
      // Actually, if reduced motion, we should definitely NOT scroll-animate wildly.

      const index = isLowPower ? 0 : Math.round(frameIndex.get());
      const image = images[index];

      if (image) {
        // Clear and draw
        ctx.clearRect(
          0,
          0,
          canvasRef.current!.width,
          canvasRef.current!.height,
        );

        // Draw image "cover" style (maintain aspect ratio, center)
        const canvas = canvasRef.current!;
        const hRatio = canvas.width / image.width;
        const vRatio = canvas.height / image.height;
        const ratio = Math.max(hRatio, vRatio);

        const centerShift_x = (canvas.width - image.width * ratio) / 2;
        const centerShift_y = (canvas.height - image.height * ratio) / 2;

        ctx.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          centerShift_x,
          centerShift_y,
          image.width * ratio,
          image.height * ratio,
        );
      }

      if (!isLowPower) {
        requestAnimationFrame(render);
      }
    };

    const unsubscribe = frameIndex.on("change", () => {
      // If low power, we might rely on this subscription instead of RAF loop to save battery?
      // But the RAF loop above is triggered once.
    });

    // Start loop
    let rafId: number;
    if (!isLowPower) {
      const loop = () => {
        render();
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    } else {
      // Initial render for static
      render();
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      unsubscribe();
    };
  }, [images, frameIndex, isLowPower]);

  // Opacity Transforms for Text Beats
  const opacityBeatA = useTransform(smoothProgress, [0, 0.2, 0.25], [0, 1, 0]);
  const opacityBeatB = useTransform(
    smoothProgress,
    [0.3, 0.4, 0.55],
    [0, 1, 0],
  );
  const opacityBeatC = useTransform(
    smoothProgress,
    [0.6, 0.7, 0.85],
    [0, 1, 0],
  );
  const opacityBeatD = useTransform(smoothProgress, [0.9, 0.95, 1], [0, 1, 0]);

  return (
    <section ref={containerRef} className="h-[500vh] relative bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Loader */}
        {loading && (
          <div className="absolute z-50 text-blazing-flame font-display text-xl">
            LOADING {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover animate-float"
        />

        {/* Overlay Text Layers */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
          <motion.div style={{ opacity: opacityBeatA }} className="text-center">
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-foreground">
              THE POWER OF <br />{" "}
              <span className="text-blazing-flame">PRECISION</span>
            </h1>
          </motion.div>

          <motion.div
            style={{ opacity: opacityBeatB }}
            className="text-center absolute"
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              AERODYNAMIC CORE
            </h2>
          </motion.div>

          <motion.div
            style={{ opacity: opacityBeatC }}
            className="text-center absolute w-full px-4"
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-4">
              SOCIAL BY NATURE
            </h2>
            <p className="text-2xl font-sans font-light text-blazing-flame tracking-widest">
              COMPETITIVE BY DESIGN
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: opacityBeatD }}
            className="text-center absolute"
          >
            <h2 className="text-6xl md:text-9xl font-display font-bold text-foreground opacity-20">
              YOUR COURT <br /> AWAITS
            </h2>
          </motion.div>

          {/* Scroll Indicator (Visual Advise) */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
            style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
          >
            <span className="text-[10px] font-mono tracking-[0.2em] text-gray-400 uppercase">
              Scroll
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-blazing-flame to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
