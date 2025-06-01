export interface Movie {
  id: string;
  title: string;
  year: number;
  genres: string[]; // Array of genre names
  summary: string;
  cast: string[];
  rating: number; // Example: 8.5 for 8.5/10
  posterUrl: string;
  backdropUrl?: string;
}

export interface Genre {
  id: string;
  name: string;
}

export interface Recommendation extends Movie {
  reason?: string;
}
