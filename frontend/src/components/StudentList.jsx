import { api } from "../api";

export default function StudentList({ students, refresh }) {
  
  const deleteStudent = async (id) => {
    await api.delete(`/students/${id}`);
    refresh();
  };

  return (
    <div>
      <h2>Student List</h2>
      {students.map(s => (
        <div key={s.id}>
          {s.name} ({s.email})
<button
  onClick={() => deleteStudent(s.id)}
  style={{
    backgroundColor: "#d32f2f",
    color: "white",
    border: "none",
    padding: "6px 12px",
    marginLeft: "10px",
    borderRadius: "5px",
    cursor: "pointer"
  }}
>
  Delete
</button>
        </div>
      ))}
    </div>
  );
}
