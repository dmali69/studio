'use client';

import MovieGrid from '@/components/movies/movie-grid';
import { useWatchlist } from '@/hooks/use-watchlist';
import { Skeleton } from '@/components/ui/skeleton';
import { ListVideo } from 'lucide-react';

export default function WatchlistPage() {
  const { watchlist, isLoading } = useWatchlist();

  if (isLoading) {
    return (
      <div>
        <h1 className="text-4xl font-headline font-bold mb-8">My Watchlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-4xl font-headline font-bold mb-8 flex items-center gap-3">
        <ListVideo className="h-10 w-10 text-accent"/>
        My Watchlist
      </h1>
      {watchlist.length === 0 ? (
        <div className="text-center py-12">
          <ListVideo className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">Your watchlist is empty.</p>
          <p className="text-muted-foreground">Add movies to your watchlist to see them here.</p>
        </div>
      ) : (
        <MovieGrid movies={watchlist} />
      )}
    </div>
  );
}
