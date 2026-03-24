"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Moon, Sun, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth";
import { axiosInstance } from "@/lib/axios";
import { ChangeUsernameModal } from "@/components/features/profile/change-username-modal";
import { DeleteAccountModal } from "@/components/features/profile/delete-account-modal";

interface UserProfile {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, theme, setTheme, logout, updateProfile } = useAuthStore();
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const [showChangeUsername, setShowChangeUsername] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasHydrated) return;

    const fetchProfile = async () => {
      if (!user?.token) {
        router.push("/login");
        return;
      }

      try {
        const response = await axiosInstance.get("/users/me", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setProfile(response.data);
        // Sync firstname/lastname to auth store for profile initials
        if (response.data.firstname || response.data.lastname) {
          updateProfile({
            firstname: response.data.firstname,
            lastname: response.data.lastname,
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.token, router, hasHydrated]);

  const handleSignOut = () => {
    logout();
    router.push("/login");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!hasHydrated || loading) {
    return (
      <main className="min-h-screen bg-background text-foreground px-4 py-6 flex flex-col items-center justify-center gap-4">
        <Image
          src="/images/logo.png"
          alt="Naija Nutri Hub"
          width={64}
          height={64}
          className="w-16 h-16 rounded-full animate-pulse"
        />
        <p className="text-muted-foreground">Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>
        <Image
          src="/images/logo.png"
          alt="Naija Nutri Hub"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
      </div>

      {/* User Info Card */}
      <div className="bg-card rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="font-medium truncate">
                {profile?.username || "User"}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {profile?.email || "user@email.com"}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setShowChangeUsername(true)}
            className="bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg whitespace-nowrap flex-shrink-0"
          >
            Change Username
          </Button>
        </div>
      </div>

      {/* General Section */}
      <div className="mb-6">
        <p className="text-sm text-primary mb-3 px-1">General</p>
        <div className="bg-card rounded-2xl overflow-hidden">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span>Theme</span>
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-muted-foreground" />
              <button
                onClick={toggleTheme}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  theme === "dark" ? "bg-muted" : "bg-primary"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    theme === "dark" ? "left-1" : "left-7"
                  }`}
                />
              </button>
              <Sun className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          {/* History */}
          <Link
            href="/history"
            className="flex items-center justify-between p-4 hover:bg-secondary transition-colors"
          >
            <span>History</span>
            <ChevronRight className="w-5 h-5 text-primary" />
          </Link>
        </div>
      </div>

      {/* Account Section */}
      <div className="mb-8">
        <p className="text-sm text-primary mb-3 px-1">Account</p>
        <div className="bg-card rounded-2xl overflow-hidden">
          {/* Reset Password */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span>Reset Password</span>
            <Link href="/forgot-password">
              <Button className="bg-primary hover:bg-primary/90 text-white text-sm px-4 py-2 rounded-lg">
                Reset
              </Button>
            </Link>
          </div>

          {/* Delete Account */}
          <div className="flex items-center justify-between p-4">
            <div>
              <p>Delete account</p>
              <p className="text-xs text-muted-foreground">
                Your account will be permanently deleted.
              </p>
            </div>
            <Button
              onClick={() => setShowDeleteAccount(true)}
              className="bg-primary hover:bg-primary/90 text-white text-sm px-4 py-2 rounded-lg"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Sign Out Button */}
      <button
        onClick={handleSignOut}
        className="w-full text-center text-primary font-medium py-3"
      >
        Sign Out
      </button>

      {/* Modals */}
      <ChangeUsernameModal
        open={showChangeUsername}
        onOpenChange={setShowChangeUsername}
      />
      <DeleteAccountModal
        open={showDeleteAccount}
        onOpenChange={setShowDeleteAccount}
      />
    </main>
  );
}
