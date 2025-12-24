from typing import List, Optional, TypedDict


class AgentMessage(TypedDict):
    agent: str
    content: str


class GraphState(TypedDict):
    """Shared state for the LangGraph multi-agent workflow."""

    user_query: str
    messages: List[AgentMessage]
    final_answer: Optional[str]



