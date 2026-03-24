"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

interface DeleteAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteAccountModal({
  open,
  onOpenChange,
}: DeleteAccountModalProps) {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axiosInstance.delete("/users/account", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      logout();
      onOpenChange(false);
      router.push("/account-deleted");
    } catch (error) {
      console.error("Failed to delete account:", error);
      toast.error("Failed to delete account. Please try again.");
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
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-semibold text-center">
            Are you sure you want to continue?
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-center mt-2">
            Your account will be permanently deleted.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 bg-transparent border-border text-foreground hover:bg-secondary py-3 rounded-lg"
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 rounded-lg"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
