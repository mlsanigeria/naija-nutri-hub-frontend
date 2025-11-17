"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ScanImagePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const startCamera = async () => {
    try {
      setLoading(true);
      setIsStarted(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setLoading(false);
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Unable to access camera. Please allow camera permissions.");
      setLoading(false);
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <main className="flex flex-col min-h-screen text-white px-4">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <Link
          href="/"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white"
        >
          <ArrowLeft className="w-5 h-5 text-black" />
        </Link>
      </div>

      {/* Title */}
      <div className="pt-24 pb-4 px-6">
        <h1 className="text-2xl font-semibold text-center">Scan food image</h1>
      </div>

      {/* Camera Container */}
      <div
        className={`relative w-full flex-1 overflow-hidden flex items-center justify-center
        ${loading || error ? "bg-transparent border-2 border-dashed border-neutral-600 mx-6 rounded-3xl" : ""}
      `}
        style={{ height: "70vh" }}
      >
        {error ? (
          <p className="text-center text-sm text-red-400 px-4">{error}</p>
        ) : loading ? (
          <p className="w-full text-center text-neutral-500 text-sm">
            Initializing camera...
          </p>
        ) : (
          ""
        )}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={
            isStarted && !loading
              ? "w-full aspect-square object-cover rounded-lg"
              : "absolute invisible left-[-100vw]"
          }
        />
      </div>

      {/* Camera Controls */}
      <div className="flex flex-col items-center gap-4 py-6 px-6">
        {/* Capture Button */}
        <button className="bg-[#FC865C] px-8 py-2 rounded-md">Scan</button>

        <button className="flex items-center gap-4 bg-[#2C2C2C] py-2 px-3 rounded-md mt-2">
          <span>
            <img src="/icons/upload-icon.png" alt="upload" />
          </span>
          <span className="text-[#FDC7B4] text-sm">Add photos & files</span>
        </button>

        {/* Footer Text */}
        {/* <p className="text-center text-xs text-neutral-400 max-w-xs">
          Scan a photo or upload an image to identify your food and its
          nutritional information.
        </p> */}
      </div>

      <div className="my-4">
        <p className="text-[#EAEAEA] text-sm border-b-1 py-2 mb-4">Preview</p>
        <div>
          <img className="rounded-lg" src="/images/jollof-rice.png" alt="" />
        </div>

        <div className="flex justify-center mt-5">
          <button className="bg-[#FC865C] px-8 py-2 rounded-md">Next</button>
        </div>
      </div>
    </main>
  );
}
