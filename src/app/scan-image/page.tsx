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
    <main className="flex flex-col items-center justify-center min-h-screen text-white p-6">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <Link
          href="/"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold mb-8 mt-12">Scan food image</h1>

      {/* Camera Container */}
      <div
        className={`relative w-72 h-72 rounded-[2rem] overflow-hidden flex items-center justify-center
        ${loading || error ? "bg-transparent border-2 border-dashed border-neutral-600" : ""}
      `}
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
              ? "w-full h-full object-cover"
              : "absolute invisible left-[-100vw]"
          }
        />
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-neutral-400 mt-10 max-w-xs">
        Scan a photo or upload an image to identify your food and its
        nutritional information.
      </p>
    </main>
  );
}
