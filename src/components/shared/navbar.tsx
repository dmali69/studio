'use client';

import Link from 'next/link';
import { Film, Search, ListVideo, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    // Update search query in input if URL changes
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pathname === '/') {
      const params = new URLSearchParams(searchParams.toString());
      if (searchQuery.trim()) {
        params.set('q', searchQuery.trim());
      } else {
        params.delete('q');
      }
      router.push(`/?${params.toString()}`);
    } else {
      // If on other pages, redirect to home with search query
      if (searchQuery.trim()) {
        router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      } else {
        router.push('/');
      }
    }
  };

  const navLinkClasses = (path: string) =>
    `flex items-center gap-2 hover:text-accent transition-colors ${
      pathname === path ? 'text-accent font-semibold' : 'text-foreground/80'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-headline font-bold text-accent">
          <Film className="h-7 w-7" />
          MovieSuggest
        </Link>

        {pathname === '/' && (
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md ml-8">
            <Input
              type="search"
              placeholder="Search movies by title or actor..."
              className="w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </form>
        )}
        
        <nav className="flex items-center gap-6">
          <Link href="/recommendations" className={navLinkClasses('/recommendations')}>
            <Sparkles className="h-5 w-5" />
            Recommendations
          </Link>
          <Link href="/watchlist" className={navLinkClasses('/watchlist')}>
            <ListVideo className="h-5 w-5" />
            Watchlist
          </Link>
        </nav>
      </div>
    </header>
  );
}
