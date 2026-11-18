'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function CopyEmailButton({ email }: { email: string }) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (!ok) throw new Error('execCommand copy failed');
      }
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 2200);
    } catch {
      setCopyState('failed');
      window.setTimeout(() => setCopyState('idle'), 2600);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className="stoik-chamfer inline-flex items-center gap-2 bg-white/80 hover:bg-white border border-black/15 text-[#0A0A0A] px-4 py-3.5 text-[12.5px] font-mono transition-colors cursor-pointer"
    >
      {copyState === 'copied' ? (
        <Check size={14} className="text-emerald-600" />
      ) : (
        <Copy size={14} />
      )}
      <span>
        {copyState === 'copied'
          ? 'Copied'
          : copyState === 'failed'
            ? 'Copy unavailable'
            : 'Copy email'}
      </span>
    </button>
  );
}
