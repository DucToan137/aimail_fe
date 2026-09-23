import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { Loader2, Mail } from "lucide-react";
import { getErrorMessage } from "../utils/errorHandler";
import { emailService } from "../services/emailService";

export const GoogleCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleGoogleCallback } = useAuth();

  useEffect(() => {
    const processCallback = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const error = searchParams.get("error");

      console.log("GoogleCallback - Processing callback:", {
        code: !!code,
        state,
        error,
      });

      if (error) {
        toast.error(`Google authentication failed: ${error}`);
        navigate("/login", { replace: true });
        return;
      }

      if (!code) {
        toast.error("No authorization code received from Google");
        navigate("/login", { replace: true });
        return;
      }

      try {
        console.log("GoogleCallback - Calling handleGoogleCallback");
        await handleGoogleCallback(code, state || undefined);
        console.log("GoogleCallback - handleGoogleCallback successful");

        emailService
          .syncSemanticEmails()
          .catch((err) =>
            console.error("Failed to trigger semantic sync on login:", err),
          );

        await new Promise((resolve) => setTimeout(resolve, 200));

        // toast.success("Google sign-in successful!");

        console.log("GoogleCallback - Navigating to inbox");
        navigate("/inbox", { replace: true });
      } catch (error) {
        console.error("Google OAuth callback error:", error);
        toast.error(getErrorMessage(error));
        navigate("/login", { replace: true });
      }
    };

    processCallback();
  }, [searchParams, handleGoogleCallback, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-zinc-950 px-4 transition-colors">
      <div className="w-full max-w-sm sm:max-w-md p-8 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl shadow-xs text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-xs mb-5">
          <Mail className="w-6 h-6" />
        </div>
        <div className="flex items-center justify-center mb-4">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-700 dark:text-zinc-300" />
        </div>
        <h1 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-1.5">
          Đang hoàn tất đăng nhập Google...
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Vui lòng đợi trong giây lát trong khi chúng tôi kết nối hòm thư của bạn.
        </p>
      </div>
    </div>
  );
};
