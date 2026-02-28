import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "Dev by Sam - Portfolio",
  description: "built by sam, a software engineer and designer",
  icons: {
    icon: "/favicon.ico",
  }
};

function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className="constant-component">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
export default RootLayout;