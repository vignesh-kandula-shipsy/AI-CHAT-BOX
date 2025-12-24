interface FinalAnswerBoxProps {
  answer: string;
}

export function FinalAnswerBox({ answer }: FinalAnswerBoxProps) {
  if (!answer) return null;

  return (
    <section className="mt-4 rounded-2xl border border-emerald-400/70 bg-emerald-900/30 px-4 py-3 text-sm leading-relaxed text-emerald-50 shadow-sm">
      <header className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
        Final Answer
      </header>
      <div className="whitespace-pre-wrap">{answer}</div>
    </section>
  );
}


