'use client';

import { useState, useTransition } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { getPersonalizedRecommendationsAction } from '@/app/actions';
import type { Recommendation } from '@/lib/types';
import MovieGrid from '@/components/movies/movie-grid';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const recommendationFormSchema = z.object({
  viewingHistory: z.string().min(10, { message: 'Please describe your viewing history (at least 10 characters).' }),
  preferences: z.string().optional(),
  numberOfRecommendations: z.coerce.number().min(1).max(10).default(3),
});

type RecommendationFormValues = z.infer<typeof recommendationFormSchema>;

export default function RecommendationForm() {
  const [isPending, startTransition] = useTransition();
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationFormSchema),
    defaultValues: {
      viewingHistory: '',
      preferences: '',
      numberOfRecommendations: 3,
    },
  });

  const onSubmit: SubmitHandler<RecommendationFormValues> = (data) => {
    startTransition(async () => {
      setError(null);
      setRecommendations(null);
      const result = await getPersonalizedRecommendationsAction(data);
      if (result.error) {
        setError(result.error);
      } else if (result.recommendations) {
        setRecommendations(result.recommendations);
      }
    });
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 border rounded-lg shadow-md bg-card">
          <FormField
            control={form.control}
            name="viewingHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="viewingHistory" className="text-lg">Viewing History</FormLabel>
                <FormControl>
                  <Textarea
                    id="viewingHistory"
                    placeholder="e.g., I recently watched and enjoyed sci-fi thrillers like 'Cosmic Odyssey' and comedies. I didn't like slow-paced dramas."
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe movies or genres you've watched and liked/disliked.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferences"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="preferences" className="text-lg">Preferences (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    id="preferences"
                    placeholder="e.g., Favorite actors: Alex Rider. Preferred directors: Jane Astra. Avoid movies with excessive gore."
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Mention any specific actors, directors, themes, or elements you prefer or want to avoid.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="numberOfRecommendations"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="numberOfRecommendations" className="text-lg">Number of Recommendations</FormLabel>
                <FormControl>
                  <Input id="numberOfRecommendations" type="number" min="1" max="10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending} className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
            {isPending ? 'Getting Recommendations...' : 'Get Recommendations'}
          </Button>
        </form>
      </Form>

      {error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendations && recommendations.length > 0 && (
        <div className="mt-12">
            <h2 className="text-3xl font-headline font-semibold mb-6">Here are your recommendations:</h2>
            {recommendations.map(rec => (
              <div key={rec.id} className="mb-4 p-4 border rounded-lg bg-card">
                <h3 className="text-xl font-semibold text-accent">{rec.title}</h3>
                {rec.reason && <p className="text-sm text-muted-foreground mt-1 italic">"{rec.reason}"</p>}
              </div>
            ))}
            <MovieGrid movies={recommendations} />
        </div>
      )}
      {recommendations && recommendations.length === 0 && (
         <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>No Recommendations Found</AlertTitle>
            <AlertDescription>We couldn't find any recommendations based on your input. Try adjusting your criteria.</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
