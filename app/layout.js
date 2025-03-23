import { Navigation } from "./_components/Navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./_components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-commerce Platform Finder",
  description: "Find the perfect e-commerce platform for your business",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-[#F5F7FA] min-w-[30rem] sm:w-auto">
          <Navigation />
          <main className="w-full sm:max-w-7xl sm:mx-auto py-6 sm:px-6 lg:px-8 text-black pt-24">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
