"use client";

import Image from "next/image";
import { useState } from "react";

const Nutritional = () => (
  <>
    <p className="border-b border-[#565656] py-4 transition-all duration-300">
      <strong className="font-semibold">Total fat</strong>{" "}
      <span
        className="float-right font-normal"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        30g
      </span>
    </p>
    <p className="border-b border-[#565656] py-4 transition-all duration-300">
      <strong className="font-semibold">Total fat</strong>{" "}
      <span
        className="float-right font-normal"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        30g
      </span>
    </p>
    <p className="border-b border-[#565656] py-4 transition-all duration-300">
      <strong className="font-semibold">Total fat</strong>{" "}
      <span
        className="float-right font-normal"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        30g
      </span>
    </p>
  </>
);

const Recipe = () => (
  <p className="py-2 transition-all duration-300">Loading...</p>
);

const Restaurants = () => (
  <p className="py-2 transition-all duration-300">Loading...</p>
);

export default function Page() {
  const [activeTab, setActiveTab] = useState("nutritional");

  const renderContent = () => {
    switch (activeTab) {
      case "nutritional":
        return <Nutritional />;
      case "recipe":
        return <Recipe />;
      case "restaurants":
        return <Restaurants />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen background text-foreground flex justify-center items-start">
      <div className="w-full max-w-md bg-[#1a1a1a] shadow-lg relative">
        <div className="absolute top-0 left-0 w-full h-80">
          <Image
            src="/images/bgimage.png"
            alt="Matcha Pancake"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center pt-64">
          <div className="bg-[#282828] bg-opacity-90 rounded-t-4xl p-6 max-w-md shadow-lg w-full">
            <div className="flex items-center justify-center mb-6">
              <span className="w-12 h-1 bg-[#565656] rounded-md"></span>
            </div>
            <h1
              className="text-[#9E9E9E] text-lg text-left font-medium mb-2"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Matcha Pancake
            </h1>
            <p
              className="text-2xl font-normal text-[#EAEAEA] mb-4"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              This Healthy Matcha pancake is the universal delight of matcha
              breakfast.{" "}
              <span className="text-[#565656] text-base">View More</span>
            </p>

            <div
              className="grid grid-cols-2  gap-4 text-sm mb-4"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              <div className="flex items-center space-x-2">
                <div className="bg-[#FFEDE7] w-10 h-10 rounded-md flex items-center justify-center">
                  <Image
                    src="/icons/calorie-icon.png"
                    alt="Calories"
                    width={16.84}
                    height={20.96}
                    sizes="50px"
                  />
                </div>
                <span className="text-base">120 Calories</span>
              </div>

              <div className="flex items-center space-x-2">
                <div className="bg-[#FFEDE7] w-10 h-10 rounded-md flex items-center justify-center">
                  <Image
                    src="/icons/fats-icon.png"
                    alt="Fats"
                    width={16.84}
                    height={20.96}
                    sizes="50px"
                  />
                </div>
                <span className="text-base">91g Fats</span>
              </div>

              <div className="flex items-center space-x-2">
                <div className="bg-[#FFEDE7] w-10 h-10 rounded-md flex items-center justify-center">
                  <Image
                    src="/icons/carbs-icon.png"
                    alt="Carbs"
                    width={16.84}
                    height={20.96}
                    sizes="50px"
                  />
                </div>
                <span className="text-base">65g Carbs</span>
              </div>

              <div className="flex items-center space-x-2">
                <div className="bg-[#FFEDE7] w-10 h-10 rounded-md flex items-center justify-center">
                  <Image
                    src="/icons/protein-icon.png"
                    alt="Calories"
                    width={16.84}
                    height={20.96}
                    sizes="50px"
                  />
                </div>
                <span className="text-base">27g Proteins</span>
              </div>
            </div>

            <div className="bg-[#2C2C2C] p-1 rounded-md">
              <div className="flex flex-col sm:flex-row justify-around text-sm">
                <button
                  className={`p-4 rounded-md text-sm border-b-2 ${activeTab == "nutritional" ? "bg-[#EAEAEA] text-black" : "bg-[#2C2C2C]"}`}
                  onClick={() => setActiveTab("nutritional")}
                  style={{ fontFamily: "var(--font-source-serif-pro)" }}
                >
                  Nutritional Value
                </button>

                <button
                  className={`p-4 rounded-md text-sm border-b-2 ${activeTab == "recipe" ? "bg-[#EAEAEA] text-black" : "bg-[#2C2C2C]"}`}
                  onClick={() => setActiveTab("recipe")}
                  style={{ fontFamily: "var(--font-source-serif-pro)" }}
                >
                  Recipe
                </button>

                <button
                  className={`p-4 rounded-md text-sm border-b-2 ${activeTab == "restaurants" ? "bg-[#EAEAEA] text-black" : "bg-[#2C2C2C]"}`}
                  onClick={() => setActiveTab("restaurants")}
                  style={{ fontFamily: "var(--font-source-serif-pro)" }}
                >
                  Restaurant
                </button>
              </div>
            </div>

            <div className="mt-4 p-4">{renderContent()}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
