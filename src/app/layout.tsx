"use client";

import { Home } from "@/context/Home";
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/Navbar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isLandingPage = pathname === "/";

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Home>
          <Navbar />
          {isLandingPage ? (
            // Allow public access to the landing page
            <main className="container mx-auto p-4">{children}</main>
          ) : (
            // Require authentication for all other pages
            <ThemeProvider>
              <Authenticator>
                {({ signOut }) => (
                  <main className="container mx-auto p-4">
                    <div className="flex justify-end print:hidden">
                      <button
                        onClick={signOut}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Sign Out
                      </button>
                    </div>
                    {children}
                  </main>
                )}
              </Authenticator>
            </ThemeProvider>
          )}
        </Home>
      </body>
    </html>
  );
}
