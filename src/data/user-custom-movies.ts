import type { Movie } from '@/lib/types';

/**
 * CUSTOM MOVIE DATA
 * ------------------
 * You can add your custom movie data here, converted from your CSV file.
 * Each movie should be an object that matches the 'Movie' type structure.
 *
 * The Movie type (from src/lib/types.ts) looks like this:
 * export interface Movie {
 *   id: string;         // A unique identifier for the movie (e.g., "csv-movie-1")
 *   title: string;        // The title of the movie
 *   year: number;         // The release year (e.g., 2023)
 *   genres: string[];     // An array of genre names (e.g., ["Action", "Sci-Fi"])
 *                         // Make sure these genre names match genres defined in src/data/mock-data.ts GENRES array
 *                         // or add new genres there.
 *   summary: string;      // A brief plot summary
 *   cast: string[];       // An array of main cast members (e.g., ["Actor Name 1", "Actor Name 2"])
 *   rating: number;       // The movie's rating (e.g., 8.5)
 *   posterUrl: string;    // URL to the movie's poster image (e.g., "https://placehold.co/300x450.png")
 *   backdropUrl?: string; // Optional URL to a backdrop image (e.g., "https://placehold.co/1280x720.png")
 * }
 *
 * Example of converting a CSV row:
 * If your CSV row is (assuming headers: ID,Title,Year,Genres,Summary,Cast,Rating,PosterURL):
 * movie001,My CSV Movie,2024,"Drama,Thriller","A movie from my CSV.","Actor X,Actor Y",7.9,https://placehold.co/300x450/abc/def.png
 *
 * You would add it to the USER_CUSTOM_MOVIES array like this:
 * {
 *   id: 'movie001',
 *   title: 'My CSV Movie',
 *   year: 2024,
 *   genres: ['Drama', 'Thriller'], // CSV "Drama,Thriller" becomes an array
 *   summary: 'A movie from my CSV.',
 *   cast: ['Actor X', 'Actor Y'], // CSV "Actor X,Actor Y" becomes an array
 *   rating: 7.9,
 *   posterUrl: 'https://placehold.co/300x450/abc/def.png',
 * }
 *
 * Add your movie objects to the array below.
 *
 * To use this data in the app:
 * 1. Populate this array with your movie objects.
 * 2. After populating, you can ask me to help modify the application code 
 *    (e.g., in src/data/mock-data.ts and relevant page files like src/app/page.tsx)
 *    to import and combine this `USER_CUSTOM_MOVIES` array with the existing movies.
 */
export const USER_CUSTOM_MOVIES: Movie[] = [
  // Add your movie objects here. For example:
  // {
  //   id: 'example-csv-movie-1',
  //   title: 'Example CSV Movie',
  //   year: 2023,
  //   genres: ['Action', 'Sci-Fi'],
  //   summary: 'This is an example movie added from a CSV.',
  //   cast: ['CSV Actor 1', 'CSV Actor 2'],
  //   rating: 8.0,
  //   posterUrl: 'https://placehold.co/300x450.png',
  //   backdropUrl: 'https://placehold.co/1280x720.png',
  // },
  // {
  //   id: 'example-csv-movie-2',
  //   title: 'Another CSV Gem',
  //   year: 2022,
  //   genres: ['Comedy'],
  //   summary: 'A hilarious adventure sourced from your data.',
  //   cast: ['CSV Comedian'],
  //   rating: 7.5,
  //   posterUrl: 'https://placehold.co/300x451.png',
  // },
];
