import { Poppins } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../redux/provider";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
});
export const metadata = {
  title: "CYPSOS",
  description: "Point of Sale",
  other: { pinterest: "nopin" },
  manifest: "../../manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
