import { Toaster } from "sonner";
import AdminShell from "./AdminShell";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata = { title: "Admin | Dawn Cobham Portfolio" };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${jakarta.variable} ${spaceGrotesk.variable} font-sans bg-[#000319] text-white antialiased`}
      >
        <Toaster richColors position="top-right" />
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
