import { Badge } from "./ui/badge";
import {
  Music,
  Palette,
  Dumbbell,
  Users,
  Coffee,
  Camera,
  Mic,
  Heart,
} from "lucide-react";

export interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryChipProps {
  category: Category;
  isActive?: boolean;
  onClick?: (category: Category) => void;
  variant?: "default" | "filter";
}

const categoryIcons = {
  music: Music,
  arts: Palette,
  sports: Dumbbell,
  social: Users,
  food: Coffee,
  photography: Camera,
  entertainment: Mic,
  wellness: Heart,
};

export function CategoryChip({
  category,
  isActive = false,
  onClick,
  variant = "default",
}: CategoryChipProps) {
  const IconComponent =
    categoryIcons[category.icon as keyof typeof categoryIcons] || Users;

  if (variant === "filter") {
    return (
      <button
        onClick={() => onClick?.(category)}
        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground hover:bg-accent"
        }`}
      >
        <IconComponent size={16} className="mr-2" />
        {category.name}
      </button>
    );
  }

  return (
    <Badge
      variant={isActive ? "default" : "secondary"}
      className={`cursor-pointer transition-colors ${
        onClick ? "hover:bg-primary hover:text-primary-foreground" : ""
      }`}
      onClick={() => onClick?.(category)}
    >
      <IconComponent size={14} className="mr-1" />
      {category.name}
    </Badge>
  );
}

export const categories: Category[] = [
  { id: "music", name: "Music", icon: "music" },
  { id: "arts", name: "Arts", icon: "arts" },
  { id: "sports", name: "Sports", icon: "sports" },
  { id: "social", name: "Social", icon: "social" },
  { id: "food", name: "Food & Drink", icon: "food" },
  { id: "photography", name: "Photography", icon: "photography" },
  { id: "entertainment", name: "Entertainment", icon: "entertainment" },
  { id: "wellness", name: "Wellness", icon: "wellness" },
];
