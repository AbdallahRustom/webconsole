import React, { useContext } from "react";
import styles from "./Sidebar.module.css";
import navItems from "./config/navItems";
import { NavLink } from "react-router-dom";
import { LoginContext } from "./LoginContext";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    console.error("LoginContext not found for Sidebar");
    return null;
  }
  
  const { user } = context;

  // Simplified isAdmin check based on username only
  const isAdmin = () => {
    return user !== null && user.username === "admin";
  };

  console.log("Sidebar isOpen:", isOpen);
  console.log("User:", user); // Check if user data is available

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.sidebar_comp}>
        <div className={styles.navContainer}>
          {navItems.map((item) => {
            // Skip admin-only items for non-admin users
            if (item.adminOnly && !isAdmin()) {
              return null;
            }
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${styles.sidebarBrandText} ${isActive ? styles.activeNav : ""}`
                }
              >
                {item.name}
              </NavLink>
            );
          })}
          {/* Optionally add conditional items based on isLoggedIn or user roles */}
          {/* Example: {isLoggedIn && <NavLink to="/profile">Profile</NavLink>} */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 