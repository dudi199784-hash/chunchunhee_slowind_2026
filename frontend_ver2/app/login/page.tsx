"use client";

import { useState } from "react";
import { login } from "../lib/api/members";

const ACCESS_TOKEN_KEY = "accessToken";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [memberLabel, setMemberLabel] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login({ userId, password });
      setAccessToken(data.accessToken);
      setMemberLabel(`userId: ${data.memberDto.userId} · 내부 id: ${data.memberDto.id}`);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
      }
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "response" in err
          ? String(
              (err as { response?: { data?: { detail?: string } } }).response?.data
                ?.detail ?? "로그인 실패",
            )
          : "로그인 실패";
      setError(msg);
      setAccessToken("");
      setMemberLabel("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 24, maxWidth: 480 }}>
      <h1>로그인 (JWT 테스트)</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>
            userId
            <br />
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              autoComplete="username"
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            password
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "요청 중…" : "로그인"}
        </button>
      </form>
      {error ? <p role="alert">{error}</p> : null}
      {memberLabel ? <p>회원: {memberLabel}</p> : null}
      {accessToken ? (
        <div style={{ marginTop: 16 }}>
          <p>accessToken (localStorage &quot;{ACCESS_TOKEN_KEY}&quot; 에도 저장)</p>
          <textarea readOnly rows={6} style={{ width: "100%" }} value={accessToken} />
        </div>
      ) : null}
    </main>
  );
}
