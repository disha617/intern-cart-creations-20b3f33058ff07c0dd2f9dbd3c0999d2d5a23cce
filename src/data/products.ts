import { Product } from '@/contexts/CartContext';
import headphonesImg from '@/assets/headphones.jpg';
import smartwatchImg from '@/assets/smartwatch.jpg';
import laptopImg from '@/assets/laptop.jpg';
import smartphoneImg from '@/assets/smartphone.jpg';

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: headphonesImg,
    description: "High-quality wireless headphones with active noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
    category: "Audio",
    rating: 4.8,
    inStock: true,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 399.99,
    image: smartwatchImg,
    description: "Advanced fitness tracking watch with heart rate monitoring, GPS, and smartphone integration. Track your health and stay connected.",
    category: "Wearables",
    rating: 4.6,
    inStock: true,
  },
  {
    id: 3,
    name: "Ultra-Thin Laptop",
    price: 1299.99,
    image: laptopImg,
    description: "Powerful ultrabook with the latest processor, stunning display, and all-day battery life. Perfect for work and creativity.",
    category: "Computers",
    rating: 4.9,
    inStock: true,
  },
  {
    id: 4,
    name: "5G Smartphone",
    price: 899.99,
    image: smartphoneImg,
    description: "Latest flagship smartphone with advanced camera system, lightning-fast 5G connectivity, and premium design.",
    category: "Mobile",
    rating: 4.7,
    inStock: false,
  },
  {
    id: 5,
    name: "Wireless Gaming Mouse",
    price: 79.99,
    image: headphonesImg, // Reusing image for demo
    description: "High-precision wireless gaming mouse with customizable buttons and RGB lighting. Perfect for competitive gaming.",
    category: "Gaming",
    rating: 4.5,
    inStock: true,
  },
  {
    id: 6,
    name: "4K Webcam",
    price: 149.99,
    image: smartwatchImg, // Reusing image for demo
    description: "Professional 4K webcam with auto-focus and noise reduction. Ideal for streaming and video conferencing.",
    category: "Accessories",
    rating: 4.4,
    inStock: true,
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    price: 199.99,
    image: laptopImg, // Reusing image for demo
    description: "Portable Bluetooth speaker with 360-degree sound and waterproof design. Perfect for outdoor adventures.",
    category: "Audio",
    rating: 4.6,
    inStock: true,
  },
  {
    id: 8,
    name: "Wireless Charger",
    price: 49.99,
    image: smartphoneImg, // Reusing image for demo
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicators.",
    category: "Accessories",
    rating: 4.3,
    inStock: true,
  },
];

export const categories = [
  "All",
  "Audio",
  "Wearables", 
  "Computers",
  "Mobile",
  "Gaming",
  "Accessories"
];