import React from "react";

// Data Arrays
const icons = ["👤", "🏠", "📦", "📺", "🧑‍🤝‍🧑", "🗓️"];
const labels = ["Profile", "Home", "Marketplace", "Watch", "Friends", "Events"];

// Menu Item Component
const MenuItem = ({ icon, label }) => {
  return (
    <p style={{fontSize:"25px",fontWeight:'700'}}>
      {icon} {label}
    </p>
  );
};

// Main Component
const MenuList = () => {
  return (
    <div style={{display:"flex",flexDirection:'column',}}>
      {icons.map((icon, index) => (
        <MenuItem key={index} icon={icon} label={labels[index]} />
      ))}
    </div>
  );
};

export default MenuList;
