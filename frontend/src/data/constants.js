// ─── Doctors ─────────────────────────────────────────────────────────────────
export const DOCTORS = [
  { id: 1, name: "Dr. Ananya Krishnan", specialty: "Cardiology",      avatar: "AK", status: "available",  patients: 8,  nextSlot: "10:30 AM", rfid: true,  face: true,  exp: "12 yrs", rating: 4.9, room: "OPD-3" },
  { id: 2, name: "Dr. Rohan Mehta",    specialty: "Neurology",        avatar: "RM", status: "in-session", patients: 12, nextSlot: "11:45 AM", rfid: true,  face: false, exp: "9 yrs",  rating: 4.7, room: "OPD-7" },
  { id: 3, name: "Dr. Priya Nair",     specialty: "Pediatrics",       avatar: "PN", status: "available",  patients: 5,  nextSlot: "10:15 AM", rfid: false, face: true,  exp: "7 yrs",  rating: 4.8, room: "OPD-1" },
  { id: 4, name: "Dr. Karthik Iyer",  specialty: "Orthopedics",      avatar: "KI", status: "away",       patients: 9,  nextSlot: "12:00 PM", rfid: true,  face: true,  exp: "15 yrs", rating: 4.6, room: "OPD-9" },
  { id: 5, name: "Dr. Meera Sundaram",specialty: "Dermatology",      avatar: "MS", status: "available",  patients: 6,  nextSlot: "10:45 AM", rfid: false, face: false, exp: "6 yrs",  rating: 4.7, room: "OPD-5" },
  { id: 6, name: "Dr. Vijay Rajan",   specialty: "General Medicine", avatar: "VR", status: "in-session", patients: 15, nextSlot: "01:00 PM", rfid: true,  face: true,  exp: "20 yrs", rating: 4.9, room: "OPD-2" },
];

// ─── Appointments ─────────────────────────────────────────────────────────────
export const APPOINTMENTS = [
  { id: 1, patient: "Suresh Kumar",       time: "10:00 AM", doctor: "Dr. Ananya Krishnan", status: "confirmed", priority: "normal", dept: "Cardiology"   },
  { id: 2, patient: "Lakshmi Devi",       time: "10:15 AM", doctor: "Dr. Priya Nair",      status: "waiting",   priority: "high",   dept: "Pediatrics"   },
  { id: 3, patient: "Manoj Pillai",       time: "10:30 AM", doctor: "Dr. Ananya Krishnan", status: "scheduled", priority: "normal", dept: "Cardiology"   },
  { id: 4, patient: "Revathi Nair",       time: "10:45 AM", doctor: "Dr. Meera Sundaram", status: "confirmed", priority: "urgent", dept: "Dermatology"  },
  { id: 5, patient: "Balaji Rao",         time: "11:00 AM", doctor: "Dr. Rohan Mehta",    status: "waiting",   priority: "normal", dept: "Neurology"    },
  { id: 6, patient: "Chitra Venkatesan", time: "11:15 AM", doctor: "Dr. Vijay Rajan",    status: "scheduled", priority: "high",   dept: "Gen. Medicine"},
];

// ─── Stats ────────────────────────────────────────────────────────────────────
export const STATS = [
  { label: "Doctors Active",       value: "18",    icon: "ti-stethoscope",  color: "#1D9E75", bg: "#E1F5EE" },
  { label: "Avg Wait Time",        value: "8 min", icon: "ti-clock",        color: "#185FA5", bg: "#E6F1FB" },
  { label: "Today's Appointments", value: "142",   icon: "ti-calendar",     color: "#534AB7", bg: "#EEEDFE" },
  { label: "Patient Satisfaction", value: "96%",   icon: "ti-heart",        color: "#D85A30", bg: "#FAECE7" },
];

// ─── Color Maps ───────────────────────────────────────────────────────────────
export const STATUS_COLORS = {
  available:    { bg: "#E1F5EE", text: "#0F6E56", dot: "#1D9E75", border: "#9FE1CB" },
  "in-session": { bg: "#E6F1FB", text: "#185FA5", dot: "#378ADD", border: "#B5D4F4" },
  away:         { bg: "#FAEEDA", text: "#854F0B", dot: "#EF9F27", border: "#FAC775" },
};

export const PRIORITY_COLORS = {
  normal: { bg: "#F1EFE8", text: "#5F5E5A", border: "#D3D1C7" },
  high:   { bg: "#E6F1FB", text: "#185FA5", border: "#B5D4F4" },
  urgent: { bg: "#FCEBEB", text: "#A32D2D", border: "#F7C1C1" },
};

export const APPT_STATUS_COLORS = {
  confirmed: { bg: "#E1F5EE", text: "#0F6E56", border: "#9FE1CB" },
  waiting:   { bg: "#FAEEDA", text: "#854F0B", border: "#FAC775" },
  scheduled: { bg: "#EEEDFE", text: "#534AB7", border: "#CECBF6" },
};

export const NAV_ITEMS = [
  { label: "Home",        icon: "ti-home-2"          },
  { label: "Dashboard",  icon: "ti-layout-dashboard" },
  { label: "Appointments",icon: "ti-calendar-plus"  },
  { label: "Doctors",    icon: "ti-stethoscope"      },
  { label: "Technology", icon: "ti-cpu"              },
  { label: "Contact",    icon: "ti-mail"             },
];

export const SPECIALTIES = [
  "Cardiology","Neurology","Pediatrics","Orthopedics","Dermatology","General Medicine",
];
