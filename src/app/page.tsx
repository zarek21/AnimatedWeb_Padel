import PadelHero from "@/components/PadelHero";
import InfoSections from "@/components/InfoSections";
import BookingMap from "@/components/BookingMap";

export default function Home() {
  return (
    <main className="min-h-screen bg-carbon-black selection:bg-blazing-flame selection:text-white">
      <PadelHero />
      <InfoSections />
      <BookingMap />
    </main>
  );
}
