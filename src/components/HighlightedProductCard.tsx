import { Button } from "@/components/ui/button";

interface HighlightedProductCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  itemCount: number;
}

export const HighlightedProductCard = ({ id, title, description, price, imageUrl, itemCount }: HighlightedProductCardProps) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden flex flex-col md:flex-row shadow-sm">
      <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-muted-foreground/20 flex items-center justify-center">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">Highlighted</span>
        <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded-md text-xs flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image mr-1"><path d="M5 12V3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9"/><path d="M22 8.5 16 2l-6 6"/><path d="M2 7h2"/><path d="M2 12h2"/><path d="M2 17h2"/></svg>
          {itemCount}
        </div>
      </div>
      <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{description}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-2xl font-bold">{price}</p>
          <Button>Buy now</Button>
        </div>
      </div>
    </div>
  );
};
