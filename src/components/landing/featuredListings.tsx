"use client";

import { fetchAllListings } from "@/services/rooms.api";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ListingCard from "../ui/ListingCard";
import ListingCardSkeleton from "../loaders/ListingCardSkeleton";

export default function FeaturedListings() {
  const [featuredListings, setFeaturedListings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchListings = async () => {
    try {
      const res = await fetchAllListings();
      setFeaturedListings(res.data || []);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const firstCard = scrollRef.current.firstElementChild as HTMLElement;
      const cardWidth = firstCard?.offsetWidth + 24 || 340;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full py-24 px-3 md:px-6 bg-white overflow-hidden">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-3">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Featured <span className="text-green-600">Listings</span>
            </h2>
            <p className="mt-3 text-gray-600">
              Explore places that match your lifestyle and vibe.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-3 cursor-pointer rounded-full border border-gray-200 hover:bg-gray-100 active:scale-95 transition shadow-sm bg-white"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-3 cursor-pointer rounded-full border border-gray-200 hover:bg-gray-100 active:scale-95 transition shadow-sm bg-white"
              >
                <ArrowRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            <Link href="/listings/all">
              <button className="px-6 py-3 cursor-pointer rounded-xl border border-green-600 text-green-600 hover:bg-green-50 transition font-medium">
                View All
              </button>
            </Link>
          </div>
        </div>

        <div className="relative mt-12">
          <div
            ref={scrollRef}
            className="no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory touch-pan-x pb-4 px-3"
          >
            {loading ? (
              // Cleanly map 4 skeletons to fill the screen
              Array.from({ length: 4 }).map((_, i) => (
                <div 
                  key={i} 
                  className="shrink-0 snap-start w-[85vw] sm:w-87.5 md:w-100"
                >
                  <ListingCardSkeleton />
                </div>
              ))
            ) : featuredListings.length > 0 ? (
              featuredListings.map((listing, index) => (
                <div
                  key={listing._id}
                  className="shrink-0 snap-start mx-2 md:mx-0 w-[85vw] sm:w-87.5 md:w-90 py-3"
                >
                  <ListingCard
                    id={listing._id}
                    listing={listing}
                    index={index}
                  />
                </div>
              ))
            ) : (
              <div className="w-full text-center py-20 text-gray-500">
                No featured listings found.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}