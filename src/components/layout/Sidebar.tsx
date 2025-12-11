import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Settings,  
  Package, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { SidebarProps } from '@/typescript/interface/layout.interface';

// Define the structure for sidebar links
const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {
  // Icon to show in the toggle button
  const ToggleIcon = isCollapsed ? ChevronRight : ChevronLeft;

  return (
    <div className={`fixed inset-y-0 left-0 z-30 flex flex-col h-full bg-white border-r shadow-md 
      ${isCollapsed ? 'w-20' : 'w-64'} 
      transition-all duration-300 ease-in-out`}>
      
      {/* 1. Logo/Header Section */}
      <div className="flex items-center justify-center h-16 border-b">
        <h1 className="text-xl font-bold text-primary">
          {isCollapsed ? 'AD' : 'Admin Dash'}
        </h1>
      </div>

      {/* 2. Navigation Links */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} passHref>
                <div className={`flex items-center p-3 rounded-lg text-sm font-medium hover:bg-gray-100 
                  ${isCollapsed ? 'justify-center' : ''}`}>
                  <Icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                  {!isCollapsed && <span>{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
      
      {/* 3. Toggle Button */}
      <div className="p-3 border-t">
        <Button 
          variant="outline" 
          onClick={toggleSidebar} 
          className={`w-full ${isCollapsed ? 'justify-center' : 'justify-between'}`}
        >
          {!isCollapsed && <span className="text-sm">Collapse</span>}
          <ToggleIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}