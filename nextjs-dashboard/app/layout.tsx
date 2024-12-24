/*
This is called a root layout and is required. Any UI you add to the root layout will be shared across all pages in your application. You can use the root layout to modify your <html> and <body> tags, and add metadata
*/

import "@/app/ui/global.css"
import { inter } from "./ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {/* <h1 className="text-blue-500">Dashboard</h1> */}
        {children}</body>
    </html>
  );
}
