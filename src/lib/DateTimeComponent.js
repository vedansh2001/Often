// import { useState } from 'react';

// const DateTimeComponent = ({ label = "Start" }) => {
//   const getCurrentDate = () => {
//     const now = new Date();
//     return now.toISOString().split('T')[0];
//   };

//   const getCurrentTime = () => {
//     const now = new Date();
//     return now.toTimeString().slice(0, 5);
//   };

//   const [date, setDate] = useState(getCurrentDate());
//   const [time, setTime] = useState(getCurrentTime());

//   const formatDate = (dateString) => {
//     const dateObj = new Date(dateString);
//     return dateObj.toLocaleDateString('en-US', { 
//       weekday: 'short', 
//       month: 'short', 
//       day: 'numeric' 
//     });
//   };

//   const formatTime = (timeString) => {
//     const [hours, minutes] = timeString.split(':');
//     const timeObj = new Date();
//     timeObj.setHours(parseInt(hours), parseInt(minutes));
//     return timeObj.toLocaleTimeString('en-US', { 
//       hour: 'numeric', 
//       minute: '2-digit',
//       hour12: true 
//     });
//   };

//   return (
//     <div className="grid grid-cols-5 gap-2 items-center">
//       <label className="text-sm text-white">{label}</label>
//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         className="col-span-2 px-3 py-1 rounded-lg bg-white/10 text-white"
//       />
//       <input
//         type="time"
//         value={time}
//         onChange={(e) => setTime(e.target.value)}
//         className="col-span-2 px-3 py-1 rounded-lg bg-white/10 text-white"
//       />
//     </div>
//   );
// };

// export default DateTimeComponent;