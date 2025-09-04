import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Plus, Eye } from 'lucide-react';
import { Product, useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView(product);
  };

  return (
    <Card className="product-card group cursor-pointer overflow-hidden h-full">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!product.inStock && (
          <Badge variant="secondary" className="absolute top-3 left-3">
            Out of Stock
          </Badge>
        )}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 bg-white/90 hover:bg-white"
            onClick={handleQuickView}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < Math.floor(product.rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">
            ({product.rating})
          </span>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2 flex-1">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="price-display text-xl font-bold">
            ${product.price.toFixed(2)}
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="cart-button h-9 px-4"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};