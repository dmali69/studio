import { MOVIES, GENRES } from '@/data/mock-data';
import MovieGrid from '@/components/movies/movie-grid';
import GenreTabs from '@/components/movies/genre-tabs';
import type { Movie } from '@/lib/types';

export default function HomePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const selectedGenre = typeof searchParams?.genre === 'string' ? searchParams.genre : 'all';
  const searchQuery = typeof searchParams?.q === 'string' ? searchParams.q.toLowerCase() : '';

  let filteredMovies: Movie[] = MOVIES;

  if (selectedGenre !== 'all') {
    const genreName = GENRES.find(g => g.id === selectedGenre)?.name;
    if (genreName) {
      filteredMovies = filteredMovies.filter(movie => movie.genres.includes(genreName));
    }
  }

  if (searchQuery) {
    filteredMovies = filteredMovies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery) ||
      movie.cast.some(actor => actor.toLowerCase().includes(searchQuery))
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-headline font-bold mb-4 text-center md:text-left">Browse Movies</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center md:text-left">
        Explore our collection or filter by genre. Use the search bar in the navigation to find specific titles or actors.
      </p>
      
      <GenreTabs genres={GENRES} />
      
      <MovieGrid movies={filteredMovies} />
    </div>
  );
}
