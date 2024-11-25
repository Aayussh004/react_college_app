import React, { useEffect, useState } from "react";
import "../../styles/queriesCard.css";

const QueriesCard = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    // Fetch last queries from localStorage
    const savedQueries = JSON.parse(localStorage.getItem("lastQueries")) || [];
    setQueries(savedQueries);
  }, []);

  return (
    <div className="queries-card">
      <h2>Last Queries</h2>
      {queries.length > 0 ? (
        <ul>
          {queries.map((query, index) => (
            <li key={index}>
              <strong>{query.student}</strong>: {query.program}
            </li>
          ))}
        </ul>
      ) : (
        <p>No queries available.</p>
      )}
    </div>
  );
};

export default QueriesCard;
