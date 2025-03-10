import 'server-only';

import { signIn } from "@/auth";
import Link from "next/link";

export default function Footer({ copyrightYear, isAdmin }: { copyrightYear: string, isAdmin: boolean }) {
  return (
    <footer className="flex justify-center gap-4 bg-theme-white text-sm text-graphite shadow-xl">
      <span>© {copyrightYear} All rights reserved</span>
      <span>|</span>
      {
        isAdmin ? (
          <Link href="/admin" className="underline">Admin</Link>
        ) : (
          <button
            onClick={async () => {
              'use server';
              await signIn("kinde", { redirectTo: '/admin' });
            }}
            className="underline"
          >
            Admin
          </button>
        )
      }
      <span>|</span>
      <Link href="/legal" className="underline">Legal</Link>
    </footer>
  );
}
