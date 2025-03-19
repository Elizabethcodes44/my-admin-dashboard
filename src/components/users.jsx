import { useState } from "react";
export default function UserLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [userId, setUserId] = useState("");

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
          const filteredLogs =results.data.filter(log => log.user_id === userId && (!startAt || new Date(log.log_date) >= new Date(startAt)) &&
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
    <div>
      <h2>UserLogs</h2>
      {/* Input Section */}
      <div>
        <label>User ID: </label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          required
        />
        <label>Start Date: </label>
        <input
          type="datetime-local"
          value={startAt}
          onChange={(e) => setStartAt(e.target.value)}
        />
        <label>End Date: </label>
        <input
          type="datetime-local"
          value={endAt}
          onChange={(e) => setEndAt(e.target.value)}
        />
        <button onClick={fetchLogs} disabled={loading || !userId}>
          {loading ? "Loading..." : "Fetch Logs"}
        </button>
      </div>
      {error && <p style={{color:"red"}}>{error}</p>}

      {logs.length > 0 ?(
         <table border="1" cellPadding="10">
         <thead>
           <tr>
             <th>ID</th>
             <th>Type</th>
             <th>Description</th>
             <th>Date</th>
             <th>IP</th>
             <th>User Agent</th>
           </tr>
         </thead>
         <tbody>
           {logs.map((log) => (
             <tr key={log.id}>
               <td>{log.id}</td>
               <td>{log.log_type}</td>
 
               <td>{log.log_description}</td>
 
               <td>{new Date(log.log_date).toLocaleString()}</td>
 
               <td>{log.metadata.ip}</td>
 
               <td>{log.metadata.userAgent}</td>
             </tr>
           ))}
         </tbody>
       </table>
      ) : (
        <p>No logs found</p>
      )}
     
    </div>
  );
}
