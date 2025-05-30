'use client';

import { PanelTop, ChevronsUpDown, Shuffle } from "lucide-react";
import { useRef } from "react";
import useInviteStore from '../../lib/zustandStore';

export default function ThemeSelector() {
  const showSelect = useInviteStore((state) => state.showSelect);
  const setShowSelect = useInviteStore((state) => state.setShowSelect);

  const selectedTheme = useInviteStore((state) => state.selectedTheme);
  const setSelectedTheme = useInviteStore((state) => state.setSelectedTheme);
  const setSelectedThemeType = useInviteStore((state) => state.setSelectedThemeType);

  const fileInputRef = useRef(null);

  const handleThemeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setSelectedTheme(previewURL);
      setSelectedThemeType(file.type);
      setShowSelect(false);
    }
  };

  const handleSelectChange = (e) => {
    const url = e.target.value;
    setSelectedTheme(url);
    if (url.endsWith('.mp4')) {
      setSelectedThemeType('video/mp4');
    } else {
      setSelectedThemeType('image');
    }
    setShowSelect(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex w-full items-stretch h-[50px] gap-1">
      <div className="flex w-[87%] items-center bg-[#2B0E3D] px-2 rounded-lg gap-2 h-full">
        <PanelTop size={36} color="grey" />

        <div className="flex justify-between items-center w-full">
          <div>
            <p className="text-[10px] text-gray-400">Theme</p>
            <p className="text-[14px] text-white capitalize truncate max-w-[150px]">
              {selectedTheme}
            </p>
          </div>

          <div className="relative flex items-center">
            <button
              onClick={() => setShowSelect(!showSelect)}
              className="flex items-center space-x-1 cursor-pointer"
            >
              <ChevronsUpDown size={18} color="grey" />
            </button>

            {showSelect && (
              <select
                value={selectedTheme}
                onChange={handleSelectChange}  // <-- FIXED here
                className="absolute top-8 right-0 bg-white text-black text-sm border border-gray-300 rounded shadow-sm outline-none"
              >
                <option value="/People-walking.mp4">People walking video</option>
                <option value="/Beach.mp4">Beach video</option>
              </select>
            )}
          </div>
        </div>
      </div>

      <div
        className="flex items-center justify-center w-[13%] bg-[#2B0E3D] rounded-lg h-full cursor-pointer"
        onClick={triggerFileInput}
      >
        <Shuffle size={18} color="grey" />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleThemeUpload}
          accept="image/*,video/mp4"
          className="hidden"
        />
      </div>
    </div>
  );
}
