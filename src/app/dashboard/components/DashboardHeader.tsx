"use client";

import React from "react";
import { Search, Bell, ChevronDown, Menu } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full ">
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left section - Logo/Branding */}
        <div className="flex items-center">
          <button className="mr-4 rounded-md p-2 text-gray-500 hover:bg-gray-100 md:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Acme Inc</h1>
        </div>

        {/* Right section - Controls */}
        <div className="flex items-center space-x-4">
          {/* Search bar */}
          <div className="relative hidden md:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-64 rounded-md border border-gray-300 bg-gray-50 py-2 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>

          {/* Notifications */}
          <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* User profile */}
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-blue-500"></div>
            <div className="hidden items-center md:flex">
              <span className="text-sm font-medium text-gray-700">
                John Doe
              </span>
              <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
