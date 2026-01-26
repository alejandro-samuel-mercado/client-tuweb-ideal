"use client";

import dynamic from 'next/dynamic';

const Background = dynamic(() => import("@/components/Background"), { ssr: false });
const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"), { ssr: false });
const WelcomeModal = dynamic(() => import("@/components/WelcomeModal"), { ssr: false });
const ChatAssistant = dynamic(() => import("@/components/ChatAssistant"), { ssr: false });

export default function DynamicGlobalComponents() {
  return (
    <>
      <Background />
      <WelcomeModal />
      <ChatAssistant />
      <MusicPlayer />
    </>
  );
}
