"use client";

import { useState, useEffect, useRef } from "react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function VoiceAssistant({ onCommand }: { onCommand: (command: string) => void }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onresult = (event: any) => {
          const command = event.results[0][0].transcript;
          setTranscript(command);
          onCommand(command);
          speakBack(`I understood: ${command}. Working on it...`);
          setIsListening(false);
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
          speakBack("Sorry, I didn't catch that. Please try again.");
        };
      }
    }
  }, [onCommand]);

  function speakBack(text: string) {
    setResponse(text);
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setResponse(""), 3000);
  }

  function startListening() {
    if (recognitionRef.current) {
      setTranscript("");
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      alert("Speech recognition not supported in this browser");
    }
  }

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      left: "20px",
      zIndex: 1000,
    }}>
      <button
        onClick={startListening}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: isListening ? "#ef4444" : "linear-gradient(to right, #2563eb, #38bdf8)",
          border: "none",
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: isListening ? "0 0 20px rgba(239,68,68,0.5)" : "0 0 20px rgba(56,189,248,0.5)",
          animation: isListening ? "pulse 1s infinite" : "none",
          transition: "0.2s",
        }}
      >
        {isListening ? "🎤" : "🎙️"}
      </button>
      {transcript && (
        <div style={{
          position: "absolute",
          bottom: "70px",
          left: "0",
          background: "#0f172a",
          padding: "10px 16px",
          borderRadius: "16px",
          border: "1px solid #38bdf8",
          fontSize: "13px",
          whiteSpace: "nowrap",
        }}>
          You said: "{transcript}"
        </div>
      )}
      {response && (
        <div style={{
          position: "absolute",
          bottom: "70px",
          left: "70px",
          background: "#1e293b",
          padding: "10px 16px",
          borderRadius: "16px",
          border: "1px solid #22c55e",
          fontSize: "13px",
          maxWidth: "250px",
          whiteSpace: "nowrap",
        }}>
          🤖 {response}
        </div>
      )}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
