import { Montserrat as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { StarknetProvider } from "~/StarknetProvider";
import { getMetadata } from "@/utils/getMetadata";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { UIProvider } from "./providers";
import AgroContext from "./components/AgroContext";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = getMetadata({
  title: "AgroVest",
  description:
    "Tokenize your business, attract investors, while showcasing your products on a thriving marketplace.",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("min-h-screen bg-white antialiased", fontSans.variable)}
      >
        <StarknetProvider>
          <AgroContext>
            <UIProvider>{children}</UIProvider>
            <Toaster position="top-right" />
          </AgroContext>
        </StarknetProvider>
      </body>
    </html>
  );
}
