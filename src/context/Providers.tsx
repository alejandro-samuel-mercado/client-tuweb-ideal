"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ChatProvider } from "@/context/ChatContext";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem   disableTransitionOnChange>
      <AuthProvider>
        <ChatProvider>{children}</ChatProvider>
      </AuthProvider>
    </NextThemesProvider>
  );
}
