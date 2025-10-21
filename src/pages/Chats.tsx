import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatCard } from "@/components/ChatCard";

interface Chat {
  id: string;
  name: string;
  avatarUrl: string;
  isLocked: boolean;
  emoji?: string;
}

const DUMMY_CHATS: Chat[] = [
  { id: 'c1', name: 'General Chat', avatarUrl: '/src/assets/creator-avatar.jpg', isLocked: true, emoji: '😍' },
];

export const Chats = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h2 className="text-3xl font-bold mb-8">Chats</h2>
        <div className="max-w-xl mx-auto space-y-4">
          {DUMMY_CHATS.map((chat) => (
            <ChatCard key={chat.id} {...chat} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};
