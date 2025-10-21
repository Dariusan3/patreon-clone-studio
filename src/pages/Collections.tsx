import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CollectionCard } from "@/components/CollectionCard";

interface Collection {
  id: string;
  title: string;
  description: string;
  postCount: number;
  imageUrl?: string;
}

const DUMMY_COLLECTIONS: Collection[] = [
  { id: 'col1', title: '"Webtoon Adventures" ', description: 'Doujins featuring Webtoon Characters!', postCount: 4, imageUrl: '/src/assets/hero-bg.jpg' },
  { id: 'col2', title: 'Doujins', description: 'You can find all my doujins here', postCount: 20, imageUrl: '/src/assets/creator-avatar.jpg' },
  { id: 'col3', title: 'Albums', description: 'All my albums in one place.', postCount: 135, imageUrl: '/src/assets/hero-bg.jpg' },
  { id: 'col4', title: 'JOIS', description: 'All my JOIS in one place.', postCount: 1, imageUrl: '/src/assets/creator-avatar.jpg' },
  { id: 'col5', title: 'Sketches', description: 'My raw sketches and concepts.', postCount: 50, imageUrl: '/src/assets/hero-bg.jpg' },
];

export const Collections = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {DUMMY_COLLECTIONS.map((collection) => (
            <CollectionCard key={collection.id} {...collection} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};
