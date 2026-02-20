"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth/auth-client";

export function useAuthGate() {
  const [showModal, setShowModal] = useState(false);

  const requireAuth = async (callback?: () => void) => {
    const session = await authClient.getSession();

    if (!session?.data?.user) {
      setShowModal(true);
      return;
    }

    if (callback) callback();
  };

  return {
    showModal,
    setShowModal,
    requireAuth,
  };
}
