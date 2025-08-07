import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import {
  Calendar,
  MapPin,
  Clock,
  User,
  Share2,
  ExternalLink,
  Facebook,
  Twitter,
  Link as LinkIcon,
  Ticket,
  ShoppingCart,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Event } from "./EventCard";
import { TicketPurchaseModal } from "./TicketPurchaseModal";

interface EventDetailPageProps {
  event?: Event;
  onNavigate?: (page: string) => void;
}

export function EventDetailPage({ event, onNavigate }: EventDetailPageProps) {
  const [isRSVPed, setIsRSVPed] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Event Not Found</h1>
          <p className="text-muted-foreground">
            The event you're looking for doesn't exist.
          </p>
          <Button onClick={() => onNavigate?.("events")}>Back to Events</Button>
        </div>
      </div>
    );
  }

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (startDate === endDate) {
      return start.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    // Multi-day event
    return `${start.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })} - ${end.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })}`;
  };

  const formatTimeRange = (startTime: string, endTime: string) => {
    if (startTime === endTime) {
      return startTime;
    }
    return `${startTime} - ${endTime}`;
  };

  const formatCompactDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (startDate === endDate) {
      return start.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }

    return `${start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  };

  const handleShare = (platform: string) => {
    const eventUrl = `${window.location.origin}/events/${event.id}`;
    const shareText = `Check out ${event.title} - ${event.description}`;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            eventUrl
          )}`
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${encodeURIComponent(eventUrl)}`
        );
        break;
      case "copy":
        navigator.clipboard.writeText(eventUrl);
        alert("Link copied to clipboard!");
        break;
    }
  };

  const handleRSVP = () => {
    setIsRSVPed(!isRSVPed);
  };

  // Create a more detailed description from the basic description
  const getFullDescription = (basicDescription: string) => {
    return `${basicDescription}

This event promises to be an unforgettable experience for all attendees. Whether you're a longtime enthusiast or new to this type of event, you'll find something to enjoy.

Join us for an amazing time with fellow community members. We'll have activities, refreshments, and plenty of opportunities to connect with like-minded people.

Don't miss this opportunity to be part of something special in your community. Mark your calendar and invite your friends!

For more information or if you have any questions about the event, please don't hesitate to reach out to the organizers.`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-96 lg:h-[500px]">
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="max-w-7xl mx-auto">
            <Badge variant="secondary" className="mb-4 bg-background/90">
              {event.category}
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Info */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <Calendar
                      size={20}
                      className="mt-1 text-primary flex-shrink-0"
                    />
                    <div>
                      <p className="font-medium">Event Dates</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDateRange(event.startDate, event.endDate)}
                      </p>
                      {event.startDate !== event.endDate && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Multi-day event
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock
                      size={20}
                      className="mt-1 text-primary flex-shrink-0"
                    />
                    <div>
                      <p className="font-medium">Event Times</p>
                      <p className="text-sm text-muted-foreground">
                        {formatTimeRange(event.startTime, event.endTime)}
                      </p>
                      {event.startTime !== event.endTime && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Duration: {event.startTime} to {event.endTime}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin
                      size={20}
                      className="mt-1 text-primary flex-shrink-0"
                    />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        {event.location}
                      </p>
                      <button className="text-sm text-primary hover:underline mt-1 inline-flex items-center">
                        View on map <ExternalLink size={14} className="ml-1" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <User
                      size={20}
                      className="mt-1 text-primary flex-shrink-0"
                    />
                    <div>
                      <p className="font-medium">Organizer</p>
                      <p className="text-sm text-muted-foreground">
                        {event.organizer}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">About This Event</h2>
              <div className="prose prose-gray max-w-none">
                {getFullDescription(event.description)
                  .split("\n\n")
                  .map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>

            {/* Map */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Location</h2>
              <div className="aspect-video rounded-lg overflow-hidden bg-muted relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=300&fit=crop"
                  alt="Event location map"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <p className="text-white text-center">
                    Interactive map will be loaded here
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{event.location}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ticket/RSVP Card */}
            <Card>
              <CardContent className="p-6 space-y-4">
                {/* Ticket Information */}
                {event.ticketInfo && (
                  <div className="space-y-4">
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <Ticket size={20} className="text-primary" />
                        <span className="font-semibold text-lg">
                          {event.ticketInfo.isFree
                            ? "Free Event"
                            : `${event.ticketInfo.price} per ticket`}
                        </span>
                      </div>
                      {event.ticketInfo.availableTickets !== undefined && (
                        <p className="text-sm text-muted-foreground">
                          {event.ticketInfo.availableTickets > 0
                            ? `${event.ticketInfo.availableTickets} tickets available`
                            : "Sold out"}
                        </p>
                      )}
                    </div>

                    <Button
                      onClick={() => setShowTicketModal(true)}
                      className="w-full"
                      size="lg"
                      disabled={event.ticketInfo.availableTickets === 0}
                    >
                      {event.ticketInfo.availableTickets === 0
                        ? "Sold Out"
                        : event.ticketInfo.isFree
                        ? "Get Free Tickets"
                        : "Buy Tickets"}
                      {event.ticketInfo.availableTickets !== 0 && (
                        <ShoppingCart size={16} className="ml-2" />
                      )}
                    </Button>
                  </div>
                )}

                {/* Traditional RSVP for events without ticket info */}
                {!event.ticketInfo && (
                  <>
                    <Button
                      onClick={handleRSVP}
                      className="w-full"
                      variant={isRSVPed ? "outline" : "default"}
                    >
                      {isRSVPed ? "✓ You're Going!" : "I'm Going"}
                    </Button>

                    {isRSVPed && (
                      <p className="text-sm text-center text-muted-foreground">
                        We'll send you updates about this event
                      </p>
                    )}
                  </>
                )}

                {/* Share Buttons */}
                <div className="space-y-3">
                  <p className="font-medium text-center">Share this event</p>
                  <div className="flex justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("facebook")}
                    >
                      <Facebook size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("twitter")}
                    >
                      <Twitter size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("copy")}
                    >
                      <LinkIcon size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <Badge variant="outline">{event.category}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dates:</span>
                    <span className="text-right">
                      {formatCompactDate(event.startDate, event.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Times:</span>
                    <span className="text-right">
                      {formatTimeRange(event.startTime, event.endTime)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Organizer:</span>
                    <span className="text-right">{event.organizer}</span>
                  </div>
                  {event.ticketInfo && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="text-right font-medium">
                        {event.ticketInfo.isFree
                          ? "Free"
                          : `${event.ticketInfo.price}`}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-gradient-to-r from-accent to-accent/80">
              <CardContent className="p-6 text-center space-y-4">
                <h3 className="font-semibold">Have an event to share?</h3>
                <p className="text-sm text-muted-foreground">
                  Submit your event and reach more people in your community.
                </p>
                <Button
                  variant="outline"
                  onClick={() => onNavigate?.("submit")}
                >
                  Submit Event
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Ticket Purchase Modal */}
      {event.ticketInfo && (
        <TicketPurchaseModal
          event={event}
          isOpen={showTicketModal}
          onClose={() => setShowTicketModal(false)}
        />
      )}
    </div>
  );
}
