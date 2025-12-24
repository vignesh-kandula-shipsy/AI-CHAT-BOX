from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from config import settings
from graph.graph import run_graph


class ChatRequest(BaseModel):
    query: str


class AgentMessage(BaseModel):
    agent: str
    message: str


class ChatResponse(BaseModel):
    conversation: List[AgentMessage]
    final_answer: str


app = FastAPI(title="LangGraph Multi-Agent Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def health() -> dict:
    return {"status": "ok", "message": "LangGraph multi-agent backend is running"}


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    query = request.query.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Query must not be empty.")

    try:
        result = run_graph(query)
        conversation = [
            AgentMessage(agent=m["agent"], message=m["content"])
            for m in result.get("conversation", [])
        ]
        return ChatResponse(
            conversation=conversation,
            final_answer=result.get("final_answer") or "",
        )
    except Exception as exc:  # pragma: no cover - generic fallback
        raise HTTPException(status_code=500, detail=str(exc)) from exc


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=settings.backend_port,
        reload=True,
    )


