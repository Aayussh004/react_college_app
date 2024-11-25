import React, { useState, useEffect } from "react";
import "../../styles/programsCard.css";

const ProgramsCard = () => {
  const [programs, setPrograms] = useState([]);
  const [newProgramName, setNewProgramName] = useState("");
  const [newProgramDescription, setNewProgramDescription] = useState("");

  // Load programs from localStorage on mount
  useEffect(() => {
    const storedPrograms = JSON.parse(localStorage.getItem("availablePrograms")) || [];
    setPrograms(storedPrograms);
  }, []);

  // Add a new program
  const addProgram = () => {
    if (!newProgramName || !newProgramDescription) {
      alert("Please fill in all fields");
      return;
    }
    const newProgram = {
      id: Date.now(),
      name: newProgramName,
      description: newProgramDescription,
    };
    const updatedPrograms = [...programs, newProgram];
    setPrograms(updatedPrograms); // Update state
    localStorage.setItem("availablePrograms", JSON.stringify(updatedPrograms)); // Update localStorage
    setNewProgramName("");
    setNewProgramDescription("");
  };

  // Delete a program
  const deleteProgram = (programId) => {
    const updatedPrograms = programs.filter((p) => p.id !== programId);
    setPrograms(updatedPrograms); // Update state
    localStorage.setItem("availablePrograms", JSON.stringify(updatedPrograms)); // Update localStorage
  };

  return (
    <div className="programs-card">
      <h2>Programs Management</h2>
      <div className="programs-inputs">
        <input
          type="text"
          placeholder="Program Name"
          value={newProgramName}
          onChange={(e) => setNewProgramName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Program Description"
          value={newProgramDescription}
          onChange={(e) => setNewProgramDescription(e.target.value)}
        />
        <button className="add-btn" onClick={addProgram}>
          Add Program
        </button>
      </div>
      <ul className="programs-list">
        {programs.map((program) => (
          <li key={program.id} className="program-item">
            <div>
              <strong>{program.name}</strong> - {program.description}
            </div>
            <button className="delete-btn" onClick={() => deleteProgram(program.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgramsCard;
