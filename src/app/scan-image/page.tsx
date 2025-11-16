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
    <main className="flex flex-col min-h-screen text-white">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <Link
          href="/"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
      </div>

      {/* Title */}
      <div className="pt-16 pb-4 px-6">
        <h1 className="text-2xl font-semibold text-center">Scan food image</h1>
      </div>

      {/* Camera Container */}
      <div
        className={`relative w-full flex-1 overflow-hidden flex items-center justify-center
        ${loading || error ? "bg-transparent border-2 border-dashed border-neutral-600 mx-6 rounded-3xl" : ""}
      `}
        style={{ height: '70vh' }}
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
              ? "w-full aspect-square object-cover"
              : "absolute invisible left-[-100vw]"
          }
        />
      </div>

      {/* Camera Controls */}
      <div className="flex flex-col items-center gap-4 py-6 px-6">
        {/* Capture Button */}
        <button
          className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white/20 border-4 border-white hover:bg-[#e97910f8] transition-all active:scale-95"
          onClick={() => {
            // Add capture logic here
            console.log('Capture photo');
          }}
        >
          <div className="w-16 h-16 rounded-full bg-white" />
        </button>

        {/* Footer Text */}
        <p className="text-center text-xs text-neutral-400 max-w-xs">
          Scan a photo or upload an image to identify your food and its
          nutritional information.
        </p>
      </div>
    </main>
  );
}
