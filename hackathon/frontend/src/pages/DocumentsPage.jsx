import React, { useState } from "react";
import api from "../api/axios";

export default function DocumentsPage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const res = await api.get("/search", { params: { q } });
      setResults(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900 }}>
      <h2>Search Documents</h2>
      <form onSubmit={search} style={{ display: "flex", gap: 8 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search query"
          style={{ flex: 1 }}
        />
        <button>Search</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {results.map((r) => (
            <li key={r._id} style={{ margin: "12px 0" }}>
              <strong>{r.title}</strong>
              <div style={{ fontSize: 13, color: "#555" }}>
                {(r.summary || r.contentText || "").slice(0, 200)}...
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
