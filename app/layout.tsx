import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import { ThemeProvider } from "./provider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Dawn Cobham | Frontend Engineer",
  description:
    "Frontend Engineer specialising in building fast, accessible, and visually polished web applications. Based in Nigeria.",
  openGraph: {
    title: "Dawn Cobham | Frontend Engineer",
    description:
      "Frontend Engineer specialising in building fast, accessible, and visually polished web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/" sizes="any" />
      </head>
      <body
        className={`${jakarta.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors position="top-right" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
