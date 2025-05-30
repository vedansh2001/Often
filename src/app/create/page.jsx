'use client'

import CoverImage from '@/components/Form/CoverImage.jsx'
import ThemeSelector from '@/components/Form/ThemeSelector.jsx'
import EventDetails from '@/components/Form/EventDetails'
import ConfigSettings from '@/components/Form/ConfigSettings'
import { Globe, ChevronDown } from "lucide-react"
import useInviteStore from '@/lib/zustandStore'
import { useRouter } from 'next/navigation'

export default function CreatePage() {

  const router = useRouter()

  const {
    eventName,
    eventDate,
    nights,
    location,
    coverImage,
    theme,
    backgroundMedia,
    startDate,
    startTime,
    endDate,
    endTime,
    image,
    showSelect,
    selectedTheme,
    price,
    isEditing,
    isApproved,
    isEditingCapacity,
    capacity
  } = useInviteStore((state) => state)

  // Handle "Create Event" click
  const handleCreateEvent = () => {
    const creatingJson = {
      event_name: eventName,
      event_date: eventDate,
      nights,
      location,
      cover_image_url: coverImage,
      theme,
      background_media: backgroundMedia,
      start_date: startDate,
      start_time: startTime,
      end_date: endDate,
      end_time: endTime,
      image_url: image,
      show_select: showSelect,
      selected_theme: selectedTheme,
      price,
      is_editing: isEditing,
      is_approved: isApproved,
      is_editing_capacity: isEditingCapacity,
      capacity,
    };

    // ✅ Save the creating JSON to localStorage
    localStorage.setItem('creating', JSON.stringify(creatingJson));

    console.log("Saved creating.json to localStorage:", creatingJson);
    router.push('/view');
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-[#3D1D52] text-white px-4 py-10">
      <div className="bg-[#3D1D52] p-6 rounded-2xl w-full max-w-5xl flex flex-col md:flex-row gap-6">

        {/* LEFT - Cover Image + Theme */}
        <div className="space-y-4 basis-[40%]">
          <CoverImage />
          <ThemeSelector />
        </div>

        {/* RIGHT - Form Details */}
        <div className="space-y-6 basis-[60%]">
          <div className="flex justify-between text-sm">
            <span className="bg-white/10 px-3 py-1 rounded-full">Personal Calendar</span>
            <span className="flex bg-white/10 px-3 py-1 rounded-full gap-1 items-center">
              <Globe size={12} color="grey" />
              Public
              <ChevronDown size={14} color="grey" />
            </span>
          </div>

          <EventDetails />
          <ConfigSettings />

          <div className='w-full flex justify-center gap-1 mt-4'>
            <button
              onClick={handleCreateEvent}
              className="w-1/3 bg-gray-100 text-black font-semibold py-3 rounded-lg cursor-pointer"
            >
              Create Event
            </button>
            <button
              onClick={handleCreateEvent}
              className="w-1/3 bg-gray-100 text-black font-semibold py-3 rounded-lg cursor-pointer"
            >
              Preview
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
