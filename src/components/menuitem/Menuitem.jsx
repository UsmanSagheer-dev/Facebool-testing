import React from "react";
import "./menuitem.css";

const icons = [
  "👤",
  "🏠",
  "📦",
  "📺",
  "🧑‍🤝‍🧑",
  "🗓️",
  "📷",
  "🎥",
  "📝",
  "🔔",
  "📧",
  "⚙️",
  "🧠",
  "📢",
  "👨‍💼",
  "🌍",
  "🎮",
  "🎞️",
  "💾",
];

const labels = [
  "Profile",
  "Home",
  "Marketplace",
  "Watch",
  "Friends",
  "Events",
  "Photos",
  "Videos",
  "Pages",
  "Notifications",
  "Messenger",
  "Settings",
  "Memory",
  "Ads",
  "Add Manager",
  "Climate Science Center",
  "Gaming Video",
  "Reels",
  "Save",
];

const MenuItem = ({ icon, label }) => {
  return (
    <p className="menuitem">
      {icon} {label}
    </p>
  );
};

const MenuList = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      {icons.map((icon, index) => (
        <MenuItem key={index} icon={icon} label={labels[index]} />
      ))}
    </div>
  );
};

export default MenuList;
