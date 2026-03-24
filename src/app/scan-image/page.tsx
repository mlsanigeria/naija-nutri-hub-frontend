"use client";

import { ChangeEvent, useEffect, useRef, useState, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import { ScannedImagePreview } from "@/components/features/scan-image/result-preview";
import { useAuthStore } from "@/stores/auth";

interface IClassificationResult {
  food_name: string;
  description: string;
  origin: string;
  spice_level: string;
  main_ingredients: string[];
  source: string;
  image: Blob | string;
}

export default function ScanImagePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);

  const [result, setResult] = useState<IClassificationResult | null>(null);

  // Centralized camera stop function
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current?.srcObject) {
      const videoStream = videoRef.current.srcObject as MediaStream;
      videoStream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  }, []);

  const scrollToPreview = () => {
    setTimeout(() => {
      previewRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const captureImage = async () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const stream = video.srcObject as MediaStream;

    if (!stream) {
      setError("Camera not ready. Please try again.");
      return;
    }

    // Wait for video to be ready if dimensions aren't available yet
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      await new Promise<void>((resolve) => {
        const checkReady = () => {
          if (video.videoWidth > 0 && video.videoHeight > 0) {
            resolve();
          }
        };
        video.addEventListener("loadeddata", checkReady, { once: true });
        // Check immediately in case already loaded
        checkReady();
        // Timeout fallback after 2 seconds
        setTimeout(resolve, 2000);
      });
    }

    try {
      // Try ImageCapture API first (Chrome, Edge)
      if (typeof ImageCapture !== "undefined") {
        const tracks = stream.getVideoTracks();
        if (tracks.length > 0) {
          const imageCapture = new ImageCapture(tracks[0]);
          const image = await imageCapture.takePhoto();
          setPreviewImage(URL.createObjectURL(image));
          setImageBlob(image);
          scrollToPreview();
          return;
        }
      }
    } catch (err) {
      console.warn("ImageCapture failed, using canvas fallback:", err);
    }

    // Fallback: use canvas to capture frame (works in all browsers)
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setPreviewImage(URL.createObjectURL(blob));
            setImageBlob(blob);
            scrollToPreview();
          }
        },
        "image/jpeg",
        0.9,
      );
    }
  };

  const addFile = ($event: ChangeEvent<HTMLInputElement>) => {
    const file = $event.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImageBlob(file);
      scrollToPreview();
    }
  };

  const scanImage = async () => {
    if (imageBlob) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("image", imageBlob!);
        const response = await axiosInstance.post(
          "/features/food_classification",
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        const classificationResult: IClassificationResult = {
          ...response.data.classification_result,
          image: previewImage,
        };
        setResult(classificationResult);
      } catch (err) {
        console.error("Image scanning error:", err);
        setError("Failed to scan image. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Stop camera when pathname changes (navigating away)
  useEffect(() => {
    if (pathname !== "/scan-image") {
      stopCamera();
    }
  }, [pathname, stopCamera]);

  // Main camera initialization
  useEffect(() => {
    const initCamera = async () => {
      try {
        setLoading(true);
        setIsStarted(true);
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        streamRef.current = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setLoading(false);
        }
      } catch (err) {
        console.error("Camera access error:", err);
        setError("Unable to access camera. Please allow camera permissions.");
        setLoading(false);
      }
    };

    initCamera();

    // Handle beforeunload (page refresh, close)
    const handleBeforeUnload = () => {
      stopCamera();
    };

    // Handle popstate (browser back/forward)
    const handlePopState = () => {
      stopCamera();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      stopCamera();
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [stopCamera]);

  return !result ? (
    <main className="flex flex-col min-h-screen text-white px-4">
      {/* Hidden canvas for image capture fallback */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => {
            stopCamera();
            router.back();
          }}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white"
        >
          <ArrowLeft className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Title */}
      <div className="pt-24 pb-4 px-6">
        <h1 className="text-2xl font-semibold text-center">Scan food image</h1>
      </div>

      {/* Responsive container wrapper */}
      <div className="flex justify-center w-full">
        <div className="w-full max-w-md">
          {/* Camera Container - Loading/Error state */}
          <div
            className={`relative w-full aspect-square overflow-hidden flex items-center justify-center
              ${loading || error ? "bg-transparent border-2 border-dashed border-neutral-600 rounded-3xl" : "hidden"}
            `}
          >
            {error ? (
              <p className="h-full flex items-center justify-center text-center text-sm text-red-400 px-4">
                {error}
              </p>
            ) : loading ? (
              <p className="h-full flex items-center justify-center text-neutral-500 text-sm">
                Initializing camera...
              </p>
            ) : null}
          </div>

          {/* Camera Video */}
          <div
            className={
              isStarted && !loading
                ? "w-full aspect-square object-cover rounded-lg relative"
                : "absolute invisible left-[-100vw]"
            }
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover rounded-[32px] bg-black"
            ></video>

            <div
              className="pointer-events-none absolute top-0 left-0 w-12 h-12 
              border-[3px] border-[#F7D5C8] border-r-0 border-b-0 
              rounded-tl-[24px]"
            ></div>

            <div
              className="pointer-events-none absolute top-0 right-0 w-12 h-12 
              border-[3px] border-[#F7D5C8] border-l-0 border-b-0 
              rounded-tr-[24px]"
            ></div>

            <div
              className="pointer-events-none absolute bottom-0 left-0 w-12 h-12 
              border-[3px] border-[#F7D5C8] border-r-0 border-t-0 
              rounded-bl-[24px]"
            ></div>

            <div
              className="pointer-events-none absolute bottom-0 right-0 w-12 h-12 
              border-[3px] border-[#F7D5C8] border-l-0 border-t-0 
              rounded-br-[24px]"
            ></div>
          </div>
        </div>
      </div>

      {/* Camera Controls */}
      <div className="flex flex-col items-center gap-4 py-6 px-6 w-full max-w-md mx-auto">
        {/* Capture Button */}
        <button
          onClick={captureImage}
          className="bg-[#FC865C] px-8 py-2 rounded-md cursor-pointer"
        >
          Take Photo
        </button>

        <label className="flex items-center gap-4 bg-[#2C2C2C] py-2 px-3 rounded-md mt-2 cursor-pointer">
          <span>
            <img src="/icons/upload-icon.png" alt="upload" />
          </span>
          <span className="text-[#FDC7B4] text-sm">Add photos & files</span>
          <input
            type="file"
            accept="image/*"
            onChange={addFile}
            className="hidden"
          />
        </label>

        {/* Footer Text */}
        {/* <p className="text-center text-xs text-neutral-400 max-w-xs">
          Scan a photo or upload an image to identify your food and its
          nutritional information.
        </p> */}
      </div>

      {previewImage && (
        <div ref={previewRef} className="my-4 w-full max-w-md mx-auto px-4">
          <p className="text-[#EAEAEA] text-sm border-b-1 py-2 mb-4">Preview</p>
          <div>
            <img
              className="rounded-lg w-full aspect-square object-cover"
              src={previewImage!}
              alt="Captured preview"
            />
          </div>

          <div className="flex justify-center mt-5">
            <button
              onClick={scanImage}
              disabled={loading}
              className="bg-[#FC865C] px-8 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Scanning..." : "Scan Image"}
            </button>
          </div>
        </div>
      )}
    </main>
  ) : (
    <ScannedImagePreview
      food_name={result.food_name}
      description={result.description}
      origin={result.origin}
      spice_level={result.spice_level}
      main_ingredients={result.main_ingredients}
      source={result.source}
      image={result.image}
    />
  );
}
