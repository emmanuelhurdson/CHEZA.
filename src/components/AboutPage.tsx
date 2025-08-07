import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Heart, Users, Sparkles, Mail, Phone, MapPin, Send } from "lucide-react";

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    alert("Thank you for your message! We'll get back to you soon.");
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">About CHEZA</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            We're passionate about connecting communities through amazing events and experiences
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* About Content */}
          <div className="space-y-12">
            {/* Mission */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Heart size={24} className="text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                CHEZA exists to strengthen communities by making it easier for people to discover, 
                attend, and organize local events. We believe that great experiences bring people together 
                and create lasting memories.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether it's a neighborhood art show, a music festival, a sports tournament, or a community 
                gathering, we're here to help you find your next amazing experience and connect with 
                like-minded people in your area.
              </p>
            </div>

            {/* Why Events Matter */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users size={24} className="text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Why Events Matter</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Sparkles size={20} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Build Connections</h3>
                    <p className="text-muted-foreground">
                      Events create opportunities for people to meet, share experiences, and form meaningful relationships.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Sparkles size={20} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Strengthen Communities</h3>
                    <p className="text-muted-foreground">
                      Local events bring neighborhoods together and foster a sense of belonging and community pride.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Sparkles size={20} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Support Local Culture</h3>
                    <p className="text-muted-foreground">
                      Events showcase local talent, businesses, and culture, contributing to vibrant communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Card className="bg-gradient-to-r from-accent to-accent/80">
              <CardContent className="p-6 text-center space-y-4">
                <h3 className="text-xl font-semibold">Ready to Share Your Event?</h3>
                <p className="text-muted-foreground">
                  Join thousands of event organizers who trust CHEZA to promote their events.
                </p>
                <Button onClick={() => onNavigate?.("submit")}>
                  Submit Your Event
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send size={20} className="mr-2" />
                  Get In Touch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={contactForm.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={contactForm.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      value={contactForm.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail size={18} className="text-primary" />
                  <span className="text-sm">hello@cheza.app</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={18} className="text-primary" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin size={18} className="text-primary" />
                  <span className="text-sm">New York, NY</span>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Stay updated with the latest events and community news
                </p>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm">Instagram</Button>
                  <Button variant="outline" size="sm">Twitter</Button>
                  <Button variant="outline" size="sm">Facebook</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}