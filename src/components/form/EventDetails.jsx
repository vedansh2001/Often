'use client'
import { MapPin, BookText, Circle, Globe } from "lucide-react";
import { useEffect } from "react";
import useInviteStore from '../../lib/zustandStore';

export default function EventDetails() {
  const startDate = useInviteStore((state) => state.startDate);
  const startTime = useInviteStore((state) => state.startTime);
  const endDate = useInviteStore((state) => state.endDate);
  const endTime = useInviteStore((state) => state.endTime);
  const location = useInviteStore((state) => state.location);
  const description = useInviteStore((state) => state.description);

  const setStartDate = useInviteStore((state) => state.setStartDate);
  const setStartTime = useInviteStore((state) => state.setStartTime);
  const setEndDate = useInviteStore((state) => state.setEndDate);
  const setEndTime = useInviteStore((state) => state.setEndTime);
  const setLocation = useInviteStore((state) => state.setLocation);
  const setDescription = useInviteStore((state) => state.setDescription);

  useEffect(() => {
    const now = new Date();
    setStartDate(now.toISOString().split('T')[0]);
    setStartTime(now.toTimeString().slice(0, 5));
    setEndDate(now.toISOString().split('T')[0]);
    setEndTime(now.toTimeString().slice(0, 5));
  }, []);
  

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Event Name"
        className="w-full bg-transparent text-2xl font-bold focus:outline-none"
      />

      <div className="space-x-3 flex">
        <div className="w-[75%] bg-white/10 rounded-lg pl-4 pr-1 py-1 space-y-1 relative">
          {/* Dotted line connecting the circles */}
          <div className="absolute left-5 top-7 h-5 border-l-2 border-dotted border-gray-400 z-0"></div>
          <div className="w-[100%] flex items-center gap-1 relative z-10">
            <div className="w-full flex items-center justify-between gap-1">
              <label className="text-sm text-white flex items-center gap-1">
                <Circle size={9} className="fill-gray-500" />
                Start
              </label>
              <div className="flex gap-1" >
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="col-span-2 px-1 py-1 rounded-lg bg-white/10 text-white"
              />
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="col-span-2 px-1 py-1 rounded-lg bg-white/10 text-white"
              />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 relative z-10">
            <div className="w-full flex justify-between items-center gap-1">
              <label className="text-sm text-white flex items-center gap-1">
                <Circle size={9} color="grey" />
                End
              </label>
              <div className="flex gap-1" >
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="col-span-2 px-1 py-1 rounded-lg bg-white/10 text-white"
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="col-span-2 px-1 py-1 rounded-lg bg-white/10 text-white"
              />
              </div>
            </div>
          </div>

        </div>

        <div className="w-[25%] bg-white/10 rounded-lg p-2 grid grid-rows-3">
          <Globe size={16} color="grey"/>
          <p className="text-sm" >GMT+05:30</p>
          <p className="text-sm" >Calcutta</p>
        </div>
      </div>


      <div className="flex p-2 bg-white/10 rounded-lg" >
      <div className="pt-1" >
       <MapPin size={16} color="grey"/>
      </div>
      <div className="">
       <div className=" px-3">Add Event Location</div>
        <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Offline Event Location"
        className="w-full px-3 rounded-md focus:outline-none"
      />
      </div>
      </div>


      <div className=" bg-white/10 rounded-lg p-2 flex items-center">
        <BookText size={16} color="grey"/>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add Description"
        className="w-full px-3 ml-1 rounded-md flex items-center focus:outline-none"
      />
      </div>
    </div>
  )
}
