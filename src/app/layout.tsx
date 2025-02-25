'use client';

// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import './globals.css';
// import "./app.css";
import { ResumeProvider } from "@/src/context/ResumeContext";
// import Link from 'next/link';
import Navbar from '../components/Navbar';



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
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
        </ResumeProvider>
      </body>
    </html>
  );
}
