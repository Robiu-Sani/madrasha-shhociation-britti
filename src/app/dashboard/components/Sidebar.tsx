"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Home,
  Users,
  Mail,
  Bell,
  Settings,
  LogOut,
  Menu,
  ChevronDown,
  ChevronRight,
  ClipboardPlus,
  Album,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

interface NavItem {
  name: string;
  icon: React.ReactNode;
  href?: string;
  subItems?: NavItem[];
}

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    href: "/dashboard",
  },
  {
    name: "Home",
    icon: <Home size={20} />,
    href: "/",
  },
  {
    name: "Create Information",
    icon: <ClipboardPlus size={20} />,
    subItems: [
      {
        name: "Contact Data",
        icon: <ClipboardPlus size={16} />,
        href: "/dashboard/create/additional",
      },
      {
        name: "Add Branch",
        icon: <ClipboardPlus size={16} />,
        href: "/dashboard/create/branch-center",
      },
      {
        name: "Add Class",
        icon: <ClipboardPlus size={16} />,
        href: "/dashboard/create/class",
      },
      {
        name: "Add Exam",
        icon: <ClipboardPlus size={16} />,
        href: "/dashboard/create/exam",
      },
      {
        name: "Add Group",
        icon: <ClipboardPlus size={16} />,
        href: "/dashboard/create/group",
      },
      {
        name: "Add Institution",
        icon: <ClipboardPlus size={16} />,
        href: "/dashboard/create/institution",
      },
      {
        name: "Add Suggestion",
        icon: <ClipboardPlus size={16} />,
        href: "/dashboard/create/suggestion",
      },
      {
        name: "Manage Center",
        icon: <ClipboardPlus size={16} />,
        href: "/dashboard/create/menage-center",
      },
    ],
  },
  {
    name: "Created Information",
    icon: <Album size={20} />,
    subItems: [
      {
        name: "Contact Data",
        icon: <Album size={16} />,
        href: "/dashboard/created-data/additional",
      },
      {
        name: "Added Branch",
        icon: <Album size={16} />,
        href: "/dashboard/created-data/branch-center",
      },
      {
        name: "Added Class",
        icon: <Album size={16} />,
        href: "/dashboard/created-data/class",
      },
      {
        name: "Added Exam",
        icon: <Album size={16} />,
        href: "/dashboard/created-data/exam",
      },
      {
        name: "Added Group",
        icon: <Album size={16} />,
        href: "/dashboard/created-data/group",
      },
      {
        name: "Added Institution",
        icon: <Album size={16} />,
        href: "/dashboard/created-data/institution",
      },
      {
        name: "Added Suggestion",
        icon: <Album size={16} />,
        href: "/dashboard/created-data/suggestion",
      },
      {
        name: "Manage Center Data",
        icon: <Album size={16} />,
        href: "/dashboard/created-data/menage-center",
      },
    ],
  },
  {
    name: "Add A User",
    icon: <UserPlus size={20} />,
    subItems: [
      {
        name: "Add A Member",
        icon: <UserPlus size={16} />,
        href: "/dashboard/create-user/menagement",
      },
      {
        name: "Add A Student",
        icon: <UserPlus size={16} />,
        href: "/dashboard/create-user/student",
      },
    ],
  },
  {
    name: "Users",
    icon: <Users size={20} />,
    subItems: [
      {
        name: "All Members",
        icon: <Users size={16} />,
        href: "/dashboard/user/menagement",
      },
      {
        name: "All Student",
        icon: <Users size={16} />,
        href: "/dashboard/user/student",
      },
      {
        name: "All User",
        icon: <Users size={16} />,
        href: "/dashboard/user/user",
      },
    ],
  },

  {
    name: "Messages",
    icon: <Mail size={20} />,
    href: "/messages",
  },
  {
    name: "Notifications",
    icon: <Bell size={20} />,
    subItems: [
      {
        name: "Inbox",
        icon: <Mail size={16} />,
        href: "/notifications/inbox",
      },
      {
        name: "Alerts",
        icon: <Bell size={16} />,
        href: "/notifications/alerts",
      },
    ],
  },
  {
    name: "Settings",
    icon: <Settings size={20} />,
    href: "/settings",
  },
  {
    name: "Logout",
    icon: <LogOut size={20} />,
    href: "/logout",
  },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );

  const toggleDropdown = (name: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div
      className={`h-full flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded ? "w-[270px] absolute sm:static" : "w-[50px]"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex bg-gray-100 shadow rounded items-center sm:justify-between p-2 justify-center">
        {isExpanded && (
          <h1 className="text-xl text-gray-600 font-semibold tracking-tight">
            My Dashboard
          </h1>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
        >
          <Menu size={20} className="text-gray-900" />
        </button>
      </div>

      {/* Nav Items */}
      <nav
        className={`flex flex-col bg-gray-100 ${
          isExpanded ? "p-2" : "p-0"
        } overflow-y-auto scrollnone shadow rounded gap-[6px] h-full`}
      >
        {navItems.map((item, idx) => (
          <div key={idx}>
            {item.href ? (
              <Link
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-white transition-colors text-gray-700"
              >
                {item.icon}
                {isExpanded && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </Link>
            ) : (
              <div>
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className="flex items-center justify-between w-full gap-3 px-4 py-2 rounded-md hover:bg-white transition-colors text-gray-700"
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    {isExpanded && (
                      <span className="text-sm font-medium">{item.name}</span>
                    )}
                  </div>
                  {isExpanded && item.subItems && (
                    <span>
                      {openDropdowns[item.name] ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </span>
                  )}
                </button>

                {isExpanded && openDropdowns[item.name] && item.subItems && (
                  <div className="ml-8 mt-1 flex flex-col gap-1">
                    {item.subItems.map((subItem, subIdx) => (
                      <Link
                        key={subIdx}
                        href={subItem.href || "#"}
                        className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-white transition-colors text-gray-700 text-sm"
                      >
                        {subItem.icon}
                        <span>{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
