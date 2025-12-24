import type { ReactNode } from "react";

interface ChatLayoutProps {
  children: ReactNode;
}

export function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-xs font-bold text-slate-950">
              MA
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-50">
                Multi-Agent Chat
              </div>
              <div className="text-xs text-slate-400">
                LangGraph · Planner · Researcher · Critic · Synthesizer
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex flex-1 justify-center">
        <div className="flex w-full max-w-5xl flex-1 flex-col px-4 py-4">
          {children}
        </div>
      </main>
    </div>
  );
}


