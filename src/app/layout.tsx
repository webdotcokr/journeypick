import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from '@/domains/users/hooks/useAuth';
import { Header } from '@/components/layout/header';

export const metadata: Metadata = {
  title: "JourneyPick - Discover Korean Cultural Experiences",
  description: "Connect with local Korean cultural experiences. Book authentic tours, classes, and activities with local planners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <Header />
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
