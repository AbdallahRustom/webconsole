interface NavItem {
  name: string;
  path: string;
  // Add other properties if needed, e.g., icon
  adminOnly?: boolean; // Added for tenant/user link which was admin-only
}

// Updated navigation items to match the original links (not in ALL CAPS as requested)
const navItems: NavItem[] = [
  { name: "Realtime Status", path: "/status" },
  { name: "Subscribers", path: "/subscriber" },
  { name: "Profile", path: "/profile" },
  { name: "Analysis", path: "/analysis" },
  { name: "Tenant and User", path: "/tenant", adminOnly: true },
  { name: "UE Charging", path: "/charging" },
];

export default navItems; 