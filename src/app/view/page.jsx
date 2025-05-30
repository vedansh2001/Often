'use client'

import { useEffect } from 'react'
import CoverImage from '../../components/form/CoverImage.jsx'
import ThemeSelector from '../../components/form/ThemeSelector.jsx'
import EventDetails from '../../components/form/EventDetails'
import ConfigSettings from '../../components/form/ConfigSettings'
import { Globe, ChevronDown } from 'lucide-react'
import useInviteStore from '../../lib/zustandStore'
import { VideoPlayer } from '../../components/remotion/VideoPlayer'

export default function ViewInvitePage() {
  const {
    selectedTheme,
    selectedThemeType,
    setStateFromResponse, // ✅ make sure you have this action in zustand store
  } = useInviteStore()

  useEffect(() => {
    const responseData = localStorage.getItem('response')
    if (responseData) {
      try {
        const parsed = JSON.parse(responseData)
        setStateFromResponse(parsed) // ✅ Load response.json into store
      } catch (error) {
        console.error('Failed to parse response.json:', error)
      }
    }
  }, [])

  return (
    <main className="relative min-h-screen flex flex-col items-center text-white px-4 py-10 overflow-hidden">
      {/* Main container */}
      <div className="relative z-10 bg-[#3D1D52]/80 p-6 rounded-2xl w-full max-w-5xl flex flex-col md:flex-row gap-6">

        {/* LEFT - Cover Image + Theme */}
        <div className="space-y-4 basis-[40%]">
          <CoverImage />
          <ThemeSelector />
        </div>

        {/* RIGHT - Form Details with background media */}
        <div className="space-y-6 basis-[60%] relative overflow-hidden rounded-2xl">

          {/* Background media: video or image */}
          {selectedTheme && selectedThemeType?.startsWith('video') ? (
            <video
              src={selectedTheme}
              autoPlay
              loop
              muted
              className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
            />
          ) : selectedTheme ? (
            <img
              src={selectedTheme}
              alt="Background"
              className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
            />
          ) : null}

          {/* Foreground content */}
          <div className="relative z-10 p-4">
            <div className="flex justify-between text-sm mb-4">
              <span className="bg-white/10 px-3 py-1 rounded-full">Personal Calendar</span>
              <span className="flex bg-white/10 px-3 py-1 rounded-full gap-1 items-center">
                <Globe size={12} color="grey" />
                Public
                <ChevronDown size={14} color="grey" />
              </span>
            </div>

            <EventDetails />
            <ConfigSettings />
          </div>
        </div>
      </div>

      {/* ✅ Remotion video player appears here */}
      <div className="mt-10 w-full max-w-5xl">
        <VideoPlayer />
      </div>
    </main>
  )
}
