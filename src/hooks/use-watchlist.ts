'use client';

import type { Movie } from '@/lib/types';
import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

const WATCHLIST_KEY = 'movieSuggestWatchlist';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedWatchlist = localStorage.getItem(WATCHLIST_KEY);
      if (storedWatchlist) {
        setWatchlist(JSON.parse(storedWatchlist));
      }
    } catch (error) {
      console.error("Failed to load watchlist from localStorage", error);
    }
    setIsLoading(false);
  }, []);

  const saveWatchlist = useCallback((updatedWatchlist: Movie[]) => {
    try {
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist));
      setWatchlist(updatedWatchlist);
    } catch (error) {
      console.error("Failed to save watchlist to localStorage", error);
      toast({
        title: "Error",
        description: "Could not update watchlist.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const addToWatchlist = useCallback((movie: Movie) => {
    if (watchlist.find(m => m.id === movie.id)) {
      toast({
        title: "Already in Watchlist",
        description: `${movie.title} is already in your watchlist.`,
      });
      return;
    }
    const updatedWatchlist = [...watchlist, movie];
    saveWatchlist(updatedWatchlist);
    toast({
      title: "Added to Watchlist",
      description: `${movie.title} has been added to your watchlist.`,
    });
  }, [watchlist, saveWatchlist, toast]);

  const removeFromWatchlist = useCallback((movieId: string) => {
    const movie = watchlist.find(m => m.id === movieId);
    const updatedWatchlist = watchlist.filter(m => m.id !== movieId);
    saveWatchlist(updatedWatchlist);
    if (movie) {
      toast({
        title: "Removed from Watchlist",
        description: `${movie.title} has been removed from your watchlist.`,
      });
    }
  }, [watchlist, saveWatchlist, toast]);

  const isInWatchlist = useCallback((movieId: string) => {
    return !!watchlist.find(m => m.id === movieId);
  }, [watchlist]);

  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, isLoading };
}
