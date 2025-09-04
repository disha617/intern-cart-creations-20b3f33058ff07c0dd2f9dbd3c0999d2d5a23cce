import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ShoppingCart, Store, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  const { openCart, getTotalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Store className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">ModernStore</h1>
              <p className="text-xs text-muted-foreground">Premium Electronics</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Login Button */}
            <Button
              variant="ghost"
              className="flex items-center space-x-2 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Button>

            {/* Cart Button */}
            <Button
              variant="outline"
              onClick={openCart}
              className="relative flex items-center space-x-2 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              {getTotalItems() > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};