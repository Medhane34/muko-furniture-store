// components/organisms/navigation/MobileNavigation.tsx
"use client"
import { useState } from "react";
import { Link } from "@heroui/link";
import { mobileNavigationConfig } from "@/config/navigation";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

// Define proper TypeScript interfaces
interface NavigationChild {
  key: string;
  href: string;
  label: string;
}

interface NavigationItem {
  key: string;
  label: string;
  href: string;
  children?: NavigationChild[];
}

export const MobileNavigation = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(key)) {
      newOpenItems.delete(key);
    } else {
      newOpenItems.add(key);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="w-full">
      {/* Main Navigation Items */}
      {mobileNavigationConfig.map((item: NavigationItem) => (
        <div key={item.key} className="border-b border-default-200">
          <button
            className="w-full flex justify-between items-center py-4 px-4 text-left"
            onClick={() => toggleItem(item.key)}
            aria-expanded={openItems.has(item.key)}
          >
            <span className="font-medium text-base">{item.label}</span>
            {item.children && item.children.length > 0 ? (
              openItems.has(item.key) ? (
                <ChevronUpIcon className="w-5 h-5" />
              ) : (
                <ChevronDownIcon className="w-5 h-5" />
              )
            ) : null}
          </button>
          
          {/* Dropdown Content */}
          {openItems.has(item.key) && item.children && item.children.length > 0 && (
            <div className=" px-4 pb-3">
              <div className="flex flex-col space-y-2 pt-1">
                {item.children.map((child: NavigationChild) => (
                  <Link
                    key={child.key}
                    href={child.href}
                    className="py-2 text-default-700 text-sm transition-colors hover:text-primary"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      
      {/* Promotional Section */}
      <div className="mt-6 px-4">
        <div className="text-base font-semibold mb-3 text-default-900">Sales and Deals</div>
        <div className="flex flex-col gap-3">
          <Link href="#" className="text-sm text-default-600 hover:text-primary transition-colors">
            Clearance: Up to 40% off
          </Link>
          <Link href="#" className="text-sm text-default-600 hover:text-primary transition-colors">
            Labor Day Early Access: Up to $800 Off
          </Link>
          <Link href="#" className="text-sm text-default-600 hover:text-primary transition-colors">
            Limited Offer: Get 8% off
          </Link>
          <Link href="#" className="text-sm text-default-600 hover:text-primary transition-colors">
            Bundle Deals: Get 10% off
          </Link>
        </div>
      </div>

      {/* Additional Menu Items */}
      <div className="mt-6 border-t border-default-200 pt-4 px-4">
        <Link href="#" className="block py-2 font-medium text-default-900 hover:text-primary transition-colors">
          SIGN IN / REGISTER
        </Link>
        <div className="mt-3">
          <span className="text-sm font-medium text-default-700">Ship to</span>
          {/* Add location selector here if needed */}
        </div>
      </div>
    </div>
  );
};