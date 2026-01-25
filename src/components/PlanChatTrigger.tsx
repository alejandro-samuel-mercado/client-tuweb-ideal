"use client";

import { useChat } from "@/context/ChatContext";

export default function PlanChatTrigger() {
  const { openChatWithIntent } = useChat();

  return (
    <button
      onClick={() => openChatWithIntent("recommendation")}
      className="text-purple-400 hover:text-purple-300 underline"
    >
      Habla con nuestro asistente
    </button>
  );
}
