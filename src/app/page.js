import HeroBanner from "@/components/HeroBanner";
import LatestProducts from "@/components/LatestProducts";
import MarketplaceStats from "@/components/MarketplaceStats";
import SuccessStories from "@/components/SuccessStories";

export default function Home() {
  return (
    <div className="py-10 px-6">
      <HeroBanner/>
      <LatestProducts />
      <MarketplaceStats />
      <SuccessStories />
    </div>
  );
}
