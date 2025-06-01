// src/ai/flows/generate-recommendations.ts
'use server';
/**
 * @fileOverview Flow for generating personalized movie recommendations based on viewing history.
 *
 * - generatePersonalizedRecommendations - A function that generates personalized movie recommendations.
 * - GeneratePersonalizedRecommendationsInput - The input type for the generatePersonalizedRecommendations function.
 * - GeneratePersonalizedRecommendationsOutput - The return type for the generatePersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedRecommendationsInputSchema = z.object({
  viewingHistory: z
    .string()
    .describe(
      'A summary of the user viewing history, including titles, genres, and ratings (if available).'
    ),
  preferences: z
    .string()
    .optional()
    .describe('Optional user preferences, such as preferred actors or directors.'),
  numberOfRecommendations: z
    .number()
    .default(3)
    .describe('The number of movie recommendations to generate.'),
});
export type GeneratePersonalizedRecommendationsInput = z.infer<typeof GeneratePersonalizedRecommendationsInputSchema>;

const GeneratePersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      title: z.string().describe('The title of the recommended movie.'),
      genre: z.string().describe('The genre of the recommended movie.'),
      reason: z.string().describe('The reason why this movie is recommended for the user.'),
    })
  ).describe('A list of personalized movie recommendations.'),
});
export type GeneratePersonalizedRecommendationsOutput = z.infer<typeof GeneratePersonalizedRecommendationsOutputSchema>;

export async function generatePersonalizedRecommendations(input: GeneratePersonalizedRecommendationsInput): Promise<GeneratePersonalizedRecommendationsOutput> {
  return generatePersonalizedRecommendationsFlow(input);
}

const generateRecommendationsPrompt = ai.definePrompt({
  name: 'generateRecommendationsPrompt',
  input: {schema: GeneratePersonalizedRecommendationsInputSchema},
  output: {schema: GeneratePersonalizedRecommendationsOutputSchema},
  prompt: `You are a movie recommendation expert. Based on the user's viewing history and preferences, you will provide personalized movie recommendations.

Viewing History: {{{viewingHistory}}}
Preferences: {{{preferences}}}

Provide {{numberOfRecommendations}} movie recommendations, and briefly explain why each movie is recommended for the user.`,
});

const generatePersonalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedRecommendationsFlow',
    inputSchema: GeneratePersonalizedRecommendationsInputSchema,
    outputSchema: GeneratePersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await generateRecommendationsPrompt(input);
    return output!;
  }
);
