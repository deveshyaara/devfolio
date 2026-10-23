'use client';

import { X, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface ChatbotCardProps {
  onClose: () => void;
}

export default function ChatbotCard({ onClose }: ChatbotCardProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    /*
     * Single-layer chatbot panel.
     *
     * Previously: outer positioning div → glassmorphism card div → p-2 content div → iframe.
     * That added 8 px of padding around the iframe (wasting visible area) plus two separate
     * border / background / shadow layers stacking on top of each other visually.
     *
     * Now: one fixed panel with the header and iframe sharing a single container.
     * The rounded-b-xl on the iframe aligns with the panel's own rounded-xl corners.
     * No extra wrappers, no nested glassmorphism.
     */
    <div
      className="fixed bottom-[4.5rem] right-4 sm:right-8 z-50 flex flex-col
                 w-[calc(100vw-2rem)] sm:w-96
                 h-[70vh] max-h-[600px]
                 rounded-xl overflow-hidden
                 border border-primary/20
                 bg-background/95 backdrop-blur-xl
                 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,243,255,0.06)]"
    >
      {/* Header — one clean bar, no nested card */}
      <div className="flex-none flex items-center justify-between px-4 py-3 border-b border-primary/10">
        <h3 className="font-semibold text-sm flex items-center gap-2 text-foreground">
          <MessageSquare className="w-4 h-4 text-primary" />
          Chat with my AI Agent
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-7 w-7 rounded-full hover:bg-primary/10 hover:text-primary"
          aria-label="Close chatbot"
        >
          <X className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Iframe area — fills remaining height, no extra padding */}
      <div className="relative flex-1 min-h-0">
        {/* Loading state shown while Streamlit boots */}
        {!iframeLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/80">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
            <span className="text-xs text-muted-foreground">Loading AI agent…</span>
          </div>
        )}
        <iframe
          src="https://devfolio-agent.streamlit.app/?embed=true"
          className="w-full h-full border-0"
          title="DevFolio AI Agent"
          loading="lazy"
          allow="camera; microphone; autoplay; encrypted-media; display-capture"
          onLoad={() => setIframeLoaded(true)}
        />
      </div>
    </div>
  );
}
