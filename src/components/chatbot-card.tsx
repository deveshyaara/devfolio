'use client';

import { X, MessageSquare, Loader2, ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';

const AGENT_EMBED_URL = 'https://devfolio-agent.streamlit.app/?embed=true';
const AGENT_DIRECT_URL = 'https://devfolio-agent.streamlit.app/';
const LOAD_TIMEOUT_MS = 12000;

interface ChatbotCardProps {
  onClose: () => void;
}

export default function ChatbotCard({ onClose }: ChatbotCardProps) {
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'timed-out' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (loadState !== 'loading') return;
    const timer = window.setTimeout(() => {
      setLoadState((prev) => (prev === 'loading' ? 'timed-out' : prev));
    }, LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [loadState, attempt]);

  const handleRetry = () => {
    setLoadState('loading');
    setAttempt((n) => n + 1);
  };

  return (
    <div
      role="dialog"
      aria-label="Chat with my AI Agent"
      className="fixed bottom-[176px] md:bottom-[5.25rem] right-4 sm:right-7 z-[95] flex flex-col
                 w-[calc(100vw-2rem)] sm:w-96
                 h-[62vh] md:h-[70vh] max-h-[600px]
                 rounded-xl overflow-hidden
                 border border-black/15
                 bg-white/95 backdrop-blur-xl
                 shadow-[0_12px_36px_rgba(0,0,0,0.2)]"
    >
      {/* Header — one clean bar, no nested card */}
      <div className="flex-none flex items-center justify-between px-4 py-3 border-b border-black/10">
        <h3 className="font-semibold text-sm flex items-center gap-2 text-[#0A0A0A]">
          <MessageSquare className="w-4 h-4 text-[#0052FF]" />
          Chat with my AI Agent
        </h3>
        <div className="flex items-center gap-1">
          <a
            href={AGENT_DIRECT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-7 w-7 rounded-full text-black/60 hover:bg-black/5 hover:text-[#0052FF] transition-colors"
            aria-label="Open AI agent in a new tab"
            title="Open in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-7 w-7 rounded-full hover:bg-black/5 hover:text-[#0052FF]"
            aria-label="Close chatbot"
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Iframe area — fills remaining height, with graceful timeout/error degradation */}
      <div className="relative flex-1 min-h-0">
        {loadState === 'loading' && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/90 px-6 text-center">
            <Loader2 className="w-6 h-6 text-[#0052FF] animate-spin" />
            <span className="text-xs text-black/65">Loading AI agent…</span>
          </div>
        )}
        {(loadState === 'timed-out' || loadState === 'error') && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/95 px-6 text-center">
            <p className="text-sm font-medium text-[#0A0A0A] m-0">
              {loadState === 'error'
                ? 'Unable to load the embedded AI agent.'
                : 'The AI agent is taking longer than expected to wake up.'}
            </p>
            <p className="text-xs text-black/60 m-0">
              Streamlit Cloud apps can take a few seconds to cold-start or may be temporarily unavailable.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#0A0A0A] text-white hover:bg-[#0052FF] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry
              </button>
              <a
                href={AGENT_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-black/15 text-[#0A0A0A] hover:border-[#0052FF] hover:text-[#0052FF] transition-colors"
              >
                Open directly
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
        <iframe
          key={attempt}
          src={AGENT_EMBED_URL}
          className="w-full h-full border-0"
          title="DevFolio AI Agent"
          loading="lazy"
          allow="camera; microphone; autoplay; encrypted-media; display-capture"
          onLoad={() => setLoadState('loaded')}
          onError={() => setLoadState('error')}
        />
      </div>
    </div>
  );
}
