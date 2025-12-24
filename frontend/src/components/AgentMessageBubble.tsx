import type { AgentMessage } from "../store/chatStore";

const agentColors: Record<AgentMessage["agent"], string> = {
  Planner: "bg-blue-900/40 border-blue-400",
  Researcher: "bg-emerald-900/40 border-emerald-400",
  Critic: "bg-amber-900/40 border-amber-400",
  Synthesizer: "bg-purple-900/40 border-purple-400"
};

export function AgentMessageBubble({ agent, message }: AgentMessage) {
  const colorClasses = agentColors[agent] ?? "bg-slate-800 border-slate-500";

  return (
    <div className="flex flex-col gap-1">
      <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
        {agent}
      </div>
      <div
        className={`rounded-2xl border px-4 py-3 text-sm leading-relaxed text-slate-50 shadow-sm ${colorClasses}`}
      >
        {message}
      </div>
    </div>
  );
}


