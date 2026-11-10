import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Your Choice | Fashion Store", description: "Your Choice Bangladesh fashion store" };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="bn"><body>{children}</body></html>;
}
