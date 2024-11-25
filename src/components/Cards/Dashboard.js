import React, { useState, useEffect } from "react";
import StatisticsCard from "./StatisticsCard";
import ProgramsCard from "./ProgramsCard";
import QueriesCard from "./QueriesCard";
import "../../styles/dashboard.css";

const Dashboard = () => {
  const [search, setSearch] = useState(""); // For filtering cards
  const [programs, setPrograms] = useState([]); // Persistent programs list
  const [retentionRate, setRetentionRate] = useState(null); // Retention rate calculation

  // Load programs from localStorage on mount
  useEffect(() => {
    const storedPrograms = JSON.parse(localStorage.getItem("availablePrograms")) || [];
    setPrograms(storedPrograms);
    console.log("Programs Loaded from LocalStorage:", storedPrograms);

    // Calculate retention rate
    calculateRetentionRate(storedPrograms);
  }, []);

  // Save programs to localStorage whenever they change
  useEffect(() => {
    if (programs.length > 0) {
      localStorage.setItem("availablePrograms", JSON.stringify(programs));
      console.log("Programs Saved to LocalStorage:", programs);
      calculateRetentionRate(programs); // Recalculate retention when programs change
    }
  }, [programs]);

  // Function to calculate retention rate
  const calculateRetentionRate = (programs) => {
    const queriedPrograms = programs.filter(program => program.status === "queried").length;
    const registeredPrograms = programs.filter(program => program.status === "registered").length;
  
    if (queriedPrograms === 0) {
      localStorage.setItem('retentionRate', '0'); // Store 0 if no programs are queried
    } else {
      const rate = (registeredPrograms / queriedPrograms) * 100;
      localStorage.setItem('retentionRate', rate.toFixed(2)); // Store the calculated retention rate
    }
    setRetentionRate(localStorage.getItem('retentionRate')); // Set the retention rate
  };

  // Function to clear all data
  const clearAllData = () => {
    localStorage.clear();
    setPrograms([]);
    setRetentionRate(null);
    alert("All data has been cleared.");
    window.location.reload(); 
  };

  // Filter logic for cards based on the search
  const cards = [
    {
      id: 1,
      name: "Admin Statistics",
      component: <StatisticsCard retentionRate={retentionRate} />, // Pass retention rate here
    },
    {
      id: 2,
      name: "Programs Management",
      component: (
        <ProgramsCard programs={programs} setPrograms={setPrograms} />
      ),
    },
    {
      id: 3,
      name: "Last Queries",
      component: <QueriesCard />,
    },
  ];

  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <input
          type="text"
          placeholder="Search cards..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={clearAllData}
          style={{
            backgroundColor: "#dc3545", 
            color: "white",
            padding: "10px 20px",
            marginLeft: "20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Clear All Data
        </button>
      </div>
      <div className="dashboard-cards">
        {filteredCards.map((card) => (
          <div key={card.id} className="dashboard-card">
            {card.component}
          </div>
        ))}
      </div>

      {/* Retention rate will be passed into the StatisticsCard component */}
      <div className="retention-rate">
        <h3>Retention Rate: {retentionRate !== null ? `${retentionRate}%` : "Calculating..."}</h3>
      </div>
    </div>
  );
};

export default Dashboard;
