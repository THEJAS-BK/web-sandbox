import React, { useState } from "react";
import api from "../api/axios";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return setStatus("Select a file first");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("title", title);
    try {
      const res = await api.post("/documents/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus("Uploaded: " + (res.data.title || "ok"));
    } catch (err) {
      setStatus("Upload failed");
    }
  };

  return (
    <div style={{ maxWidth: 700 }}>
      <h2>Upload Document</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Optional title"
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button>Upload</button>
      </form>
      {status && <div style={{ marginTop: 12 }}>{status}</div>}
    </div>
  );
}
