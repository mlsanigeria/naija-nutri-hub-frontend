"use client";

import { useState } from "react";
import { User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/auth";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

interface ChangeUsernameModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangeUsernameModal({
  open,
  onOpenChange,
}: ChangeUsernameModalProps) {
  const { user, updateUsername } = useAuthStore();
  const [newUsername, setNewUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newUsername.trim()) {
      toast.error("Please enter a username");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.put(
        "/users/username",
        { username: newUsername },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );

      updateUsername(newUsername);
      toast.success("Username updated successfully");
      setNewUsername("");
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update username:", error);
      toast.error("Failed to update username. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-card border-border text-foreground max-w-sm"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-normal">
            Change Your Username
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="New Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg"
          >
            {loading ? "Updating..." : "Change Username"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
