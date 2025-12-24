import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    if (username && password) {
      navigate("/chat");
    } else {
      // Simple demo-only validation
      // eslint-disable-next-line no-alert
      alert("Enter any username and password to continue.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/70">
        <h2 className="text-lg font-semibold text-slate-50">
          Multi-Agent Chat Login
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Demo-only login. Any credentials will work.
        </p>

        <div className="mt-4 space-y-3">
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={handleLogin}
          className="mt-4 w-full rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 shadow-sm hover:bg-emerald-400"
        >
          Continue to Chat
        </button>
      </div>
    </div>
  );
}


