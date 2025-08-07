import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Upload,
  Calendar,
  MapPin,
  User as UserIcon,
  Sparkles,
  CheckCircle,
  Ticket,
  DollarSign,
} from "lucide-react";
import { categories } from "./CategoryChip";
import { Event } from "./EventCard";
import { User } from "../App";

interface SubmitEventPageProps {
  onNavigate?: (page: string) => void;
  onEventSubmit?: (event: Omit<Event, "id">) => Event;
  user?: User | null;
}

export function SubmitEventPage({
  onNavigate,
  onEventSubmit,
  user,
}: SubmitEventPageProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "",
    category: "",
    image: null as File | null,
    ticketType: "free" as "free" | "paid",
    ticketPrice: "",
    totalTickets: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEvent, setSubmittedEvent] = useState<Event | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const getDefaultImageForCategory = (category: string): string => {
    const imageMap: Record<string, string> = {
      Music:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=400&fit=crop",
      Arts: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=400&fit=crop",
      Sports:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop",
      "Food & Drink":
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=400&fit=crop",
      Social:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=400&fit=crop",
      Photography:
        "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=400&fit=crop",
      Entertainment:
        "https://images.unsplash.com/photo-1585699225809-c6bc4d3226b9?w=500&h=400&fit=crop",
      Wellness:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=400&fit=crop",
    };

    return (
      imageMap[category] ||
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=400&fit=crop"
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.title ||
      !formData.description ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.location ||
      !formData.category
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Validate ticket information
    if (
      formData.ticketType === "paid" &&
      (!formData.ticketPrice || parseFloat(formData.ticketPrice) <= 0)
    ) {
      alert("Please enter a valid ticket price for paid events.");
      return;
    }

    // Validate date logic
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      alert("End date cannot be before start date.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create new event object
    const newEvent: Omit<Event, "id"> = {
      title: formData.title,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      location: formData.location,
      category: formData.category,
      organizer: user?.name || "Anonymous User", // Use authenticated user's name
      image: formData.image
        ? URL.createObjectURL(formData.image)
        : getDefaultImageForCategory(formData.category),
      ticketInfo: {
        isFree: formData.ticketType === "free",
        price:
          formData.ticketType === "paid"
            ? parseFloat(formData.ticketPrice) || 0
            : undefined,
        currency: "$",
        availableTickets: formData.totalTickets
          ? parseInt(formData.totalTickets)
          : undefined,
        totalTickets: formData.totalTickets
          ? parseInt(formData.totalTickets)
          : undefined,
      },
    };

    // Add event to the list
    const eventWithId = onEventSubmit?.(newEvent);
    setSubmittedEvent(eventWithId || null);

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <Card>
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Sparkles size={32} className="text-green-600" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Event Published!</h1>
                <p className="text-muted-foreground">
                  Your event "{formData.title}" has been successfully published
                  and is now visible to the community!
                </p>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={() => onNavigate?.("events")}
                  className="w-full"
                >
                  View All Events
                </Button>
                {submittedEvent && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      onNavigate?.("event-detail", submittedEvent.id)
                    }
                    className="w-full"
                  >
                    View Your Event
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => onNavigate?.("home")}
                  className="w-full"
                >
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Submit Your Event</h1>
          <p className="text-xl text-primary-foreground/90">
            Share your event with the community and reach more people
          </p>
        </div>
      </div>

      {/* Got an Event CTA */}
      <section className="py-12 bg-gradient-to-r from-accent to-accent/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Got an Event?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether it's a workshop, concert, meetup, or celebration - share
              it with our community! It's free, easy, and helps you connect with
              people who share your interests.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold">Reach Your Audience</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with people interested in your event
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="font-semibold">Easy Management</h3>
                <p className="text-sm text-muted-foreground">
                  Simple form, instant publishing
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="font-semibold">Build Community</h3>
                <p className="text-sm text-muted-foreground">
                  Foster connections in your area
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* User Info Display */}
              {user && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle size={20} className="text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">
                          Signed in as {user.name}
                        </p>
                        <p className="text-sm text-green-600">{user.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar size={20} className="mr-2" />
                    Event Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter your event title"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Event Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your event in detail..."
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      rows={6}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                          handleInputChange("startDate", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date *</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) =>
                          handleInputChange("endDate", e.target.value)
                        }
                        min={formData.startDate}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time *</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={(e) =>
                          handleInputChange("startTime", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time *</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) =>
                          handleInputChange("endTime", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="Enter event location or address"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleInputChange("category", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select event category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Ticket Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Ticket size={20} className="mr-2" />
                    Ticket Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Event Type *</Label>
                    <Select
                      value={formData.ticketType}
                      onValueChange={(value) =>
                        handleInputChange("ticketType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select ticket type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free Event</SelectItem>
                        <SelectItem value="paid">Paid Event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.ticketType === "paid" && (
                    <div className="space-y-2">
                      <Label htmlFor="ticketPrice">Ticket Price (USD) *</Label>
                      <div className="relative">
                        <DollarSign
                          size={16}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                          id="ticketPrice"
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          value={formData.ticketPrice}
                          onChange={(e) =>
                            handleInputChange("ticketPrice", e.target.value)
                          }
                          className="pl-8"
                          required={formData.ticketType === "paid"}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="totalTickets">
                      Total Tickets Available
                    </Label>
                    <Input
                      id="totalTickets"
                      type="number"
                      min="1"
                      placeholder="Leave blank for unlimited"
                      value={formData.totalTickets}
                      onChange={(e) =>
                        handleInputChange("totalTickets", e.target.value)
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave this field blank if you don't want to limit ticket
                      sales
                    </p>
                  </div>

                  {/* Ticket Preview */}
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Ticket Preview:</h4>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {formData.ticketType === "free"
                          ? "Free Ticket"
                          : formData.ticketPrice
                          ? `${formData.ticketPrice} Ticket`
                          : "Paid Ticket"}
                      </span>
                      {formData.totalTickets && (
                        <span className="text-sm text-muted-foreground">
                          {formData.totalTickets} available
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Image Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload size={20} className="mr-2" />
                    Event Image
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="image"
                      className="cursor-pointer space-y-2 inline-block"
                    >
                      <Upload
                        size={32}
                        className="mx-auto text-muted-foreground"
                      />
                      <p className="text-muted-foreground">
                        {formData.image
                          ? formData.image.name
                          : "Click to upload an image"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG up to 10MB (Optional - we'll use a default
                        image if none provided)
                      </p>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Organizer Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserIcon size={20} className="mr-2" />
                    Organizer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user ? (
                    <div className="space-y-2">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        This information will be displayed as the event
                        organizer.
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Please sign in to create an event.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle>Submission Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium">Event Requirements:</h4>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Must be a public event</li>
                      <li>Provide accurate information</li>
                      <li>Include clear event description</li>
                      <li>Use appropriate category</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium">Image Guidelines:</h4>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>High-quality images preferred</li>
                      <li>Minimum 800x600 pixels</li>
                      <li>No watermarks or logos</li>
                      <li>Relevant to your event</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? "Publishing Event..." : "Publish Event"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By submitting, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
