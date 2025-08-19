import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  img: string;
  href: string; // Optional href for linking to product details
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, img, onAddToCart, href }) => {
  return (
    <Card className="rounded-2xl overflow-hidden py-0 pb-6 shadow-md">
      <div className="relative w-full h-56">
        <Image
          src={img}
          alt={name}
          width={100}
          height={100}
          className="object-cover object-center size-full"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Rs. {price.toLocaleString()}</p>
        <Link href={href}>
          <Button className="w-full bg-[var(--color-logo)]" onClick={onAddToCart}>
            Add to Cart
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
