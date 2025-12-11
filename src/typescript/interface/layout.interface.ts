export interface AdminLayoutProps {
  children: React.ReactNode;
}

export interface NavbarProps {
  toggleSidebar: () => void;
}
export interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}
