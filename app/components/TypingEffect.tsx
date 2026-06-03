"use client";

import { useState, useEffect } from "react";

export default function TypingEffect({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, 20 + Math.random() * 30);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, onComplete]);

  return (
    <span>
      {displayedText}
      {index < text.length && (
        <span style={{
          display: "inline-block",
          width: "8px",
          height: "16px",
          background: "#38bdf8",
          marginLeft: "2px",
          animation: "blink 1s infinite",
        }} />
      )}
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
