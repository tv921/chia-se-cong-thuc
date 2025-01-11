import React, { useEffect, useState } from "react";
import axios from "axios";
import VisitChart from "../component/VisitChart";
import { Link } from 'react-router-dom';
import { FaUtensils, FaUsers, FaComments} from "react-icons/fa"; // Import thêm FaStar

function Statistics() {
  const [visitStats, setVisitStats] = useState([]);
  const [generalStats, setGeneralStats] = useState({
    recipes: 0,
    users: 0,
    comments: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/visits/stats")
      .then((response) => setVisitStats(response.data))
      .catch((err) => console.error("Failed to fetch visit statistics:", err));
 
    axios
      .get("http://localhost:5000/api/statistics")
      .then((response) => setGeneralStats(response.data))
      .catch((err) => console.error("Failed to fetch general statistics:", err));
  }, []);

  return (
    <div className="space-y-12 px-4">
      {/* Biểu đồ lượt truy cập */}
      <div className="mb-8">
        <h1 className="text-2xl text-center font-bold mb-4">Biểu đồ lượt truy cập của website</h1>
        <VisitChart />
      </div>

      <div>
        <h1 className="text-2xl text-center font-bold mb-6">Thống kê chung</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/manage-recipes">
          <div className="bg-blue-500 text-white rounded-lg shadow-md p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-blue-600">
            <FaUtensils className="text-4xl mb-2" />
            <p className="text-xl font-bold">Công thức nấu ăn</p>
            <p className="text-2xl">{generalStats.recipes}</p>
          </div>
          </Link>

          <Link to="/manage-users">
          <div className="bg-green-500 text-white rounded-lg shadow-md p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-green-600">
            <FaUsers className="text-4xl mb-2" />
            <p className="text-xl font-bold">Người dùng</p>
            <p className="text-2xl">{generalStats.users}</p>
          </div>
          </Link>

          <Link to="/manage-comments">
          <div className="bg-yellow-500 text-white rounded-lg shadow-md p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-yellow-600">
            <FaComments className="text-4xl mb-2" />
            <p className="text-xl font-bold">Bình luận</p>
            <p className="text-2xl">{generalStats.comments}</p>
          </div>
          </Link>

        </div>
      </div>

      <div>
        <h1 className="text-2xl text-center font-bold mb-6">Thống kê lượt truy cập</h1>
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border-4 border-gray-300 w-full text-sm md:text-base">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-6 py-3 text-lg font-semibold text-gray-700 text-left">Thời gian</th>
                <th className="border border-gray-300 px-6 py-3 text-lg font-semibold text-gray-700 text-left">Lượt truy cập</th>
              </tr>
            </thead>
            <tbody>
              {visitStats.map((stat) => (
                <tr key={stat._id} className="hover:bg-gray-100 transition-all">
                  <td className="border border-gray-300 px-6 py-4 text-gray-800 text-lg">{stat.date}</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-800 text-lg">{stat.visits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Statistics;