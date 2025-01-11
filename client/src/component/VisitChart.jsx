import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function VisitChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    
    axios
      .get("http://localhost:5000/api/visits/stats")
      .then((response) => {
        const data = response.data;
        const labels = data.map((item) => item.date); 
        const visits = data.map((item) => item.visits); 

        
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Lượt truy cập",
              data: visits,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.3,
            },
          ],
        });
      })
      .catch((err) => console.error("Failed to fetch chart data:", err));
  }, []);

  
  return (
    <div className="p-4 justify-items-center h-96 bg-gray-100 rounded">

      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: { display: true, text: "Lượt truy cập hàng ngày" },
            },
          }}
        />
      ) : (
        <p>Đang tải biểu đồ...</p>
      )}
    </div>
  );
}

export default VisitChart;
