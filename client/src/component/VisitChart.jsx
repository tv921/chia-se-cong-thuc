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

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function VisitChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch dữ liệu thống kê
    axios
      .get("http://localhost:5000/api/visits/stats")
      .then((response) => {
        const data = response.data;
        const labels = data.map((item) => item.date); // Lấy ngày
        const visits = data.map((item) => item.visits); // Lấy lượt truy cập

        // Cập nhật dữ liệu biểu đồ
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Lượt truy cập",
              data: visits,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.2,
            },
          ],
        });
      })
      .catch((err) => console.error("Failed to fetch chart data:", err));
  }, []);

  // Hiển thị biểu đồ khi có dữ liệu
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-4">Biểu đồ lượt truy cập trang web</h2>
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
