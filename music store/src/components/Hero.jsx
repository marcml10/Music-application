import { useEffect, useState } from "react";

const themes = [
  {
    id: "audio-interfaces",
    label: "Audio Interfaces",
    description: "Bridge your instruments to your DAW with pristine, low-latency conversion.",
    image: "https://images.unsplash.com/photo-1655560378499-1c57fde68345?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "cables",
    label: "Cables",
    description: "Studio-grade signal paths. Zero compromise on tone.",
    image: "https://images.unsplash.com/photo-1602331133462-d002177a9cec?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "amplifiers",
    label: "Amplifiers",
    description: "From bedroom tone to headline-ready stacks.",
    image: "https://images.unsplash.com/photo-1625803056683-4dc2a3e92258?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "mixers",
    label: "Mixers",
    description: "Full control over every channel — live or in the box.",
    image: "https://images.unsplash.com/photo-1568993703320-07e80bc8e7ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "microphones",
    label: "Microphones",
    description: "Capture every nuance — vocals, rooms, instruments.",
    image: "https://images.unsplash.com/photo-1588800347304-ec7e6f353327?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "studio-monitors",
    label: "Studio Monitors",
    description: "Flat, accurate reproduction. Mix with confidence.",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=900&h=900&fit=crop&q=90",
  },
  {
    id: "headphones",
    label: "Headphones & IEMs",
    description: "Reference listening from studio to stage.",
    image: "https://images.unsplash.com/photo-1785086259065-7afc30bddc4a?q=80&w=669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D0",
  },
  {
    id: "accessories",
    label: "Accessories",
    description: "Stands, straps, tuners, cases — every detail counts.",
    image: "https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % themes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentTheme = themes[currentIndex];

  return (
    <section className="w-full">
      <div className="relative w-full h-[60vh] overflow-hidden rounded-b-[32px]">
        {themes.map((theme, index) => (
          <img
            key={theme.id}
            src={theme.image}
            alt={theme.label}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Text — centred */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <p className="text-xs font-semibold tracking-widest text-white/80 uppercase mb-3 drop-shadow-md">
            Explore Collection
          </p>
          <div className="h-[120px] flex flex-col items-center justify-center">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-lg transition-all duration-500">
              {currentTheme.label}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/90 max-w-md drop-shadow-md transition-all duration-500">
              {currentTheme.description}
            </p>
          </div>
          <a
            href="#"
            className="mt-7 inline-block text-sm font-medium text-white border border-[#FCA5A5] px-7 py-3 rounded-full transition-all duration-200"
            onMouseEnter={e => {
              e.currentTarget.style.background = "#000000";
              e.currentTarget.style.borderColor = "#000000";
              e.currentTarget.style.color = "#c17f3a";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "";
              e.currentTarget.style.borderColor = "#FCA5A5";
              e.currentTarget.style.color = "white";
            }}
          >
            Shop {currentTheme.label}
          </a>
        </div>
        
        {/* Slider dots */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
          {themes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-[#FCA5A5] w-6" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}