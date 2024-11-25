import React, { useState, useEffect } from "react";
import "../styles/studentDashboard.css";

const StudentDashboard = () => {
  const [availablePrograms, setAvailablePrograms] = useState([]);
  const [registeredPrograms, setRegisteredPrograms] = useState([]);
  const [loggedInStudent, setLoggedInStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.type === "student") {
        setLoggedInStudent(parsedUser);
        const allRegistrations =
          JSON.parse(localStorage.getItem("studentPrograms")) || {};
        setRegisteredPrograms(allRegistrations[parsedUser.username] || []);
      } else {
        alert("Access denied. Please log in as a student.");
        window.location.href = "/";
      }
    } else {
      alert("No logged-in student found. Please log in again.");
      window.location.href = "/";
    }

    // Fetch available programs
    const storedPrograms = JSON.parse(localStorage.getItem("availablePrograms")) || [];
    setAvailablePrograms(storedPrograms);

    setLoading(false);
  }, []);

  const registerForProgram = (program) => {
    if (!loggedInStudent) {
      alert("You need to log in to register for programs.");
      return;
    }
  
    const allRegistrations = JSON.parse(localStorage.getItem("studentPrograms")) || {};
    const studentPrograms = allRegistrations[loggedInStudent.username] || [];
  
    if (!studentPrograms.find((p) => p.id === program.id)) {
      // Update the program's status to 'registered' in the local storage
      const storedPrograms = JSON.parse(localStorage.getItem("availablePrograms")) || [];
      const updatedPrograms = storedPrograms.map((p) =>
        p.id === program.id ? { ...p, status: "registered" } : p
      );
  
      // Save the updated programs back to localStorage
      localStorage.setItem("availablePrograms", JSON.stringify(updatedPrograms));
  
      // Now, add to the student's list of registered programs
      const updatedStudentPrograms = [...studentPrograms, program];
      allRegistrations[loggedInStudent.username] = updatedStudentPrograms;
      localStorage.setItem("studentPrograms", JSON.stringify(allRegistrations)); // Save to localStorage
  
      setRegisteredPrograms(updatedStudentPrograms); // Update state
  
      alert(`You have successfully registered for ${program.name}`);
    } else {
      alert("You are already registered for this program.");
    }
  };
  

  const handleQuery = (program) => {
    if (!loggedInStudent) {
      alert("You need to log in to submit queries.");
      return;
    }
  
    const storedPrograms = JSON.parse(localStorage.getItem("availablePrograms")) || [];
    
    // Update the program's status to 'queried'
    const updatedPrograms = storedPrograms.map((p) =>
      p.id === program.id ? { ...p, status: "queried" } : p
    );
  
    // Save the updated programs back to localStorage
    localStorage.setItem("availablePrograms", JSON.stringify(updatedPrograms));
  
    // Log to check if the status updates correctly
    console.log("Updated Programs after Query:", updatedPrograms);
  
    // Also save the query in lastQueries
    const lastQueries = JSON.parse(localStorage.getItem("lastQueries")) || [];
    const newQuery = { student: loggedInStudent.username, program: program.name };
    localStorage.setItem("lastQueries", JSON.stringify([...lastQueries, newQuery]));
  
    alert(`Query submitted for ${program.name}`);
  };
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {loggedInStudent ? (
        <>
          <h1>Welcome, {loggedInStudent.username}</h1>
          <h2>Registered Programs:</h2>
          <ul>
            {registeredPrograms.map((program) => (
              <li key={program.id}>{program.name}</li>
            ))}
          </ul>
          <h2>Available Programs:</h2>
          <ul>
            {availablePrograms.map((program) => (
              <li key={program.id}>
                {program.name}{" "}
                <button onClick={() => registerForProgram(program)}>Register</button>{" "}
                <button onClick={() => handleQuery(program)}>Query</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>No student found. Please log in again.</div>
      )}
    </div>
  );
};

export default StudentDashboard;
