import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    navigate(`/course/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-zinc-900 dark:to-zinc-800 py-24 px-4 text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
        
        {/* Heading */}
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
          Find the Best Course for You
        </h1>

        <p className="text-gray-200 dark:text-gray-400 text-sm sm:text-base">
          Discover, learn, and upskill with our wide range of professional courses.
        </p>

        {/* Search Box */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex w-full max-w-xl bg-white dark:bg-zinc-900 rounded-full shadow-lg overflow-hidden"
        >
          <input
            type="text"
            className="flex-grow bg-transparent px-5 py-3 text-sm sm:text-base focus:outline-none dark:text-gray-100"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-3 text-sm sm:text-base transition"
          >
            Search
          </button>
        </form>

        {/* Explore Button */}
        <Button
          onClick={() => navigate("/course/search?query")}
          variant="outline"
          className="rounded-full bg-white dark:bg-zinc-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-zinc-800 transition"
        >
          Explore Courses
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
