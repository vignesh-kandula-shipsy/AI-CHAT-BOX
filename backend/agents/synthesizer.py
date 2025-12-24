from typing import Dict, List

from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI

from config import settings


llm = ChatOpenAI(
    api_key=settings.openai_api_key,
    model=settings.openai_model,
    temperature=0,
)


def format_history(messages: List[Dict[str, str]]) -> str:
    if not messages:
        return "No prior internal discussion."
    lines = []
    for m in messages:
        lines.append(f"{m['agent']}: {m['content']}")
    return "\n".join(lines)


def run_synthesizer(user_query: str, messages: List[Dict[str, str]]) -> str:
    """Synthesizer agent: combine all inputs into a final user-facing answer."""
    history_text = format_history(messages)

    sys_prompt = (
        "You are a Synthesizer agent in a multi-agent AI system.\n"
        "Your job is to read the Planner, Researcher, and Critic messages and\n"
        "produce a final answer for the user that is clear, accurate, and\n"
        "well-structured. Resolve disagreements using your best judgment and\n"
        "mention any important caveats.\n"
    )

    human_prompt = (
        f"User query:\n{user_query}\n\n"
        f"Full internal multi-agent discussion:\n{history_text}\n\n"
        "Now write the final response that will be shown to the user.\n"
        "It should be self-contained, easy to follow, and directly address the\n"
        "user's needs."
    )

    response = llm.invoke(
        [
            SystemMessage(content=sys_prompt),
            HumanMessage(content=human_prompt),
        ]
    )
    return response.content



