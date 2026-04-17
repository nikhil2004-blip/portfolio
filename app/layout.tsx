import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nikhil Kumar Yadav — Portfolio",
  description:
    "A Minecraft-inspired 3D portfolio. Walk around a pixelated village, enter buildings and discover my projects, skills & more.",
  openGraph: {
    title: "Nikhil Kumar Yadav — Minecraft Portfolio",
    description: "Walk through my portfolio in 3D Minecraft style.",
    type: "website",
  },
};

import ConvexClientProvider from "./ConvexClientProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
