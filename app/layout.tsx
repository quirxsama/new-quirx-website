import type { Metadata } from "next";
import { Inter, Poppins, Dancing_Script } from "next/font/google";
import "./globals.css";
import LanguageSwitch from "@/components/LanguageSwitch";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
});
const dancingScript = Dancing_Script({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dancing'
});

export const metadata: Metadata = {
  title: "QuirxKaan | Full Stack Developer & UI/UX Designer",
  description: "Full Stack Developer ve UI/UX Designer olarak profesyonel çözümler sunuyorum. Web geliştirme, mobil uygulama ve kullanıcı deneyimi tasarımı konularında uzman.",
  keywords: ["Full Stack Developer", "UI/UX Designer", "Web Development", "React", "Next.js", "TypeScript"],
  authors: [{ name: "QuirxKaan" }],
  openGraph: {
    title: "QuirxKaan | Full Stack Developer & UI/UX Designer",
    description: "Full Stack Developer ve UI/UX Designer olarak profesyonel çözümler sunuyorum.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body className={`${inter.className} ${poppins.variable} ${dancingScript.variable} overflow-x-hidden w-full`}>
        <LanguageProvider>
          {/* Gradient overlay */}
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
          
          <LanguageSwitch />
          <main className="relative z-10 w-full">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
