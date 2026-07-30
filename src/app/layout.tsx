import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maneesha Yapa — Health-Tech Engineer & Full-Stack Developer",
  description:
    "Portfolio of Maneesha Yapa, an Honours Health Information and Communication Technology undergraduate specializing in health-tech engineering, full-stack development, and mobile applications.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
