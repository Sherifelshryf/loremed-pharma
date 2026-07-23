import { Wind, Zap, Baby, Brain, Droplets, ShieldPlus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ProductCategory } from '@/content/products';

/**
 * Kept in a plain (non-client) module so Server Components can index into
 * it directly — bundling it inside a 'use client' file breaks RSC static
 * export when server pages pull a component reference out of the map.
 */
export const categoryIcons: Record<ProductCategory, LucideIcon> = {
  'immune-support': ShieldPlus,
  'respiratory-care': Wind,
  'vitamins-minerals': Zap,
  'kids-health': Baby,
  'omega-brain': Brain,
  dermatology: Droplets,
};
