import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import { Container, SSRProvider } from "@/components/bootstrap";
import NavBar from "./NavBar";
import Footer from "./Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'CP-Clock',
  description: 'See upcoming programming contests across platforms',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SSRProvider>
          <NavBar />
          <main>
            <Container className="py-4">
              {children}
            </Container>
          </main>
          <Footer />
        </SSRProvider>
      </body>
    </html>
  );
}
