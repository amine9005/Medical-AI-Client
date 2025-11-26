import {
  ClipboardClockIcon,
  HatGlassesIcon,
  HeartPlusIcon,
} from "lucide-react";

export const APP_FEATURES = [
  {
    id: 1,
    icon: HeartPlusIcon,
    title: "AI Doctor",
    description:
      "Have a conversation with your AI doctor. It can answer any question you have.",
    border_color: "border-red-500",
    icon_color: "bg-red-500",
    bg_from: "from-red-300",
    bg_via: "via-red-200",
    bg_to: "to-red-50",
  },
  {
    id: 2,
    icon: HatGlassesIcon,
    title: "Private Consolation",
    description: "Privately and securely connect with your AI doctor.",
    border_color: "border-green-500",
    icon_color: "bg-green-500",
    bg_from: "from-green-300",
    bg_via: "via-green-200",
    bg_to: "to-green-50",
  },
  {
    id: 3,
    icon: ClipboardClockIcon,
    title: "Consolation History ",
    description:
      "View your previous conversations with your AI doctor's and it's recommendations. ",
    border_color: "border-black",
    icon_color: "bg-black",
    bg_from: "from-gray-900",
    bg_via: "via-gary-800",
    bg_to: "to-gary-700",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&auto=format&fit=crop",
    review:
      "I was skeptical about the AI-powered medical consolation but after using it, I was completely blown away. It's a game-changer!",
  },
  {
    id: 2,
    name: "Mark Smith",
    rating: 5,
    img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&h=200&auto=format&fit=crop",
    review:
      "I love how easy it is to get medical advice from AI. It's like having a doctor at your fingertips!",
  },
  {
    id: 3,
    name: "Alice Johnson",
    rating: 5,
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    review:
      "I was amazed by how accurate and helpful the AI-powered medical consultation platform was. It's a game-changer for people who want quick and reliable medical advice!",
  },
];
