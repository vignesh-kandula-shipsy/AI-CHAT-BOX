import { create } from "zustand";

export type AgentName = "Planner" | "Researcher" | "Critic" | "Synthesizer";

export interface AgentMessage {
  agent: AgentName;
  message: string;
}

export interface ChatState {
  messages: AgentMessage[];
  finalAnswer: string;
  loading: boolean;
  error?: string;
  setMessages: (messages: AgentMessage[]) => void;
  setFinalAnswer: (answer: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error?: string) => void;
  reset: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  finalAnswer: "",
  loading: false,
  error: undefined,
  setMessages: (messages) => set({ messages }),
  setFinalAnswer: (finalAnswer) => set({ finalAnswer }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      messages: [],
      finalAnswer: "",
      loading: false,
      error: undefined
    })
}));


