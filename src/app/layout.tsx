import Providers from "@/providers/Providers";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "PureHaat",
  description: "PureHaat Online Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Add the external font here */}
        <link
          href="https://fonts.maateen.me/kalpurush/font.css"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-kalpurush">
        <Providers>
          <Toaster
            richColors
            position="top-center"
            toastOptions={{
              duration: 1000,
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
