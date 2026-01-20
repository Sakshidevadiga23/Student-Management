import { useState } from "react";
import { api } from "../api";

export default function StudentForm({ refresh }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = async () => {
    await api.post("/students", { name, email });
    refresh();
    setName("");
    setEmail("");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input 
        placeholder="Name" 
        value={name}
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
      />
<button
  onClick={submit}
  style={{
    backgroundColor: "#1976d2",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px"
  }}
>
  Add Student
</button>
    </div>
  );
}
