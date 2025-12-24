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


def run_critic(user_query: str, messages: List[Dict[str, str]]) -> str:
    """Critic agent: review research output and identify gaps or issues."""
    history_text = format_history(messages)

    sys_prompt = (
        "You are a Critic agent in a multi-agent AI system.\n"
        "Your job is to carefully review the Research agent's response and the\n"
        "overall plan, identify flaws, risks, missing points, and suggest\n"
        "improvements. Be constructive and specific.\n"
    )

    human_prompt = (
        f"User query:\n{user_query}\n\n"
        f"Internal discussion so far:\n{history_text}\n\n"
        "Point out any inaccuracies, missing edge cases, or places where the\n"
        "research could be improved. Then summarize concrete recommendations\n"
        "for how the Synthesizer should respond to the user."
    )

    response = llm.invoke(
        [
            SystemMessage(content=sys_prompt),
            HumanMessage(content=human_prompt),
        ]
    )
    return response.content



