'use client'
import { Ticket, UserRoundCheck, ArrowUpToLine, Pencil } from "lucide-react";
import useInviteStore from '../../lib/zustandStore';

export default function ConfigSettings() {


  
  const isEditing = useInviteStore((state) => state.isEditing);
  const setIsEditing = useInviteStore((state) => state.setIsEditing);
  const price = useInviteStore((state) => state.price);
  const setPrice = useInviteStore((state) => state.setPrice);
  const isApproved = useInviteStore((state) => state.isApproved);
  const setIsApproved = useInviteStore((state) => state.setIsApproved);
  const isEditingCapacity = useInviteStore((state) => state.isEditingCapacity);
  const setIsEditingCapacity = useInviteStore((state) => state.setIsEditingCapacity);
  const capacity = useInviteStore((state) => state.capacity);
  const setCapacity = useInviteStore((state) => state.setCapacity);

  return (
    <div className="space-y-4">
      <div className="mt-3">
        Event Options
      </div>

      <div className="flex justify-between items-center bg-white/10 px-3 py-2 rounded-md">
      <label className="text-sm flex items-center gap-2">
        <Ticket size={16} color="grey" />
        Tickets
      </label>

      {isEditing ? (
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
          className="bg-transparent text-sm text-right focus:outline-none"
        />
      ) : (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          <span className="text-sm">{price}</span>
          <Pencil size={14} color="grey" />
        </div>
      )}
    </div>

      
      <div className="flex justify-between items-center bg-white/10 px-3 py-2 rounded-md">
      <label className="text-sm flex items-center gap-2">
        <UserRoundCheck size={16} color="grey" />
        Require Approval
      </label>

      <button
        onClick={() => setIsApproved(!isApproved)}
        className={`w-10 h-5 rounded-full p-1 duration-200 ${
          isApproved ? "bg-green-500" : "bg-gray-500"
        }`}
      >
        <div
          className={`h-3 w-3 bg-white rounded-full transition-transform duration-200 ${
            isApproved ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>

      <div className="flex justify-between items-center bg-white/10 px-3 py-2 rounded-md">
      <label className="text-sm flex items-center gap-2">
        <ArrowUpToLine size={16} color="grey" />
        Capacity
      </label>

      <div className="flex items-center gap-2">
        {isEditingCapacity ? (
          <input
            type="text"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            onBlur={() => setIsEditingCapacity(false)}
            autoFocus
            className="bg-transparent border-b border-white/30 focus:outline-none text-sm text-white w-20"
          />
        ) : (
          <>
            <span className="text-sm">{capacity}</span>
            <Pencil
              size={14}
              className="cursor-pointer"
              onClick={() => setIsEditingCapacity(true)}
            />
          </>
        )}
      </div>
    </div>

    </div>
  )
}
