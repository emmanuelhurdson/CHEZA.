import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Ticket,
  CreditCard,
  User,
  Mail,
  Phone,
  MapPin,
  Minus,
  Plus,
  Shield,
  CheckCircle,
  X,
} from "lucide-react";
import { Event } from "./EventCard";

interface TicketPurchaseModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

interface PurchaseForm {
  quantity: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  billingInfo: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
    billingAddress: string;
    city: string;
    zipCode: string;
  };
}

export function TicketPurchaseModal({
  event,
  isOpen,
  onClose,
}: TicketPurchaseModalProps) {
  const [step, setStep] = useState<
    "quantity" | "details" | "payment" | "confirmation"
  >("quantity");
  const [formData, setFormData] = useState<PurchaseForm>({
    quantity: 1,
    customerInfo: {
      name: "",
      email: "",
      phone: "",
    },
    billingInfo: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
      billingAddress: "",
      city: "",
      zipCode: "",
    },
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string>("");

  const ticketPrice = event.ticketInfo?.price || 0;
  const total = ticketPrice * formData.quantity;
  const maxQuantity = Math.min(event.ticketInfo?.availableTickets || 10, 10);

  const updateQuantity = (change: number) => {
    const newQuantity = Math.max(
      1,
      Math.min(maxQuantity, formData.quantity + change)
    );
    setFormData((prev) => ({ ...prev, quantity: newQuantity }));
  };

  const updateCustomerInfo = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      customerInfo: { ...prev.customerInfo, [field]: value },
    }));
  };

  const updateBillingInfo = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      billingInfo: { ...prev.billingInfo, [field]: value },
    }));
  };

  const handleNextStep = () => {
    if (step === "quantity") {
      setStep("details");
    } else if (step === "details") {
      if (event.ticketInfo?.isFree) {
        handleFreeTicket();
      } else {
        setStep("payment");
      }
    }
  };

  const handleFreeTicket = async () => {
    setIsProcessing(true);
    // Simulate API call for free ticket
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newOrderId = `FREE-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    setOrderId(newOrderId);
    setStep("confirmation");
    setIsProcessing(false);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const newOrderId = `TKT-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    setOrderId(newOrderId);
    setStep("confirmation");
    setIsProcessing(false);
  };

  const resetModal = () => {
    setStep("quantity");
    setFormData({
      quantity: 1,
      customerInfo: { name: "", email: "", phone: "" },
      billingInfo: {
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardholderName: "",
        billingAddress: "",
        city: "",
        zipCode: "",
      },
    });
    setOrderId("");
    setIsProcessing(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetModal, 300); // Reset after modal closes
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const renderQuantityStep = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Ticket size={32} className="text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{event.title}</h3>
          <p className="text-muted-foreground">
            {new Date(event.startDate).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Ticket Price:</span>
            <span className="text-lg font-semibold">
              {event.ticketInfo?.isFree ? "Free" : `$${ticketPrice}`}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateQuantity(-1)}
                disabled={formData.quantity <= 1}
              >
                <Minus size={16} />
              </Button>
              <span className="w-12 text-center font-semibold">
                {formData.quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateQuantity(1)}
                disabled={formData.quantity >= maxQuantity}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          {!event.ticketInfo?.isFree && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${total}</span>
              </div>
            </div>
          )}

          {event.ticketInfo?.availableTickets !== undefined && (
            <p className="text-sm text-muted-foreground text-center">
              {event.ticketInfo.availableTickets} tickets remaining
            </p>
          )}
        </CardContent>
      </Card>

      <Button onClick={handleNextStep} className="w-full" size="lg">
        Continue
      </Button>
    </div>
  );

  const renderDetailsStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold">Contact Information</h3>
        <p className="text-muted-foreground">
          We'll send your tickets to this email
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={formData.customerInfo.name}
            onChange={(e) => updateCustomerInfo("name", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.customerInfo.email}
            onChange={(e) => updateCustomerInfo("email", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.customerInfo.phone}
            onChange={(e) => updateCustomerInfo("phone", e.target.value)}
          />
        </div>
      </div>

      <div className="flex space-x-3">
        <Button
          variant="outline"
          onClick={() => setStep("quantity")}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          onClick={handleNextStep}
          className="flex-1"
          disabled={!formData.customerInfo.name || !formData.customerInfo.email}
        >
          {event.ticketInfo?.isFree
            ? "Get Free Tickets"
            : "Continue to Payment"}
        </Button>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Shield size={20} className="text-green-600" />
          <span className="text-sm font-medium text-green-600">
            Secure Payment
          </span>
        </div>
        <h3 className="text-xl font-semibold">Payment Information</h3>
        <p className="text-muted-foreground">
          Your payment is encrypted and secure
        </p>
      </div>

      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between">
            <span>Tickets ({formData.quantity}x)</span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between font-semibold border-t pt-2">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number *</Label>
          <div className="relative">
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.billingInfo.cardNumber}
              onChange={(e) =>
                updateBillingInfo(
                  "cardNumber",
                  formatCardNumber(e.target.value)
                )
              }
              maxLength={19}
              required
            />
            <CreditCard
              size={20}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiry Date *</Label>
            <Input
              id="expiry"
              placeholder="MM/YY"
              value={formData.billingInfo.expiryDate}
              onChange={(e) =>
                updateBillingInfo(
                  "expiryDate",
                  formatExpiryDate(e.target.value)
                )
              }
              maxLength={5}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvv">CVV *</Label>
            <Input
              id="cvv"
              placeholder="123"
              value={formData.billingInfo.cvv}
              onChange={(e) =>
                updateBillingInfo(
                  "cvv",
                  e.target.value.replace(/\D/g, "").substring(0, 4)
                )
              }
              maxLength={4}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cardholderName">Cardholder Name *</Label>
          <Input
            id="cardholderName"
            placeholder="Name on card"
            value={formData.billingInfo.cardholderName}
            onChange={(e) =>
              updateBillingInfo("cardholderName", e.target.value)
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="billingAddress">Billing Address *</Label>
          <Input
            id="billingAddress"
            placeholder="Street address"
            value={formData.billingInfo.billingAddress}
            onChange={(e) =>
              updateBillingInfo("billingAddress", e.target.value)
            }
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              placeholder="City"
              value={formData.billingInfo.city}
              onChange={(e) => updateBillingInfo("city", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP Code *</Label>
            <Input
              id="zipCode"
              placeholder="12345"
              value={formData.billingInfo.zipCode}
              onChange={(e) => updateBillingInfo("zipCode", e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button
          variant="outline"
          onClick={() => setStep("details")}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          onClick={handlePayment}
          className="flex-1"
          disabled={
            isProcessing ||
            !formData.billingInfo.cardNumber ||
            !formData.billingInfo.cardholderName
          }
        >
          {isProcessing ? "Processing..." : `Pay $${total}`}
        </Button>
      </div>
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle size={32} className="text-green-600" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">
          {event.ticketInfo?.isFree
            ? "Tickets Confirmed!"
            : "Payment Successful!"}
        </h3>
        <p className="text-muted-foreground">
          Your tickets have been sent to {formData.customerInfo.email}
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-3">
          <div className="flex justify-between">
            <span className="font-medium">Order ID:</span>
            <span className="font-mono text-sm">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Event:</span>
            <span className="text-right">{event.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Date:</span>
            <span className="text-right">
              {new Date(event.startDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Tickets:</span>
            <span className="text-right">{formData.quantity}x</span>
          </div>
          {!event.ticketInfo?.isFree && (
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total Paid:</span>
              <span>${total}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Check your email for tickets and event details. Add this event to your
          calendar!
        </p>
        <Button onClick={handleClose} className="w-full" size="lg">
          Done
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>
              {step === "quantity" && "Select Tickets"}
              {step === "details" && "Contact Information"}
              {step === "payment" && "Payment"}
              {step === "confirmation" && "Confirmation"}
            </span>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X size={16} />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {step === "quantity" && renderQuantityStep()}
          {step === "details" && renderDetailsStep()}
          {step === "payment" && renderPaymentStep()}
          {step === "confirmation" && renderConfirmationStep()}
        </div>

        {isProcessing && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
            <div className="text-center space-y-3">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="font-medium">
                {event.ticketInfo?.isFree
                  ? "Confirming your tickets..."
                  : "Processing your payment..."}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
