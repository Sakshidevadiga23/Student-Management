import { useState } from "react";
import { api } from "../api";

export default function StudentForm({ refresh }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async () => {
    setError("");
    setSuccess("");

    try {
      await api.post("/students", { name, email });

      setSuccess("Student added successfully");
      refresh();
      setName("");
      setEmail("");

    } catch (err) {
      // BACKEND VALIDATION MESSAGE
      if (err.response && err.response.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Student with this email already exist.");
      }
    }
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
        style={{ marginLeft: "10px" }}
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
          marginLeft: "10px",
        }}
      >
        Add Student
      </button>

      {/* Validation / error message */}
      {error && (
        <p style={{ color: "red", marginTop: "8px" }}>
          {error}
        </p>
      )}

      {/* Success message */}
      {success && (
        <p style={{ color: "green", marginTop: "8px" }}>
          {success}
        </p>
      )}
    </div>
  );
}
