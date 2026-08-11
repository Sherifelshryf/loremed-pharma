import { ShopHero } from '@/components/sections/ShopHero';
import { CategoryTiles } from '@/components/sections/CategoryTiles';
import { ShopProducts } from '@/components/sections/ShopProducts';
import { HowToOrder } from '@/components/sections/HowToOrder';
import { StatsBand } from '@/components/sections/StatsBand';
import { ContactCTA } from '@/components/sections/ContactCTA';

/**
 * Shop-first homepage.
 *
 * The site sells directly, so the page follows how a shopper actually moves:
 * what we sell, which shelf, the products with their prices, then how to order.
 * One compact trust band carries the credibility a buyer needs before ordering
 * medicine; the fuller company story lives on /about, /quality and /research
 * rather than sitting between the shopper and the products.
 */
export default function HomePage() {
  return (
    <>
      <ShopHero />
      <ShopProducts />
      <HowToOrder />
      <StatsBand />
      <CategoryTiles />
      <ContactCTA />
    </>
  );
}
