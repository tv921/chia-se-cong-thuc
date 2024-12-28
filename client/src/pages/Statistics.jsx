import React, { useEffect, useState } from "react";
import axios from "axios";
import VisitChart from "../component/VisitChart";

function Statistics() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/visits/stats")
      .then((response) => setStats(response.data))
      .catch((err) => console.error("Failed to fetch statistics:", err));
  }, []);

  return (
    <div className="space-y-8">
      <VisitChart />
      <div>
        <h1 className="text-lg font-bold mb-4">Thống kê lượt truy cập</h1>
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Thời gian</th>
              <th className="border border-gray-300 px-4 py-2">Lượt truy cập</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => (
              <tr key={stat._id}>
                <td className="border border-gray-300 px-4 py-2">{stat.date}</td>
                <td className="border border-gray-300 px-4 py-2">{stat.visits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Statistics;
