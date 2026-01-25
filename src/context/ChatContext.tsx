"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

type ChatContextType = {
  isOpen: boolean;
  toggleChat: () => void;
  openChatWithIntent: (intent: string) => void;
  messages: Message[];
  addMessage: (text: string, sender: "user" | "bot") => void;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy con tu futuro sitio web?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const addMessage = (text: string, sender: "user" | "bot") => {
    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        text,
        sender,
        timestamp: new Date(),
      },
    ]);
  };

  const openChatWithIntent = (intent: string) => {
    setIsOpen(true);
    if (intent === "recommendation") {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.text.includes("ayudarte a elegir")) return;

      addMessage(
        "Veo que necesitas ayuda para elegir el plan ideal. ¡Genial! Para recomendarte la mejor opción, necesito hacerte unas preguntas breves. ¿Te parece bien?",
        "bot"
      );
    }
  };

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        toggleChat,
        openChatWithIntent,
        messages,
        addMessage,
        isTyping,
        setIsTyping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
