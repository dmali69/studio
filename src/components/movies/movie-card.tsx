'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Movie } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Bookmark, Star, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useWatchlist } from '@/hooks/use-watchlist';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const isBookmarked = isInWatchlist(movie.id);

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation if card is wrapped in Link
    e.stopPropagation();
    if (isBookmarked) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-105 h-full flex flex-col group">
      <Link href={`/movie/${movie.id}`} className="block">
        <CardHeader className="p-0 relative">
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            width={300}
            height={450}
            className="w-full h-auto object-cover aspect-[2/3]"
            data-ai-hint="movie poster"
          />
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link href={`/movie/${movie.id}`} className="block">
          <CardTitle className="text-lg font-semibold hover:text-accent transition-colors truncate" title={movie.title}>
            {movie.title}
          </CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">{movie.year}</p>
        <div className="flex items-center mt-2">
          <Star className="h-4 w-4 text-accent fill-accent mr-1" />
          <span className="text-sm font-medium">{movie.rating}/10</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          variant={isBookmarked ? "secondary" : "outline"}
          size="sm"
          className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
          onClick={handleWatchlistToggle}
          aria-label={isBookmarked ? `Remove ${movie.title} from watchlist` : `Add ${movie.title} to watchlist`}
        >
          {isBookmarked ? <CheckCircle className="mr-2 h-4 w-4" /> : <Bookmark className="mr-2 h-4 w-4" />}
          {isBookmarked ? 'In Watchlist' : 'Add to Watchlist'}
        </Button>
      </CardFooter>
    </Card>
  );
}
