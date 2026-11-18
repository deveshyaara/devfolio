'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MessageSquare } from 'lucide-react';
import { Button } from './ui/button';

const ChatbotCard = dynamic(() => import('./chatbot-card'), { ssr: false });

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  /*
   * hasOpened tracks whether the chatbot has been opened at least once.
   * Once true, ChatbotCard stays mounted in the DOM (hidden when !isOpen)
   * so the Streamlit iframe and its conversation state are preserved across
   * open/close cycles. The iframe is only ever created on first user click.
   */
  const [hasOpened, setHasOpened] = useState(false);

  const openChatbot = useCallback(() => {
    setHasOpened(true);
    setIsOpen(true);
  }, []);

  const closeChatbot = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeChatbot();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeChatbot]);

  return (
    <>
      {/* Floating action button — positioned above mobile hero card so it is never obscured */}
      <div className="fixed bottom-[116px] md:bottom-5 right-4 sm:right-7 z-[92] group">
        <Button
          size="icon"
          className="rounded-full w-14 h-14 shadow-[0_0_15px_rgba(0,243,255,0.4)] bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
          onClick={isOpen ? closeChatbot : openChatbot}
          aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
          aria-expanded={isOpen}
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
        {/* Tooltip — hidden when panel is open to avoid clutter */}
        {!isOpen && (
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 w-max px-3 py-1.5 bg-background border border-primary/20 text-foreground text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg backdrop-blur-md">
            Ask my AI assistant
          </span>
        )}
      </div>

      {/*
       * ChatbotCard is rendered once hasOpened is true, then visibility is
       * controlled by CSS (display/visibility trick via conditional class)
       * rather than conditional mounting — preserving the iframe session.
       */}
      {hasOpened && (
        <div className={isOpen ? 'block' : 'hidden'} aria-hidden={!isOpen}>
          <ChatbotCard onClose={closeChatbot} />
        </div>
      )}
    </>
  );
}
