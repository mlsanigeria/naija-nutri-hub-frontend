"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-around min-h-screen background text-foreground">
      <div className="flex flex-col items-center max-w-md w-full gap-10 p-8">
        <header className=" flex flex-col items-center ">
          <Image
            src="/images/image.png"
            alt="Food icons"
            width={257}
            height={40}
            className="mb-4"
          />
          <h1
            className="text-3xl font-normal text-center mb-2"
            style={{ fontFamily: "var(--font-source-serif-pro)" }}
          >
            Take a picture of your <span className="text-primary">food</span>,{" "}
            <br /> <span className="text-gray-400">Learn it</span>.{" "}
            <span className="text-gray-400">Make it</span>.
          </h1>

          <div className="flex gap-4">
            <Link
              href="/signup"
              className="block bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-md font-medium transition-colors"
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className="block bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-md text-center font-medium transition-colors"
            >
              Log in
            </Link>
          </div>
        </header>

        <main
          className="flex flex-col items-center w-full gap-4"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          <div className="w-full max-w-md">
            <p className="text-left text-foreground mb-4">
              See what&apos;s on the plate of our <br /> community with
              NutriScan.
            </p>

            <div className="grid grid-cols-3 gap-4 text-left">
              <div className="flex flex-col">
                <Image
                  src="/images/food-image1.svg"
                  alt="Jerk-rice"
                  width={100}
                  height={108}
                  className="rounded-lg mb-2"
                />
                <p className="text-sm">Jellof rice</p>
                <span className="relative inline-block pl-3 text-xs before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-[#FDC7B4]">
                  Tumini F.
                </span>
              </div>
              <div className="flex flex-col">
                <Image
                  src="/images/food-image2.svg"
                  alt="Matcha pancake"
                  width={100}
                  height={108}
                  className="rounded-lg mb-2"
                />
                <p className="text-sm">Matcha pancake</p>
                <span className="relative inline-block pl-3 text-xs before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-[#FDC7B4]">
                  Tumini F.
                </span>
              </div>
              <div className="flex flex-col">
                <Image
                  src="/images/food-image3.svg"
                  alt="Sushi"
                  width={100}
                  height={108}
                  className="rounded-lg mb-2"
                />
                <p className="text-sm">Sushi</p>
                <span className="relative inline-block pl-3 text-xs before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-[#FDC7B4]">
                  Tumini F.
                </span>
              </div>
              <div className="flex flex-col">
                <Image
                  src="/images/food-image4.svg"
                  alt="Chicken burger"
                  width={100}
                  height={108}
                  className="rounded-lg mb-2"
                />
                <p className="text-sm">Chicken burger</p>
                <span className="relative inline-block pl-3 text-xs before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-[#FDC7B4]">
                  Tumini F.
                </span>
              </div>
              <div className="flex flex-col">
                <Image
                  src="/images/food-image5.svg"
                  alt="Beef stew"
                  width={100}
                  height={108}
                  className="rounded-lg mb-2"
                />
                <p className="text-sm">Beef steak</p>
                <span className="relative inline-block pl-3 text-xs before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-[#FDC7B4]">
                  Tumini F.
                </span>
              </div>
              <div className="flex flex-col">
                <Image
                  src="/images/food-image6.svg"
                  alt="Egg & Avocado"
                  width={100}
                  height={108}
                  className="rounded-lg mb-2"
                />
                <p className="text-sm">Egg & Avocado</p>
                <span className="relative inline-block pl-3 text-xs before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-[#FDC7B4]">
                  Tumini F.
                </span>
              </div>
            </div>
          </div>
        </main>

        <footer
          className="flex gap-2 text-center text-foreground text-sm mt-8"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Made with Open Source
          <img src="/icons/mail-open-love.svg" alt="Mail-Open-Love" />
        </footer>
      </div>
    </div>
  );
}
