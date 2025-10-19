"use client";

import { ArrowLeft, Upload } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function UploadImagePage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setSelectedImage(file);
  }

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/scan">
            <ArrowLeft className="text-[#FF7A50]" />
          </Link>
          <h1 className="text-lg font-semibold">Add photos & files</h1>
        </div>

        {/* Upload Zone */}
        <label
          htmlFor="fileUpload"
          className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-700 rounded-2xl py-20 cursor-pointer hover:border-[#FF7A50] transition-all"
        >
          <Upload size={40} className="text-[#FF7A50] mb-4" />
          <p className="text-neutral-400 text-center">
            Drag and drop an image here, or{" "}
            <span className="text-[#FF7A50]">browse files</span>
          </p>
          <input
            id="fileUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Preview */}
        {selectedImage && (
          <div className="mt-6">
            <p className="text-sm text-neutral-400 mb-2">Preview:</p>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="preview"
              className="rounded-xl w-full max-h-80 object-cover border border-neutral-800"
            />
          </div>
        )}

        {/* Footer */}
        <p className="mt-10 text-sm text-neutral-400 max-w-full text-center">
          Scan a photo or upload an image to identify your food and its
          nutritional information.
        </p>
      </div>
    </div>
  );
}
