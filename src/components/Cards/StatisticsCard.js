import React, { useState, useEffect } from "react";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "../../styles/statisticsCard.css";

const StatisticsCard = ({ retentionRate }) => {
  const [programs, setPrograms] = useState([]);
  const [queriedAdmissions, setQueriedAdmissions] = useState(0);
  const [completedAdmissions, setCompletedAdmissions] = useState(0);

  useEffect(() => {
    // Fetch programs from localStorage
    const storedPrograms = JSON.parse(localStorage.getItem("availablePrograms")) || [];
    setPrograms(storedPrograms);

    // Calculate the queried admissions (status === "queried")
    const queriedCount = storedPrograms.filter((program) => program.status === "queried").length;
    setQueriedAdmissions(queriedCount);

    // Calculate the completed admissions (status === "admitted")
    const completedCount = storedPrograms.filter((program) => program.status === "admitted").length;
    setCompletedAdmissions(completedCount);
  }, []); // Empty dependency array ensures it runs once after the component mounts

  return (
    <div className="statistics-card">
      <h2>Admin Statistics</h2>
      <div className="circular-statistics">
        <div className="circular-item">
          <CircularProgressbar
            value={programs.length || 0}
            maxValue={100}
            text={`${programs.length}`}
            styles={buildStyles({
              pathColor: "#007bff",
              textColor: "#343a40",
              trailColor: "#f8f9fa",
            })}
          />
          <p>Total Programs</p>
        </div>
        <div className="circular-item">
          <CircularProgressbar
            value={queriedAdmissions || 0}
            maxValue={programs.length || 1} 
            text={`${queriedAdmissions}`}
            styles={buildStyles({
              pathColor: "#ffc107",
              textColor: "#343a40",
              trailColor: "#f8f9fa",
            })}
          />
          <p>Queried Admissions</p>
        </div>
        <div className="circular-item">
          <CircularProgressbar
            value={retentionRate || 0}
            maxValue={100}
            text={`${retentionRate}%`}
            styles={buildStyles({
              pathColor: "#28a745",
              textColor: "#343a40",
              trailColor: "#f8f9fa",
            })}
          />
          <p>Retention Rate</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
