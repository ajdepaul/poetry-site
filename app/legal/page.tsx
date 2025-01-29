'use server';

import { H } from '@/app/components/ui/header';
import { Nav } from '@/app/components/ui/nav';
import { Sheet } from '@/app/components/ui/sheet';
import { readFile } from 'fs/promises';
import Link from 'next/link';
import path from 'path';

export default async function PoemPage() {
  const year = new Date().getFullYear();
  const copyrightYear = year > 2025 ? `2025-${year}` : '2025';

  const attributionsPath = path.join(process.cwd(), 'oss-attribution/attribution.txt');
  const attributions = await readFile(attributionsPath, 'utf-8');

  return (
    <>
      <Nav />
      <H level="1" size="6xl" className="py-16 text-center">Legal</H>

      <Sheet className="leading-poem">
        <div className="sm:px-4">
          <p className="leading-poem-1/2 pb-6 pt-3 whitespace-pre-wrap">
            Copyright © {copyrightYear}<br />
            All rights reserved.<br />
            <Link href="https://github.com/ajdepaul/poetry-site">https://github.com/ajdepaul/poetry-site</Link><br />
            <br />
            <br />
            ******************************<br />
            <br />
            {attributions}
          </p>
        </div>
      </Sheet>
    </>
  );
}
