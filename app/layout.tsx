import 'server-only';

import { platypi } from '@/app/components/fonts';
import { Nav } from '@/app/components/nav';
import { Flower1, Flower2 } from '@/app/components/svg/flower';
import '@/app/globals.css';
import checkIsAdmin from '@/app/util/checkIsAdmin';
import Footer from '@/app/components/footer';

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const year = new Date().getFullYear();
  const copyrightYear = year > 2025 ? `2025-${year}` : '2025';
  const isAdmin = await checkIsAdmin();

  return (
    <html lang="en" className={`flex flex-col size-full items-stretch ${platypi.className}`}>
      <body className="flex flex-col flex-grow items-stretch bg-theme-light-brown">
        <Flower1
          className="fixed -z-10 fill-theme-green bottom-0 right-1/4 scale-150 rotate-12
          lg:translate-x-32
          translate-x-64"
        />
        <Flower2
          className="fixed -z-10 fill-theme-brown top-64 left-1/4 scale-150 -rotate-12
          lg:-translate-x-32
          -translate-x-64
          sm:block
          hidden"
        />

        <main className="flex-grow pb-12 size-full flex flex-col items-center md:px-16 sm:px-8 px-0">
          <div className="flex flex-col items-center size-full max-w-screen-lg relative">
            <Nav showAdminButton={isAdmin} />{children}
          </div>
        </main>

        <Footer copyrightYear={copyrightYear} isAdmin={isAdmin} />
      </body>
    </html>
  );
}
