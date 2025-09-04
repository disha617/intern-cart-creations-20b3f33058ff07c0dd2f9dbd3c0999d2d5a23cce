import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Truck, Shield } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';

interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

interface CheckoutFormProps {
  onClose: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onClose }) => {
  const { state, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutFormData>();

  const shippingCost = 9.99;
  const taxRate = 0.08;
  const subtotal = getTotalPrice();
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingCost;

  const onSubmit = async (data: CheckoutFormData) => {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Order placed successfully!",
      description: `Your order for $${total.toFixed(2)} has been confirmed.`,
    });
    
    clearCart();
    onClose();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Checkout Form */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Checkout</h2>
          <p className="text-muted-foreground">Complete your purchase below</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    {...register('firstName', { required: 'First name is required' })}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    {...register('lastName', { required: 'Last name is required' })}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Street Address</Label>
                <Textarea
                  id="address"
                  placeholder="123 Main Street, Apt 4B"
                  rows={2}
                  {...register('address', { required: 'Address is required' })}
                />
                {errors.address && (
                  <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    {...register('city', { required: 'City is required' })}
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    placeholder="10001"
                    {...register('postalCode', { required: 'Postal code is required' })}
                  />
                  {errors.postalCode && (
                    <p className="text-sm text-destructive mt-1">{errors.postalCode.message}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="United States"
                  {...register('country', { required: 'Country is required' })}
                />
                {errors.country && (
                  <p className="text-sm text-destructive mt-1">{errors.country.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Payment Information
              </CardTitle>
              <CardDescription>
                Your payment information is secure and encrypted
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  {...register('cardName', { required: 'Cardholder name is required' })}
                />
                {errors.cardName && (
                  <p className="text-sm text-destructive mt-1">{errors.cardName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  {...register('cardNumber', { required: 'Card number is required' })}
                />
                {errors.cardNumber && (
                  <p className="text-sm text-destructive mt-1">{errors.cardNumber.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    {...register('expiryDate', { required: 'Expiry date is required' })}
                  />
                  {errors.expiryDate && (
                    <p className="text-sm text-destructive mt-1">{errors.expiryDate.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    {...register('cvv', { required: 'CVV is required' })}
                  />
                  {errors.cvv && (
                    <p className="text-sm text-destructive mt-1">{errors.cvv.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full cart-button h-12 text-lg"
          >
            {isSubmitting ? 'Processing...' : `Complete Order - $${total.toFixed(2)}`}
          </Button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>
              {state.items.length} item{state.items.length !== 1 ? 's' : ''} in your order
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {state.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium line-clamp-1">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <div className="price-display font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="price-display">${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Secure checkout powered by industry-standard encryption</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};