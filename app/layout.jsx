import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import QueryProvider from "@/components/QueryProvider";
import Navbar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Internship Tracker',
  description: 'Track and manage your internship applications',
};

export default function RootLayout({children,}) {
  return (
    <SessionProvider>
      <QueryProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
              <Navbar />
              <main className="container mx-auto px-4 py-8">
                {children}
              </main>
              <ToastContainer />
            </ThemeProvider>
          </body>
        </html>
      </QueryProvider>
    </SessionProvider>
  );
}