import React from "react";
import StatisticsCard from "./Cards/StatisticsCard";
import ProgramsCard from "./Cards/ProgramsCard";
import QueriesCard from "./Cards/QueriesCard";
import "../styles/dashboard.css";

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="card-container">
        <StatisticsCard />
        <ProgramsCard />
        <QueriesCard />
      </div>
    </div>
  );
};

export default AdminDashboard;
