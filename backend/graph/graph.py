from typing import Dict, List

from langgraph.graph import END, StateGraph

from graph.state import GraphState
from graph.nodes import critic_node, planner_node, research_node, synthesizer_node


def build_graph() -> StateGraph[GraphState]:
    graph = StateGraph(GraphState)

    graph.add_node("planner_node", planner_node)
    graph.add_node("research_node", research_node)
    graph.add_node("critic_node", critic_node)
    graph.add_node("synthesizer_node", synthesizer_node)

    graph.set_entry_point("planner_node")
    graph.add_edge("planner_node", "research_node")
    graph.add_edge("research_node", "critic_node")
    graph.add_edge("critic_node", "synthesizer_node")
    graph.add_edge("synthesizer_node", END)

    return graph


_compiled_app = build_graph().compile()


def run_graph(user_query: str) -> Dict[str, List[Dict[str, str]] | str]:
    """Run the LangGraph multi-agent workflow for a single user query."""
    initial_state: GraphState = {
        "user_query": user_query,
        "messages": [],
        "final_answer": None,
    }

    final_state = _compiled_app.invoke(initial_state)

    return {
        "conversation": final_state.get("messages", []),
        "final_answer": final_state.get("final_answer") or "",
    }



