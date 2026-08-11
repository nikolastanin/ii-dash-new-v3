import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

const yowza = localFont({
  src: "../../public/fonts/yowza-d-bold.woff2",
  variable: "--font-yowza",
  weight: "700",
  display: "swap",
});

const TITLE = "Investing Insiders | Your plan";
const DESCRIPTION =
  "A UK money plan built around you — tell us what you're trying to do and we'll turn it into steps, tools and guides.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${publicSans.variable} ${yowza.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-ink bg-canvas">
        {children}
      </body>
    </html>
  );
}
