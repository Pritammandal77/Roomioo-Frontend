"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Is Roomio free to use?",
    answer:
      "Yes, Roomio is completely free for users. You can browse listings, connect with people, and find your perfect housemate without any brokerage.",
  },
  {
    question: "How does matching work?",
    answer:
      "Roomio matches you with people based on lifestyle, habits, and preferences like cleanliness, sleep schedule, and more.",
  },
  {
    question: "Are profiles verified?",
    answer:
      "Yes, we ensure users are verified through Google login and other checks to maintain a safe and trusted platform.",
  },
  {
    question: "Can I directly contact the person?",
    answer:
      "Absolutely! You can chat or call the person directly after viewing their profile or listing.",
  },
  {
    question: "What type of properties are available?",
    answer:
      "You can find rooms, flats (1BHK, 2BHK, 3BHK), PGs, and hostels — all in one place.",
  },
  {
    question: "Is there any brokerage or hidden charges?",
    answer:
      "No, Roomio has zero brokerage. You connect directly with people without any middlemen or hidden fees.",
  },
  {
    question: "How do I list my room or flat?",
    answer:
      "Simply sign up, fill in your property details like rent, location, and preferences, and your listing will go live in minutes.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full py-24 px-6 bg-linear-to-b from-white to-green-50">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Frequently Asked <span className="text-green-600">Questions</span>
          </h2>
          <p className="mt-4 text-gray-600">
            Everything you need to know about Roomio.
          </p>
        </div>

        {/* FAQ List */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden"
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-gray-800">
                    {faq.question}
                  </span>

                  <span className="text-green-600">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5 text-gray-600 text-sm leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
