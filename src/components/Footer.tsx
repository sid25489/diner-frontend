"use client";

import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    // This will only run on the client side
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="mt-20 w-full bg-diner-coffee text-diner-cream py-8 px-6 text-center text-sm">
      <div className="max-w-3xl mx-auto flex flex-col gap-2 items-center">
        <span>
          © {currentYear || ''} Diner. All rights reserved.
        </span>
        <span>
          41 Prospect Rd, Oakland Park, FL 33334 · +1 954-772-8850 · Open: Morning to 3 PM
        </span>
      </div>
    </footer>
  );
}

