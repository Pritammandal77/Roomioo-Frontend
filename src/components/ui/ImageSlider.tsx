"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageSlider({ images }: { images: any[] }) {
  const [index, setIndex] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm flex flex-col-reverse md:flex-row gap-4">
      
      {/* LEFT THUMBNAILS */}
      <div className="flex md:flex-col gap-2 md:w-24 overflow-x-auto">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.url}
            onClick={() => setIndex(i)}
            className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition ${
              index === i ? "border-green-500 scale-95" : "border-transparent"
            }`}
          />
        ))}
      </div>

      {/* RIGHT SLIDER */}
      <div className="relative flex-1 h-80 md:h-105 rounded-2xl overflow-hidden">
        
        {/* SLIDING CONTAINER */}
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${index * 100}%)`,
          }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={img.url}
              className="w-full h-full object-cover shrink-0"
            />
          ))}
        </div>

        {/* LEFT BTN */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
        >
          <ChevronLeft size={20} />
        </button>

        {/* RIGHT BTN */}
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}