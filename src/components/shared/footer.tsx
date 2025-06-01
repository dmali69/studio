export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} MovieSuggest. All rights reserved.</p>
        <p className="mt-1">Discover your next favorite movie.</p>
      </div>
    </footer>
  );
}
