import RecommendationForm from '@/components/recommendations/recommendation-form';
import { Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Personalized Recommendations | MovieSuggest',
  description: 'Get movie recommendations tailored to your taste.',
};

export default function RecommendationsPage() {
  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <Sparkles className="h-16 w-16 mx-auto text-accent mb-4" />
        <h1 className="text-4xl font-headline font-bold mb-2">Personalized Movie Recommendations</h1>
        <p className="text-lg text-muted-foreground">
          Tell us about your movie preferences, and our AI will suggest what to watch next!
        </p>
      </div>
      <RecommendationForm />
    </div>
  );
}
