import React from "react";
import SearchBar from "./search/SearchBar";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full md:pt-36 pt-24 px-7 md:px-0 space-y-8 text-center
      bg-linear-to-b from-purple-400 via-purple-200 to-purple-50
      dark:bg-linear-to-b dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      
      {/* Heading */}
      <h1 className="md:text-home-heading-large text-3xl sm:text-5xl relative font-extrabold 
        text-gray-900 dark:text-slate-100 max-w-4xl mx-auto leading-tight">
        Build skills that shape your future.
        <span className="text-blue-600 dark:text-blue-400">
          {" "}Learn smarter. Grow faster.
        </span>
      </h1>

      {/* Desktop Description */}
      <p className="md:block hidden text-gray-700 dark:text-slate-300 max-w-2xl mx-auto text-lg">
        Learn from industry experts through practical, job-ready courses
        designed to help you succeed in today’s competitive world.
      </p>

      {/* Mobile Description */}
      <p className="md:hidden text-gray-700 dark:text-slate-300 max-w-sm mx-auto">
        Job-ready skills, expert guidance, and learning that actually works.
      </p>

      <SearchBar />

      {/* CTA */}
      <button className="mt-4 bg-blue-600 text-white px-10 py-3 rounded-full 
        hover:bg-purple-700 transition shadow-lg
        dark:bg-blue-500 dark:hover:bg-purple-400">
        Start Your Learning Journey
      </button>
    </section>
  );
};

export default Hero;
