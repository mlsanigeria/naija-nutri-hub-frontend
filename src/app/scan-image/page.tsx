"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
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
  const user = useAuthStore((s) => s.user);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  let [imageBlob, setImageBlob] = useState<Blob | null>(null);
  // const [result, setResult] = useState<IClassificationResult | null>({
  //   food_name: "Jollof Rice",
  //   description: "A popular West African rice dish cooked in tomato sauce with spices",
  //   origin: "West Africa",
  //   spice_level: "Medium",
  //   main_ingredients: ["Rice", "Tomato", "Onion", "Pepper"],
  //   source: "Camera"
  // });

  const [result, setResult] = useState<IClassificationResult | null>(null);

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

  const captureImage = async () => {
    let imageCapture: ImageCapture | null = null;
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      const captureTrack = tracks[tracks.length - 1];
      imageCapture = new ImageCapture(captureTrack);
      const image = await imageCapture.takePhoto();
      setPreviewImage(URL.createObjectURL(image));
      setImageBlob(image);
    }
  };

  const addFile = ($event: ChangeEvent<HTMLInputElement>) => {
    const file = $event.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImageBlob(file);
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

  useEffect(() => {
    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return !result ? (
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
        className={`relative w-full aspect-square flex-1 overflow-hidden flex items-center justify-center
    ${loading || error ? "bg-transparent border-2 border-dashed border-neutral-600 rounded-3xl" : "hidden"}
  `}
        style={{ height: "70vh" }}
      >
        {error ? (
          <p className="h-full flex items-center justify-center text-center text-sm text-red-400 px-4">
            {error}
          </p>
        ) : loading ? (
          <p className="h-full flex items-center justify-center text-neutral-500 text-sm">
            Initializing camera...
          </p>
        ) : (
          ""
        )}
      </div>

      <div
        // className="absolute invisible left-[-100vw]"
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

      {/* Camera Controls */}
      <div className="flex flex-col items-center gap-4 py-6 px-6">
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
        <div className="my-4">
          <p className="text-[#EAEAEA] text-sm border-b-1 py-2 mb-4">Preview</p>
          <div>
            <img
              className="rounded-lg w-full aspect-square"
              src={previewImage!}
              alt=""
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
