import { create } from 'zustand';

const useInviteStore = create((set) => ({
  eventName: '',
  eventDate: '',
  nights: 1,
  location: '',
  description: '',
  coverImage: '/Cover_Image.png',
  theme: 'minimal',
  backgroundMedia: null,

  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  image: '/Cover_Image.png',
  showSelect: false,
  selectedTheme: '',
  selectedThemeType: '',
  price: 'Free',
  isEditing: false,
  isApproved: false,
  isEditingCapacity: false,
  capacity: 'Unlimited',

  setEventName: (name) => set({ eventName: name }),
  setEventDate: (date) => set({ eventDate: date }),
  setNights: (n) => set({ nights: n }),
  setLocation: (loc) => set({ location: loc }),
  setDescription: (desc) => set({ description: desc }),
  setCoverImage: (img) => set({ coverImage: img }),
  setTheme: (theme) => set({ theme }),
  setBackgroundMedia: (file) => set({ backgroundMedia: file }),

  setImage: (img) => set({ image: img }),
  setStartDate: (sdate) => set({ startDate: sdate }),
  setStartTime: (stime) => set({ startTime: stime }),
  setEndDate: (edate) => set({ endDate: edate }),
  setEndTime: (etime) => set({ endTime: etime }),
  setShowSelect: (value) => set({ showSelect: value }),
  setSelectedTheme: (value) => set({ selectedTheme: value }),
  setSelectedThemeType: (type) => set({ selectedThemeType: type }),

  setPrice: (price) => set({ price }),
  setIsEditing: (value) => set({ isEditing: value }),
  setIsApproved: (value) => set({ isApproved: value }),
  setIsEditingCapacity: (value) => set({ isEditingCapacity: value }),
  setCapacity: (value) => set({ capacity: value }),

  setStateFromResponse: (data) => set(() => ({ ...data })),
}));

export default useInviteStore;
