import { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import { api } from "./api";

function App() {
  const [students, setStudents] = useState([]);

  const load = async () => {
    const res = await api.get("/students");
    setStudents(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1>Student Management System</h1>
      <StudentForm refresh={load} />
      <StudentList students={students} refresh={load} />
    </div>
  );
}

export default App;
