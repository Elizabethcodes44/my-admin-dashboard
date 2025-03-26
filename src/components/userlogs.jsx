import { useState } from "react";
import { useTheme } from "./theme";
//import { motion, AnimatePresence } from "framer-motion";
export default function UserLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [userId, setUserId] = useState("");

  const { theme } = useTheme();
  //fetvhing logs from local json file get user logs
  const fetchLogs = () => {
    setLoading(true);
    setError(""); //clear previous errors
    fetch("/getUserLogs.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, startAt, endAt }),
    })
      .then((response) => response.json())
      .then((results) => {
        if (results.Success) {
          const filteredLogs = results.data.filter(
            (log) =>
              log.user_id === userId &&
              (!startAt || new Date(log.log_date) >= new Date(startAt)) &&
              (!endAt || new Date(log.log_date) <= new Date(endAt))
          );
          setLogs(filteredLogs);
        } else {
          setError("Failed to fetch logs. Check the User ID");
        }
      })
      .catch(() => setError("Error fetching logs. Please try again."))
      .finally(() => setLoading(false));
  };

  return (
    <div
      className={`${
        theme === "light" ? "text-gray-800" : " text-gray-100"
      } p-1 max-w-5xl mx-auto`}
    >
      <h2 className="text-xl font-semibold mb-4 mt-4 text-center">Logs</h2>
      {/* Input Section */}
      <div
        className={`${
          theme === "light"
            ? "bg-white text-gray-800"
            : "bg-black text-gray-100"
        }  shadow-md p-4 rounded-md flex flex-wrap gap-3 text-sm items-center mb-6 `}
      >
        <label>User ID: </label>
        <input
          type="text"
          className="border  focus:ring-0 p-2 rounded-md text-sm w-30 h-[30px]"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          required
        />
        <label>Start Date: </label>
        <input
          type="date"
          className="border p-2 rounded-md text-sm w-44 text-sm w-30 h-[30px]"
          value={startAt}
          onChange={(e) => setStartAt(e.target.value)}
        />
        <label>End Date: </label>
        <input
          type="date"
          className="border p-2 rounded-md text-sm w-44 text-sm w-30 h-[30px]"
          value={endAt}
          onChange={(e) => setEndAt(e.target.value)}
        />
        <button
          className=" text-gray-100 px-4 py-1 rounded-md text-sm hover:bg-gray-600 transition bg-gray-800"
          onClick={fetchLogs}
          disabled={loading || !userId}
        >
          {loading ? "Loading..." : "Fetch Logs"}
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {logs.length > 0 ? (
        <div
          className={`${
            theme === "light" ? "bg-white" : "bg-black"
          } shadow-md p-4 rounded-md overflow-x-auto`}
        >
          <table className="w-full border-collapse shadow bg-white text-center  text-sm border border-gray-200">
            <thead className="text-sm text-center">
              <tr className="bg-gray-100">
                <th className=" p-2">ID</th>
                <th className=" p-2">User ID</th>
              
                <th className=" p-2">Log Type</th>
                <th className=" p-2">Description</th>
                <th className=" p-2">Date</th>
                <th className=" p-2">IP</th>
                <th className=" p-2">Time Stamp</th>
                <th className=" p-2">User Agent</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="shadow bg-white text-center text-sm">
                  <td className="p-2">{log.id}</td>
                  <td className="p-2">{log.user_id}</td>
                  <td className="p-2">{log.log_type}</td>
                  <td className="p-2">{log.log_description}</td>
                  <td className="p-2">
                    {new Date(log.log_date).toLocaleString()}
                  </td>
                  <td className="p-2">{log.metadata.ip}</td>
                  <td className="p-2">{log.metadata.timestamp}</td>
                  <td className="p-2">{log.metadata.userAgent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className=" text-sm">No logs found</p>
      )}
    </div>
  );
}
