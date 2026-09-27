"use client";

import { requestTopic } from "@/lib/topic";

// Jumps to the inquiry form with this topic already selected.
export default function DiscussButton({ topic, className = "" }: { topic: string; className?: string }) {
  return (
    <a href="#contact" onClick={() => requestTopic(topic)} className={className}>
      Discuss {topic.toLowerCase()}
    </a>
  );
}
