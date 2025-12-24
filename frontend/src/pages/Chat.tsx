import { useRef, useState, KeyboardEvent, useEffect } from "react";
import { ChatLayout } from "../components/ChatLayout";
import { AgentMessageBubble } from "../components/AgentMessageBubble";
import { FinalAnswerBox } from "../components/FinalAnswerBox";
import { Loader } from "../components/Loader";
import { postChat } from "../api/chat";
import { useChatStore, type AgentMessage } from "../store/chatStore";

export default function Chat() {
  const {
    messages,
    finalAnswer,
    loading,
    error,
    setMessages,
    setFinalAnswer,
    setLoading,
    setError
  } = useChatStore();

  const [input, setInput] = useState("");
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = viewportRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, finalAnswer, loading]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setError(undefined);

    try {
      const result = await postChat(trimmed);
      const mappedMessages: AgentMessage[] = result.conversation.map((m) => ({
        agent: m.agent as AgentMessage["agent"],
        message: m.message
      }));
      setMessages(mappedMessages);
      setFinalAnswer(result.final_answer);
    } catch (err) {
      const e = err as Error;
      setError(e.message || "Failed to contact backend.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  }

  return (
    <ChatLayout>
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-slate-50">
              Multi-Agent Reasoning Chatbot
            </h1>
            <p className="text-xs text-slate-400">
              See how Planner, Researcher, Critic, and Synthesizer collaborate
              on your query.
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 md:flex-row">
          <div className="flex flex-1 flex-col rounded-2xl border border-slate-800 bg-slate-950/60 shadow-inner">
            <div
              ref={viewportRef}
              className="flex-1 space-y-4 overflow-y-auto p-4 pr-3"
            >
              {messages.length === 0 && !loading && (
                <div className="mt-6 text-sm text-slate-500">
                  Ask a question to see the agents plan, research, critique, and
                  synthesize an answer. For example:
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-400">
                    <li>
                      &quot;Design a scalable architecture for a real-time chat
                      app.&quot;
                    </li>
                    <li>
                      &quot;Explain LangGraph multi-agent workflows in simple
                      terms.&quot;
                    </li>
                  </ul>
                </div>
              )}
              {messages.map((m, idx) => (
                <AgentMessageBubble
                  key={`${m.agent}-${idx}`}
                  agent={m.agent}
                  message={m.message}
                />
              ))}
              {loading && <Loader />}
            </div>
          </div>

          <div className="mt-3 w-full md:mt-0 md:w-80">
            <FinalAnswerBox answer={finalAnswer} />
          </div>
        </div>

        <form
          className="sticky bottom-2 mt-2 space-y-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-3 shadow-lg shadow-slate-950/60"
          onSubmit={(e) => {
            e.preventDefault();
            void handleSend();
          }}
        >
          <textarea
            className="max-h-40 min-h-[60px] w-full resize-none rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Ask anything. Press Enter to send, Shift+Enter for a new line."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs text-slate-500">
              Built with FastAPI · LangGraph · OpenAI-compatible LLM
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-emerald-950 shadow-sm hover:bg-emerald-400 disabled:opacity-60"
            >
              {loading ? "Running agents…" : "Send"}
            </button>
          </div>
          {error && (
            <div className="text-xs font-medium text-red-400">{error}</div>
          )}
        </form>
      </div>
    </ChatLayout>
  );
}


