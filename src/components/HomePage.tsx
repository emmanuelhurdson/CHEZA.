import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, ArrowRight, Plus } from "lucide-react";
import { EventCard, Event } from "./EventCard";
import { CategoryChip, categories, Category } from "./CategoryChip";
import { EventSlider } from "./EventSlider";

interface HomePageProps {
  onNavigate?: (page: string, eventId?: string) => void;
  events: Event[];
}

export function HomePage({ onNavigate, events }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [email, setEmail] = useState("");

  const handleEventClick = (event: Event) => {
    onNavigate?.("event-detail", event.id);
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(selectedCategory?.id === category.id ? null : category);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
    alert("Thank you for subscribing to our newsletter!");
  };

  // Get upcoming events for slider (next 5 events)
  const getUpcomingEvents = (): Event[] => {
    const today = new Date();
    return events
      .filter((event) => new Date(event.startDate) >= today)
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      )
      .slice(0, 5);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/80 to-primary/60 text-primary-foreground">
        {/* Minimal overlay - much lighter */}
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Discover Events
                <br />
                Around You
              </h1>
              <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Find and join exciting events in your community. From music
                festivals to art exhibitions, never miss what matters to you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-sm mx-auto">
              <Button
                onClick={() => onNavigate?.("events")}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto flex items-center justify-center"
              >
                <Search size={18} className="mr-2" />
                Looking for Event
              </Button>

              <Button
                onClick={() => onNavigate?.("submit")}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto flex items-center justify-center bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Plus size={18} className="mr-2" />
                Create an Event
              </Button>
            </div>
          </div>

          {/* Upcoming Events Slider */}
          {getUpcomingEvents().length > 0 && (
            <div className="mt-12">
              <div className="text-center mb-6">
                <h2 className="text-xl lg:text-2xl font-bold text-primary-foreground">
                  Upcoming Events
                </h2>
                <p className="text-primary-foreground/80 mt-1">
                  Don't miss these exciting events happening soon
                </p>
              </div>
              <EventSlider
                events={getUpcomingEvents()}
                onEventClick={handleEventClick}
              />
            </div>
          )}
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold">
              Explore Categories
            </h2>
            <p className="text-muted-foreground mt-2">
              Find events that match your interests
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <CategoryChip
                key={category.id}
                category={category}
                variant="filter"
                isActive={selectedCategory?.id === category.id}
                onClick={handleCategoryClick}
              />
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button onClick={() => onNavigate?.("events")} variant="outline">
              Browse All Events <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold">
                Featured Events
              </h2>
              <p className="text-muted-foreground mt-2">
                Hand-picked events you might love
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => onNavigate?.("events")}
              className="hidden sm:inline-flex"
            >
              View All <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>

          {events.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={handleEventClick}
                  variant="compact"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No events available at the moment.
              </p>
            </div>
          )}

          <div className="mt-6 text-center sm:hidden">
            <Button onClick={() => onNavigate?.("events")}>
              View All Events <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 bg-gradient-to-r from-accent to-accent/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">Stay Updated</h2>
              <p className="text-muted-foreground">
                Get notified about new events in your area and never miss out on
                amazing experiences.
              </p>
            </div>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit">Subscribe</Button>
            </form>

            <p className="text-xs text-muted-foreground">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
