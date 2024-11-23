import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";
import { Toaster } from "sonner";
import { ReduxProvider } from "@/redux/provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme";
import ReactQueryProvider from "@/react-query";
export const metadata: Metadata = {
  title: "Opal",
  description: "Share Ai powered videos with your friends",
};

const manrope = Manrope({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${manrope.className} bg-[#171717] antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <ReduxProvider>
              <ReactQueryProvider>
                {children}
                <Toaster />
              </ReactQueryProvider>
            </ReduxProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
