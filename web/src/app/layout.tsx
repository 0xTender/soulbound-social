import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { cn } from "@app/lib/utils";

const fontFamily = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Media Application",
  description: "Social Media App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark" // seems to be required for tailwind jit warmup
      suppressHydrationWarning
    >
      <body
        className={cn(
          fontFamily.className,
          "h-screen bg-slate-50 dark:bg-slate-950"
        )}
      >
        {children}
      </body>
    </html>
  );
}
