import type { Movie } from '@/lib/types';
import MovieCard from './movie-card';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
}

export default function MovieGrid({ movies, title }: MovieGridProps) {
  if (!movies || movies.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        <p>No movies found.</p>
      </div>
    );
  }

  return (
    <section className="py-8">
      {title && <h2 className="text-3xl font-headline font-semibold mb-6">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
