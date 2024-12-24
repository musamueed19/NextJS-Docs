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
