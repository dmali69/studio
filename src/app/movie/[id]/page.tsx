'use client';

import Image from 'next/image';
import { MOVIES } from '@/data/mock-data';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Bookmark, Star, Users, CalendarDays, Film, CheckCircle } from 'lucide-react';
import { useWatchlist } from '@/hooks/use-watchlist';
import { Badge } from '@/components/ui/badge';

interface MovieDetailsPageProps {
  params: { id: string };
}

export default function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const movie = MOVIES.find(m => m.id === params.id);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  if (!movie) {
    notFound();
  }

  const isBookmarked = isInWatchlist(movie.id);

  const handleWatchlistToggle = () => {
    if (isBookmarked) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="py-8">
      <div className="relative h-[300px] md:h-[500px] rounded-lg overflow-hidden mb-8 shadow-xl">
        {movie.backdropUrl ? (
          <Image
            src={movie.backdropUrl}
            alt={`${movie.title} backdrop`}
            layout="fill"
            objectFit="cover"
            className="brightness-50"
            data-ai-hint="movie scene"
          />
        ) : (
           <div className="w-full h-full bg-card flex items-center justify-center">
             <Film className="w-24 h-24 text-muted-foreground" />
           </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-white drop-shadow-lg">{movie.title}</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            width={300}
            height={450}
            className="rounded-lg shadow-xl w-full max-w-xs mx-auto md:mx-0"
            data-ai-hint="movie poster"
          />
          <Button
            onClick={handleWatchlistToggle}
            variant={isBookmarked ? "secondary" : "default"}
            className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground"
            aria-label={isBookmarked ? `Remove ${movie.title} from watchlist` : `Add ${movie.title} to watchlist`}
          >
            {isBookmarked ? <CheckCircle className="mr-2 h-5 w-5" /> : <Bookmark className="mr-2 h-5 w-5" />}
            {isBookmarked ? 'In Watchlist' : 'Add to Watchlist'}
          </Button>
        </div>

        <div className="md:col-span-2">
          <div className="space-y-6">
            <div className="flex items-center space-x-4 text-lg">
              <div className="flex items-center" title="Rating">
                <Star className="h-6 w-6 text-accent fill-accent mr-2" />
                <span className="font-semibold">{movie.rating}/10</span>
              </div>
              <div className="flex items-center" title="Year">
                <CalendarDays className="h-6 w-6 text-muted-foreground mr-2" />
                <span className="font-medium">{movie.year}</span>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-2">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(genre => (
                  <Badge key={genre} variant="secondary" className="text-sm px-3 py-1">{genre}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Summary</h2>
              <p className="text-foreground/80 leading-relaxed">{movie.summary}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Cast</h2>
              <div className="flex items-center text-foreground/80">
                <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                <p>{movie.cast.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
