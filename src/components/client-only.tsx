'use client';

import dynamic from 'next/dynamic';

const Chatbot    = dynamic(() => import('@/components/chatbot'),     { ssr: false });
const CursorGlow = dynamic(() => import('@/components/cursor-glow'), { ssr: false });

export default function ClientOnlyComponents() {
  return (
    <>
      <CursorGlow />
      <Chatbot />
    </>
  );
}
