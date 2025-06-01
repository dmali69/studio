'use server';

import { generatePersonalizedRecommendations, type GeneratePersonalizedRecommendationsInput, type GeneratePersonalizedRecommendationsOutput } from '@/ai/flows/generate-recommendations';
import type { Recommendation } from '@/lib/types';
import { MOVIES } from '@/data/mock-data';


export async function getPersonalizedRecommendationsAction(
  input: GeneratePersonalizedRecommendationsInput
): Promise<{ recommendations?: Recommendation[]; error?: string }> {
  try {
    const result: GeneratePersonalizedRecommendationsOutput = await generatePersonalizedRecommendations(input);
    
    // Augment recommendations with full movie details if available
    const augmentedRecommendations: Recommendation[] = result.recommendations.map(rec => {
      const matchedMovie = MOVIES.find(movie => movie.title.toLowerCase() === rec.title.toLowerCase());
      if (matchedMovie) {
        return { ...matchedMovie, reason: rec.reason };
      }
      // Fallback if movie not in mock data, create a partial movie object
      return {
        id: rec.title.toLowerCase().replace(/\s+/g, '-'), // simple id generation
        title: rec.title,
        genres: [rec.genre],
        year: new Date().getFullYear(), // placeholder year
        summary: rec.reason,
        cast: [],
        rating: 0, // placeholder rating
        posterUrl: 'https://placehold.co/300x450.png', // placeholder image
        reason: rec.reason,
      };
    });

    return { recommendations: augmentedRecommendations };
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return { error: 'Failed to generate recommendations. Please try again.' };
  }
}
