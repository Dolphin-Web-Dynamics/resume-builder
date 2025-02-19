'use client';

// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import './globals.css';
// import "./app.css";
import { ResumeProvider } from "@/context/ResumeContext";
import Link from 'next/link';


// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <ResumeProvider>
          <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex space-x-4">
              <Link href="/" className="hover:text-gray-400">Home</Link>
              {/* <Link href="/templates" className="hover:text-gray-400">Select Template</Link> */}
              {/* <Link href="/profile" className="hover:text-gray-400">Personal Profile</Link> */}
              {/* <Link href="/job" className="hover:text-gray-400">Job Listing</Link> */}
              <Link href="/resume" className="hover:text-gray-400">View Resume</Link>
            </div>
          </nav>
          <main className="container mx-auto p-4">{children}</main>
        </ResumeProvider>
      </body>
    </html>
  );
}
