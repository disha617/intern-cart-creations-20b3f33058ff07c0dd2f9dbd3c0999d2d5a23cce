import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Star, Plus, Minus } from 'lucide-react';
import { Product, useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { addItem, state, updateQuantity } = useCart();
  const { toast } = useToast();
  const [localQuantity, setLocalQuantity] = React.useState(1);

  const cartItem = product ? state.items.find(item => item.id === product.id) : null;
  const currentQuantity = cartItem?.quantity || 0;

  React.useEffect(() => {
    if (isOpen) {
      setLocalQuantity(1);
    }
  }, [isOpen]);

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < localQuantity; i++) {
      addItem(product);
    }
    toast({
      title: "Added to cart",
      description: `${localQuantity}x ${product.name} added to your cart.`,
    });
    onClose();
  };

  const handleUpdateCartQuantity = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity);
    if (newQuantity === 0) {
      toast({
        title: "Removed from cart",
        description: `${product.name} has been removed from your cart.`,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>Product details and quick add to cart</DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-2">
                ({product.rating})
              </span>
            </div>
            
            <div className="price-display text-3xl font-bold">
              ${product.price.toFixed(2)}
            </div>
            
            <Badge variant={product.inStock ? "default" : "secondary"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
            
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
            
            <div className="space-y-4">
              {currentQuantity > 0 && (
                <div className="flex items-center justify-between p-3 bg-gradient-card rounded-lg border">
                  <span className="font-medium">Currently in cart:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleUpdateCartQuantity(currentQuantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="font-semibold w-8 text-center">
                      {currentQuantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleUpdateCartQuantity(currentQuantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setLocalQuantity(Math.max(1, localQuantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-semibold px-4 py-2 border rounded">
                    {localQuantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setLocalQuantity(localQuantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="cart-button flex-1"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add {localQuantity} to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};