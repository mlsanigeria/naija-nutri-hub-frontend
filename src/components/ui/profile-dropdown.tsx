"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Moon,
  Sun,
  LogIn,
  LogOut,
  History,
  Settings,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth";

interface ProfileDropdownProps {
  className?: string;
}

export function ProfileDropdown({ className = "" }: ProfileDropdownProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, theme, setTheme, logout } = useAuthStore();
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSignOut = () => {
    logout();
    setIsOpen(false);
    router.push("/login");
  };

  // Get initials from first and last name, fallback to username
  const getInitials = () => {
    if (user?.firstname && user?.lastname) {
      return (
        user.firstname.charAt(0).toUpperCase() +
        user.lastname.charAt(0).toUpperCase()
      );
    }
    if (user?.username) {
      return user.username.charAt(0).toUpperCase();
    }
    return "U";
  };

  // Show loading state during hydration
  if (!hasHydrated) {
    return (
      <div
        className={`w-10 h-10 rounded-full bg-muted animate-pulse ${className}`}
      />
    );
  }

  const isAuthenticated = !!user?.token;

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Profile Button/Avatar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
          isAuthenticated
            ? "bg-primary text-white font-semibold"
            : "bg-secondary hover:bg-secondary/80"
        }`}
        aria-label="Profile menu"
      >
        {isAuthenticated ? (
          <span className="text-xs">{getInitials()}</span>
        ) : (
          <User className="w-5 h-5" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-56 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {isAuthenticated ? (
            <>
              {/* User Info Header */}
              <div className="px-4 py-3 border-b border-border bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-xs">
                    {getInitials()}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-medium text-sm truncate">
                      {user.username}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                >
                  <Settings className="w-4 h-4 text-muted-foreground" />
                  <span>Settings</span>
                </Link>

                <Link
                  href="/history"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                >
                  <History className="w-4 h-4 text-muted-foreground" />
                  <span>History</span>
                </Link>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {theme === "dark" ? (
                      <Moon className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Sun className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span>Theme</span>
                  </div>
                  <span className="text-xs text-muted-foreground capitalize">
                    {theme}
                  </span>
                </button>

                <div className="border-t border-border my-1" />

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-secondary transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Guest Header */}
              <div className="px-4 py-3 border-b border-border bg-secondary/30">
                <p className="text-sm font-medium">Welcome!</p>
                <p className="text-xs text-muted-foreground">
                  Sign in to save your progress
                </p>
              </div>

              {/* Menu Items for Guests */}
              <div className="py-1">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                >
                  <LogIn className="w-4 h-4 text-muted-foreground" />
                  <span>Sign In</span>
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-primary hover:bg-secondary transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Create Account</span>
                </Link>

                <div className="border-t border-border my-1" />

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {theme === "dark" ? (
                      <Moon className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Sun className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span>Theme</span>
                  </div>
                  <span className="text-xs text-muted-foreground capitalize">
                    {theme}
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
