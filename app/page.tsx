import Image from "next/image";
import Particles from "./components/particles";

export default function Home() {
  return (
    <main className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-tl from-[#030014] via-purple-800/10 to-[#030014]">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
        
        <h1>HOLA</h1>
     
    </main>
  );
}
