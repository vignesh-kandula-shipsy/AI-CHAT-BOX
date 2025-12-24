from typing import Dict, List

from agents.planner import run_planner
from agents.researcher import run_researcher
from agents.critic import run_critic
from agents.synthesizer import run_synthesizer
from graph.state import GraphState


def _clone_messages(state: GraphState) -> List[Dict[str, str]]:
    # Shallow copy is enough because inner dicts are newly created.
    return list(state.get("messages", []))


def planner_node(state: GraphState) -> GraphState:
    messages = _clone_messages(state)
    content = run_planner(state["user_query"], messages)
    messages.append({"agent": "Planner", "content": content})
    return {"messages": messages}


def research_node(state: GraphState) -> GraphState:
    messages = _clone_messages(state)
    content = run_researcher(state["user_query"], messages)
    messages.append({"agent": "Researcher", "content": content})
    return {"messages": messages}


def critic_node(state: GraphState) -> GraphState:
    messages = _clone_messages(state)
    content = run_critic(state["user_query"], messages)
    messages.append({"agent": "Critic", "content": content})
    return {"messages": messages}


def synthesizer_node(state: GraphState) -> GraphState:
    messages = _clone_messages(state)
    content = run_synthesizer(state["user_query"], messages)
    messages.append({"agent": "Synthesizer", "content": content})
    return {
        "messages": messages,
        "final_answer": content,
    }



