'use client';

import { ImageUp } from "lucide-react";
import Image from 'next/image';
import { useRef } from 'react';
import useInviteStore from '@/lib/zustandStore';

export default function CoverImage() {
  const image = useInviteStore((state) => state.image);
  const setImage = useInviteStore((state) => state.setImage);
  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/10 group">
      <Image
        src={image}
        alt="Cover"
        fill
        className="object-cover"
      />

      <div className="absolute bottom-12 right-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Cover Image
      </div>

      <div
        onClick={triggerFileInput}
        className="absolute bottom-2 right-2 bg-gray-100 rounded-full p-2 cursor-pointer"
      >
        <ImageUp size={18} color="grey" />
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
