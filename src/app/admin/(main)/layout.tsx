'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { AdminLayoutProps } from '@/typescript/interface/layout.interface';
import React, { useState } from 'react';



export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const mainContentMargin = isCollapsed ? 'md:ml-20' : 'md:ml-64';
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
          body { font-family: 'Inter', sans-serif; }
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
            background-color: #f5f5f5;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background-color: #cbd5e1;
          }
        `}
      </style>

      <Sidebar 
        isCollapsed={isCollapsed} 
        toggleSidebar={toggleSidebar} 
      />
      
      <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin} pt-0`}>
        <Navbar 
          toggleSidebar={toggleSidebar} 
        />
        <main className="p-2 md:p-4">
          <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 min-h-[80vh]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}