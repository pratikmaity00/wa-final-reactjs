import type { Product, DiscountRule, Coupon } from '../utils/interfaces';

export const products: Product[] = [
  {
    id: 1,
    name: 'Basmati Rice',
    price: 85,
    category: 'Grains',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'Fresh Whole Milk',
    price: 32,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'Farm Fresh Potatoes',
    price: 30,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    name: 'Royal Gala Apples',
    price: 140,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    name: 'Whole Wheat Bread',
    price: 45,
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    name: 'Natural Orange Juice',
    price: 95,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 7,
    name: 'Ripe Yellow Bananas',
    price: 50,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 8,
    name: 'Organic Red Tomatoes',
    price: 40,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 9,
    name: 'Greek Plain Yogurt',
    price: 65,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 10,
    name: 'Organic Rolled Oats',
    price: 110,
    category: 'Grains',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 11,
    name: 'Butter Croissants',
    price: 75,
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 12,
    name: 'Premium Green Tea',
    price: 160,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 13,
    name: 'Fresh Spinach Bunch',
    price: 25,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 14,
    name: 'Sweet Alphonso Mangoes',
    price: 220,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 15,
    name: 'Artisan Cheddar Cheese',
    price: 180,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 16,
    name: 'Cold Brew Roasted Coffee',
    price: 190,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
  },
];

export const discountRules: DiscountRule[] = [
  { minimumAmount: 500, percentage: 5 },
  { minimumAmount: 1000, percentage: 10 },
];

export const coupons: Coupon[] = [
  {
    code: 'SAVE10',
    percentage: 10,
  },
  {
    code: 'SAVE20',
    percentage: 20,
  },
];

export const categories: string[] = [
  'All Categories',
  'Fruits',
  'Vegetables',
  'Dairy',
  'Grains',
  'Bakery',
  'Beverages',
];
