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


def run_planner(user_query: str, messages: List[Dict[str, str]]) -> str:
    """Planner agent: understand the query and break it into sub-tasks."""
    history_text = format_history(messages)

    sys_prompt = (
        "You are a Planner agent in a multi-agent AI system.\n"
        "Your job is to:\n"
        "1) Carefully understand the user query.\n"
        "2) Break the problem into clear, actionable steps.\n"
        "3) Explain what the Researcher, Critic, and Synthesizer should focus on.\n"
        "Be concise, structured, and explicit.\n"
    )

    human_prompt = (
        f"User query:\n{user_query}\n\n"
        f"Existing internal discussion:\n{history_text}\n\n"
        "Reply with:\n"
        "- A short overall understanding of the query.\n"
        "- Numbered list of sub-tasks.\n"
        "- Guidance for the Researcher, Critic, and Synthesizer agents."
    )

    response = llm.invoke(
        [
            SystemMessage(content=sys_prompt),
            HumanMessage(content=human_prompt),
        ]
    )
    return response.content



