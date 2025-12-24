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


def run_researcher(user_query: str, messages: List[Dict[str, str]]) -> str:
    """Research agent: explore the topic and propose detailed ideas/solutions."""
    history_text = format_history(messages)

    sys_prompt = (
        "You are a Research agent in a multi-agent AI system.\n"
        "Your job is to deeply analyze the Planner's breakdown and the user query,\n"
        "and provide detailed technical and conceptual insights.\n"
        "You can propose architectures, algorithms, trade-offs, and examples.\n"
        "Be thorough but stay focused on what is most useful.\n"
    )

    human_prompt = (
        f"User query:\n{user_query}\n\n"
        f"Internal discussion so far:\n{history_text}\n\n"
        "Provide a well-structured analysis and proposed solution. "
        "Call out any key assumptions you are making."
    )

    response = llm.invoke(
        [
            SystemMessage(content=sys_prompt),
            HumanMessage(content=human_prompt),
        ]
    )
    return response.content



