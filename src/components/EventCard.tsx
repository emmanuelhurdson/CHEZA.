import { Calendar, MapPin, Clock, User, Ticket } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  image: string;
  organizer: string;
  ticketInfo?: {
    isFree: boolean;
    price?: number;
    currency?: string;
    availableTickets?: number;
    totalTickets?: number;
  };
}

interface EventCardProps {
  event: Event;
  onClick?: (event: Event) => void;
  variant?: "default" | "compact";
}

export function EventCard({
  event,
  onClick,
  variant = "default",
}: EventCardProps) {
  const handleClick = () => {
    onClick?.(event);
  };

  const formatDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (startDate === endDate) {
      return start.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }

    return `${start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
  };

  const formatTime = (startTime: string, endTime: string) => {
    if (startTime === endTime) {
      return startTime;
    }
    return `${startTime} - ${endTime}`;
  };

  const cardClasses =
    variant === "compact"
      ? "group cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1 h-full"
      : "group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-2 h-full";

  const imageClasses =
    variant === "compact"
      ? "h-36 w-full object-cover"
      : "h-48 w-full object-cover";

  const titleClasses =
    variant === "compact"
      ? "text-base font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors"
      : "text-lg font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors";

  const descriptionClasses =
    variant === "compact"
      ? "text-xs text-muted-foreground line-clamp-2"
      : "text-sm text-muted-foreground line-clamp-3";

  const iconSize = variant === "compact" ? 14 : 16;
  const textSize = variant === "compact" ? "text-xs" : "text-sm";

  return (
    <Card className={cardClasses} onClick={handleClick}>
      <div className="relative overflow-hidden rounded-t-lg">
        <img src={event.image} alt={event.title} className={imageClasses} />
        <div className="absolute top-3 left-3">
          <span className="inline-block px-2 py-1 bg-white/90 text-primary text-xs font-medium rounded-full">
            {event.category}
          </span>
        </div>
      </div>

      <CardContent
        className={variant === "compact" ? "p-3 space-y-2" : "p-4 space-y-3"}
      >
        <h3 className={titleClasses}>{event.title}</h3>

        <p className={descriptionClasses}>{event.description}</p>

        <div className="space-y-1">
          <div
            className={`flex items-center gap-2 ${textSize} text-muted-foreground`}
          >
            <Calendar size={iconSize} className="flex-shrink-0" />
            <span className="truncate">
              {formatDate(event.startDate, event.endDate)}
            </span>
          </div>

          <div
            className={`flex items-center gap-2 ${textSize} text-muted-foreground`}
          >
            <Clock size={iconSize} className="flex-shrink-0" />
            <span className="truncate">
              {formatTime(event.startTime, event.endTime)}
            </span>
          </div>

          <div
            className={`flex items-center gap-2 ${textSize} text-muted-foreground`}
          >
            <MapPin size={iconSize} className="flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>

          <div
            className={`flex items-center gap-2 ${textSize} text-muted-foreground`}
          >
            <User size={iconSize} className="flex-shrink-0" />
            <span className="truncate">{event.organizer}</span>
          </div>
        </div>

        {/* Ticket Info */}
        {event.ticketInfo && (
          <div
            className={`flex items-center justify-between pt-2 mt-2 border-t border-border/50`}
          >
            <div className={`flex items-center gap-2 ${textSize}`}>
              <Ticket size={iconSize} className="flex-shrink-0 text-primary" />
              <span className="font-medium">
                {event.ticketInfo.isFree
                  ? "Free"
                  : `${event.ticketInfo.currency || "$"}${
                      event.ticketInfo.price
                    }`}
              </span>
            </div>
            {!event.ticketInfo.isFree &&
              event.ticketInfo.availableTickets !== undefined && (
                <span className={`${textSize} text-muted-foreground`}>
                  {event.ticketInfo.availableTickets > 0
                    ? `${event.ticketInfo.availableTickets} left`
                    : "Sold out"}
                </span>
              )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
