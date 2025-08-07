import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";
import { Button } from "./ui/button";
import { Event } from "./EventCard";

interface EventSliderProps {
  events: Event[];
  onEventClick?: (event: Event) => void;
}

export function EventSlider({ events, onEventClick }: EventSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slider every 5 seconds
  useEffect(() => {
    if (events.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === events.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [events.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? events.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === events.length - 1 ? 0 : currentIndex + 1);
  };

  if (events.length === 0) {
    return (
      <div className="relative h-72 bg-gradient-to-r from-muted to-muted/60 rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No upcoming events</p>
      </div>
    );
  }

  const currentEvent = events[currentIndex];

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

  return (
    <div className="relative h-72 rounded-lg overflow-hidden group shadow-lg">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${currentEvent.image})` }}
      >
        {/* Very minimal overlay - just enough for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end p-5 text-white">
        <div className="max-w-xl">
          <div className="space-y-2 mb-3">
            <span className="inline-block px-2 py-1 bg-white/25 backdrop-blur-sm text-white text-xs rounded-full border border-white/20">
              {currentEvent.category}
            </span>
            <h3 className="text-xl md:text-2xl font-bold leading-tight drop-shadow-lg">
              {currentEvent.title}
            </h3>
            <p className="text-white/95 text-sm line-clamp-2 drop-shadow-sm">
              {currentEvent.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 mb-3">
            <div className="flex items-center gap-1 bg-black/20 px-2 py-1 rounded backdrop-blur-sm">
              <Calendar size={14} />
              <span>
                {formatDate(currentEvent.startDate, currentEvent.endDate)}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-black/20 px-2 py-1 rounded backdrop-blur-sm">
              <Clock size={14} />
              <span>
                {formatTime(currentEvent.startTime, currentEvent.endTime)}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-black/20 px-2 py-1 rounded backdrop-blur-sm">
              <MapPin size={14} />
              <span className="truncate max-w-[150px]">
                {currentEvent.location}
              </span>
            </div>
          </div>

          <Button
            onClick={() => onEventClick?.(currentEvent)}
            size="sm"
            className="bg-white text-black hover:bg-white/90 border-0 shadow-lg text-sm px-4 py-2"
          >
            View Details
          </Button>
        </div>
      </div>

      {/* Navigation Arrows */}
      {events.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/25 hover:bg-white/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/20"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/25 hover:bg-white/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/20"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {events.length > 1 && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all border border-white/30 ${
                index === currentIndex
                  ? "bg-white w-5"
                  : "bg-white/50 hover:bg-white/70 w-1.5"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
