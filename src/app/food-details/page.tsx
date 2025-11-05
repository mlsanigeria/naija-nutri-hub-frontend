"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function FoodDetailsPage() {
  const [activeTab, setActiveTab] = useState("nutritional");
  const [ingredientsExpanded, setIngredientsExpanded] = useState(false);
  const [ingredientsHeight, setIngredientsHeight] = useState(0);
  const ingredientsRef = useRef<HTMLDivElement>(null);

  // Calculate height for smooth animation
  useEffect(() => {
    if (ingredientsRef.current) {
      setIngredientsHeight(
        ingredientsExpanded ? ingredientsRef.current.scrollHeight : 0,
      );
    }
  }, [ingredientsExpanded]);

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-foreground flex justify-center items-start">
      <div className="w-full max-w-md bg-[#1a1a1a] shadow-lg relative mt-8">
        {/* Background Image */}
        <div className="relative h-80 w-full">
          <Image
            src="/images/Jollof-rice.png"
            alt="Jollof Rice"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Content Card */}
        <div className="relative -top-6 bg-[#282828] rounded-t-3xl pt-6 px-6 pb-8">
          {/* Drag Handle */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-1 bg-[#565656] rounded-full"></div>
          </div>

          {/* Food Title and Description */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-[#EAEAEA] mb-2">
              Jollof rice
            </h1>
            <p className="text-[#9E9E9E] text-base leading-relaxed">
              A flavorful and iconic Nigerian dish made with long-grain rice
              simmered in a rich tomato and pepper-based sauce...{" "}
              <span className="text-[#565656] cursor-pointer">View More</span>
            </p>
          </div>

          {/* Food Attributes Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-3 bg-[#FFEDE7] p-3 rounded-xl">
              <img
                src="/icons/maps-global-01.png"
                alt="Food Origin"
                className="w-8 h-8 object-contain"
              />
              <div className="space-y-1">
                <h3 className="text-[#FC865C] text-sm font-medium">
                  Food Origin
                </h3>
                <p className="text-[#FC865C] text-base">Western</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-[#FFEDE7] p-3 rounded-xl">
              <img
                src="/icons/pepicons-print_fire.png"
                alt="Spice Level"
                className="w-8 h-8 object-contain"
              />
              <div className="space-y-1">
                <h3 className="text-[#FC865C] text-sm font-medium">
                  Spice Level
                </h3>
                <p className="text-[#FC865C] text-base">Spicy</p>
              </div>
            </div>
          </div>

          {/* Main Ingredients - Animated Collapsible Section */}
          <div className="mb-6">
            <button
              className="flex items-center justify-between w-full text-left mb-2"
              onClick={() => setIngredientsExpanded(!ingredientsExpanded)}
            >
              <h3 className="text-[#EAEAEA] text-lg font-semibold">
                Main Ingredients
              </h3>
              <svg
                className={`w-5 h-5 text-[#9E9E9E] transition-transform duration-300 ${
                  ingredientsExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Animated dropdown content */}
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{ height: `${ingredientsHeight}px` }}
            >
              <div ref={ingredientsRef} className="pl-2">
                <ul className="text-[#9E9E9E] space-y-2">
                  <li className="flex items-center transition-all duration-200 hover:text-[#EAEAEA]">
                    <span className="w-1.5 h-1.5 bg-[#565656] rounded-full mr-3"></span>
                    Tomatoes
                  </li>
                  <li className="flex items-center transition-all duration-200 hover:text-[#EAEAEA]">
                    <span className="w-1.5 h-1.5 bg-[#565656] rounded-full mr-3"></span>
                    Bell Peppers
                  </li>
                  <li className="flex items-center transition-all duration-200 hover:text-[#EAEAEA]">
                    <span className="w-1.5 h-1.5 bg-[#565656] rounded-full mr-3"></span>
                    Rice
                  </li>
                  <li className="flex items-center transition-all duration-200 hover:text-[#EAEAEA]">
                    <span className="w-1.5 h-1.5 bg-[#565656] rounded-full mr-3"></span>
                    Oil
                  </li>
                  <li className="flex items-center transition-all duration-200 hover:text-[#EAEAEA]">
                    <span className="w-1.5 h-1.5 bg-[#565656] rounded-full mr-3"></span>
                    Salt/ Seasoning
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 w-full pb-6 rounded-xl">
            <Link
              href="/nutritional-value"
              className="w-full py-2 rounded-xl text-md font-medium text-black bg-[#FB6E3D] shadow-[0_3px_0_#FDAC8F] hover:scale-[1.02] active:translate-y-[2px] transition-all duration-200 text-center"
            >
              Nutritional value
            </Link>

            <Link
              href="/recipe"
              className="w-full py-2 rounded-xl text-md font-medium text-black bg-[#FB6E3D] shadow-[0_3px_0_#FDAC8F] hover:scale-[1.02] active:translate-y-[2px] transition-all duration-200 text-center"
            >
              Recipe
            </Link>

            <Link
              href="/food-location"
              className="w-full py-2 rounded-xl text-md font-medium text-black bg-[#FB6E3D] shadow-[0_3px_0_#FDAC8F] hover:scale-[1.02] active:translate-y-[2px] transition-all duration-200 text-center"
            >
              Food Location
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
