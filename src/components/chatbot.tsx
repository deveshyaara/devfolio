'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import ChatbotCard from './chatbot-card';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 sm:right-8 z-40 group">
        <Button
          size="icon"
          className="rounded-full w-14 h-14 shadow-[0_0_15px_rgba(0,243,255,0.4)] bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
          onClick={toggleChatbot}
          aria-label="Toggle Chatbot"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 w-max px-3 py-1.5 bg-background border border-primary/20 text-foreground text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg backdrop-blur-md">
          Ask my AI assistant
        </span>
      </div>
      {isOpen && <ChatbotCard onClose={toggleChatbot} />}
    </>
  );
}
