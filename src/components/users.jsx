import { useState } from "react";
import { useTheme } from "./theme";
import { motion, AnimatePresence } from "framer-motion";
export default function UserLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [userId, setUserId] = useState("");
  const [expandedId, setExpandedId] = useState(null);
const {theme} = useTheme();
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
    <div className={`${theme === "light" ? "text-gray-800" : " text-gray-100"} p-1 max-w-5xl mx-auto`}>
      <h2 className="text-xl font-semibold mb-4 mt-4 text-left  ">User Logs</h2>
      {/* Input Section */}
      <div className={`${theme === "light" ? "bg-white text-gray-800" : "bg-black text-gray-100"}  shadow-md p-4 rounded-md flex flex-wrap gap-3 items-center mb-6 `}>
        <label>User ID: </label>
        <input
          type="text"
          className="border  focus:ring-0 p-2 rounded-md text-sm w-40"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          required
        />
        <label>Start Date: </label>
        <input
          type="datetime-local"
          className="border p-2 rounded-md text-sm w-44"
          value={startAt}
          onChange={(e) => setStartAt(e.target.value)}
        />
        <label>End Date: </label>
        <input
          type="datetime-local"
          className="border p-2 rounded-md text-sm w-44"
          value={endAt}
          onChange={(e) => setEndAt(e.target.value)}
        />
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition disabled:bg-gray-400"
          onClick={fetchLogs}
          disabled={loading || !userId}
        >
          {loading ? "Loading..." : "Fetch Logs"}
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {logs.length > 0 ? (
        <div className="space-y-3 text-left">
       
            {logs.map((log) => (
              <motion.div key={log.id}  className={`${theme === "light" ? "bg-white " : "bg-black "}  shadow-md p-4 rounded-md cursor-pointer w-80 hover:shadow-lg transition`}
              onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}>
                 <div className="flex justify-between items-center">
                <h3 className="text-gray-500 text-sm"><strong>Log-Type: </strong>{log.log_type}</h3>
                <span className="text-gray-500 text-sm">
                {new Date(log.log_date).toLocaleString()} 
                </span>
                </div>

                {/* Expandable Description */}
              <AnimatePresence>
                {expandedId === log.id ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-gray-700 text-sm"
                  >
                    <p><strong>Description:</strong> {log.log_description}</p>
                    <p><strong>IP:</strong> {log.metadata.ip}</p>
                    <p><strong>User Agent:</strong> {log.metadata.userAgent}</p>
                  </motion.div>
                   ) : (
                    <p className="text-xs text-blue-500 mt-1">View Details ↓</p>
                 
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className=" text-sm">No logs found</p>
      )}
    </div>
  );
}
