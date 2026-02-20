"use client";

import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onClose?: () => void;
  variant?: "default" | "locked";
};

export function AuthRequiredModal({
  open,
  onClose,
  variant = "default",
}: Props) {
  const router = useRouter();

  if (!open) return null;

  const isLocked = variant === "locked";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={!isLocked ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 w-[90%] max-w-md shadow-2xl border border-gray-200 dark:border-gray-700">
        
        {/* Close button ONLY for default variant */}
        {!isLocked && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl"
          >
            ✕
          </button>
        )}

        <h2 className="text-xl font-bold mb-3 text-center">
          Login Required
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
          You need to log in to access this feature.
        </p>

        <div className="flex flex-col gap-3">
          
          <button
            onClick={() => router.push("/login")}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Go to Login
          </button>

          {/* Back to Home only in locked version */}
          {isLocked && (
            <button
              onClick={() => router.push("/")}
              className="w-full py-3 border border-gray-300 dark:border-gray-600 rounded-xl font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#262626] transition"
            >
              Back to Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
