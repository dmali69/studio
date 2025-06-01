'use client';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Genre } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

interface GenreTabsProps {
  genres: Genre[];
}

export default function GenreTabs({ genres }: GenreTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentGenre = searchParams.get('genre') || 'all';

  const handleGenreChange = (genreId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (genreId === 'all') {
      params.delete('genre');
    } else {
      params.set('genre', genreId);
    }
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <Tabs value={currentGenre} onValueChange={handleGenreChange} className="mb-8">
      <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:flex md:w-auto">
        <TabsTrigger value="all">All Genres</TabsTrigger>
        {genres.map((genre) => (
          <TabsTrigger key={genre.id} value={genre.id}>
            {genre.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
