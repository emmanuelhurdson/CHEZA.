import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { EventsPage } from "./components/EventsPage";
import { EventDetailPage } from "./components/EventDetailPage";
import { SubmitEventPage } from "./components/SubmitEventPage";
import { AboutPage } from "./components/AboutPage";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { Event } from "./components/EventCard";
import "./styles.css"; // Ensure styles are imported
type Page =
  | "home"
  | "events"
  | "event-detail"
  | "submit"
  | "about"
  | "login"
  | "signup";

export interface User {
  id: string;
  name: string;
  email: string;
}

// Initial events data with future dates and start/end times
const initialEvents: Event[] = [
  {
    id: "1",
    title: "Summer Jazz Festival",
    description:
      "Experience the best jazz musicians from around the world in this three-day festival.",
    startDate: "2025-08-15",
    endDate: "2025-08-17",
    startTime: "7:00 PM",
    endTime: "11:00 PM",
    location: "Central Park Amphitheater, New York",
    category: "Music",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=400&fit=crop",
    organizer: "NYC Music Events",
    ticketInfo: {
      isFree: false,
      price: 45.0,
      currency: "$",
      availableTickets: 250,
      totalTickets: 500,
    },
  },
  {
    id: "2",
    title: "Modern Art Exhibition",
    description:
      "Discover contemporary masterpieces by emerging and established artists.",
    startDate: "2025-08-20",
    endDate: "2025-09-15",
    startTime: "10:00 AM",
    endTime: "6:00 PM",
    location: "Metropolitan Art Gallery, Downtown",
    category: "Arts",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=400&fit=crop",
    organizer: "Art Collective NYC",
    ticketInfo: {
      isFree: false,
      price: 15.0,
      currency: "$",
      availableTickets: 150,
      totalTickets: 200,
    },
  },
  {
    id: "3",
    title: "Community Sports Day",
    description:
      "Join us for a day of friendly competition, games, and community spirit.",
    startDate: "2025-08-18",
    endDate: "2025-08-18",
    startTime: "9:00 AM",
    endTime: "5:00 PM",
    location: "Riverside Sports Complex",
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop",
    organizer: "Community Recreation",
    ticketInfo: {
      isFree: true,
      availableTickets: 500,
      totalTickets: 500,
    },
  },
  {
    id: "4",
    title: "Food Truck Festival",
    description:
      "Taste amazing food from local vendors and food trucks all in one place.",
    startDate: "2025-08-22",
    endDate: "2025-08-24",
    startTime: "11:00 AM",
    endTime: "9:00 PM",
    location: "Downtown Plaza",
    category: "Food & Drink",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=400&fit=crop",
    organizer: "Street Food Alliance",
    ticketInfo: {
      isFree: false,
      price: 25.0,
      currency: "$",
      availableTickets: 75,
      totalTickets: 300,
    },
  },
  {
    id: "5",
    title: "Rock Concert Night",
    description:
      "Local bands perform their greatest hits in an intimate venue setting.",
    startDate: "2025-08-25",
    endDate: "2025-08-25",
    startTime: "8:00 PM",
    endTime: "12:00 AM",
    location: "The Underground Club",
    category: "Music",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&h=400&fit=crop",
    organizer: "Rock Venue NYC",
    ticketInfo: {
      isFree: false,
      price: 35.0,
      currency: "$",
      availableTickets: 0,
      totalTickets: 200,
    },
  },
  {
    id: "6",
    title: "Photography Workshop",
    description:
      "Learn professional photography techniques from industry experts.",
    startDate: "2025-08-19",
    endDate: "2025-08-19",
    startTime: "2:00 PM",
    endTime: "6:00 PM",
    location: "Creative Studio Downtown",
    category: "Photography",
    image:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=400&fit=crop",
    organizer: "Photo Academy",
    ticketInfo: {
      isFree: false,
      price: 85.0,
      currency: "$",
      availableTickets: 12,
      totalTickets: 20,
    },
  },
  {
    id: "7",
    title: "Wellness Retreat",
    description:
      "A day of meditation, yoga, and mindfulness practices in nature.",
    startDate: "2025-08-17",
    endDate: "2025-08-17",
    startTime: "8:00 AM",
    endTime: "4:00 PM",
    location: "Serenity Gardens",
    category: "Wellness",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=400&fit=crop",
    organizer: "Mindful Living",
    ticketInfo: {
      isFree: true,
      availableTickets: 40,
      totalTickets: 50,
    },
  },
  {
    id: "8",
    title: "Comedy Show",
    description: "Laugh out loud with the city's funniest comedians.",
    startDate: "2025-08-21",
    endDate: "2025-08-21",
    startTime: "9:00 PM",
    endTime: "11:30 PM",
    location: "Comedy Central Theater",
    category: "Entertainment",
    image:
      "https://images.unsplash.com/photo-1585699225809-c6bc4d3226b9?w=500&h=400&fit=crop",
    organizer: "Laugh Factory",
    ticketInfo: {
      isFree: false,
      price: 28.0,
      currency: "$",
      availableTickets: 95,
      totalTickets: 150,
    },
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [user, setUser] = useState<User | null>(null);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | null>(
    null
  );

  const handleNavigation = (page: string, eventId?: string) => {
    // Check if user is trying to access submit page without authentication
    if (page === "submit" && !user) {
      setRedirectAfterLogin("submit");
      setCurrentPage("login");
      window.scrollTo(0, 0);
      return;
    }

    setCurrentPage(page as Page);
    if (eventId) {
      setSelectedEventId(eventId);
    }
    // Scroll to top on navigation
    window.scrollTo(0, 0);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    // Redirect to intended page after login
    if (redirectAfterLogin) {
      setCurrentPage(redirectAfterLogin as Page);
      setRedirectAfterLogin(null);
    } else {
      setCurrentPage("home");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("home");
  };

  const handleSignup = (userData: User) => {
    setUser(userData);
    // Redirect to intended page after signup
    if (redirectAfterLogin) {
      setCurrentPage(redirectAfterLogin as Page);
      setRedirectAfterLogin(null);
    } else {
      setCurrentPage("home");
    }
  };

  const addEvent = (newEvent: Omit<Event, "id">) => {
    // Generate a unique ID
    const id = (events.length + 1).toString();
    const eventWithId = { ...newEvent, id };
    setEvents((prevEvents) => [...prevEvents, eventWithId]);
    return eventWithId;
  };

  const getEvent = (eventId: string): Event | undefined => {
    return events.find((event) => event.id === eventId);
  };

  const getFeaturedEvents = (): Event[] => {
    // Return first 8 events as featured for better grid display
    return events.slice(0, 8);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            onNavigate={handleNavigation}
            events={getFeaturedEvents()}
          />
        );
      case "events":
        return <EventsPage onNavigate={handleNavigation} events={events} />;
      case "event-detail":
        return (
          <EventDetailPage
            event={getEvent(selectedEventId)}
            onNavigate={handleNavigation}
          />
        );
      case "submit":
        // This should only render if user is authenticated (handled by navigation guard)
        return (
          <SubmitEventPage
            onNavigate={handleNavigation}
            onEventSubmit={addEvent}
            user={user}
          />
        );
      case "about":
        return <AboutPage onNavigate={handleNavigation} />;
      case "login":
        return (
          <LoginPage onNavigate={handleNavigation} onLogin={handleLogin} />
        );
      case "signup":
        return (
          <SignupPage onNavigate={handleNavigation} onSignup={handleSignup} />
        );
      default:
        return (
          <HomePage
            onNavigate={handleNavigation}
            events={getFeaturedEvents()}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigation}
        user={user}
        onLogout={handleLogout}
      />
      <main className="flex-1">{renderCurrentPage()}</main>
      <Footer onNavigate={handleNavigation} />
    </div>
  );
}
