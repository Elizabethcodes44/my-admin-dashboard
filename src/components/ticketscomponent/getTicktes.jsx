import { useState } from "react";
export default function GetTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //filter states
  const [ticketId, setTicketId] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const [supportUserId, setSupportUserId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchTickets = () => {
    setLoading(true);
    setError("");

    fetch("/getTickets.json")
      .then((response) => response.json())
      .then((results) => {
        if (results.success) {
          let filteredTickets = results.data;

          // If no filters are applied, return all tickets
          if (
            !ticketId &&
            !userId &&
            !status &&
            !supportUserId &&
            !startDate &&
            !endDate
          ) {
            setTickets(filteredTickets);
            return;
          }

          // If filters are applied, Ticket ID is required
          {
            /* if (!ticketId) {
            setError("Please enter a Ticket ID to filter.");
            setTickets([]);
            return;
          }  */
          }

          // Apply filters
          filteredTickets = results.data.filter((ticket) => {
            if (ticketId && ticket.ticket_id !== ticketId) return false;
            if (userId && ticket.user_id !== userId) return false;
            if (status && ticket.status !== status) return false;
            if (supportUserId && ticket.support_user_id !== supportUserId)
              return false;
            if (startDate && new Date(ticket.created_at) < new Date(startDate))
              return false;
            if (endDate && new Date(ticket.created_at) > new Date(endDate))
              return false;

            return true;
          });

          if (filteredTickets.length === 0) {
            setError("No ticket found with the given filters.");
          }

          setTickets(filteredTickets);
        } else {
          setError("Failed to fetch tickets.");
        }
      })
      .catch(() => setError("Error fetching tickets. Please try again."))
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Support Tickets</h2>

      <div className="grid shadow-lg rounded-md md:grid-cols-3 gap-6">
        <div className="px-4 py-2">
          <h3>Ticket Details</h3>
          <input
            type="text"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            placeholder="Ticket ID"
            className="w-full border p-2 rounded mb-2"
            required
          />

          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
            className="w-full border p-2 rounded mb-2"
          />
        </div>

        {/* Amount & Date Filters */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Support & Date</h3>
          <input
            type="text"
            value={supportUserId}
            onChange={(e) => setSupportUserId(e.target.value)}
            placeholder="Support User ID"
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
        </div>

        {/* Status Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">& Status</h3>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border p-2 rounded mb-2"
          >
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={fetchTickets}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch Tickets"}
        </button>
        <button
          onClick={() => {
            setTicketId("");
            setUserId("");
            setSupportUserId("");
            setStartDate("");
            setEndDate("");
            setStatus("");
            setTickets([]);
          }}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Clear Filters
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Tickets Table */}
      {tickets.length > 0 ? (
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Ticket ID</th>
                <th className="border p-2">User ID</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Message</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Created At</th>
                <th className="border p-2">Updated At</th>
                <th className="border p-2">Support Note</th>
                <th className="border p-2">Support User ID</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="text-center">
                  <td className="border p-2">{ticket.ticket_id}</td>
                  <td className="border p-2">{ticket.user_id}</td>
                  <td className="border p-2">{ticket.email}</td>
                  <td className="border p-2">{ticket.message}</td>
                  <td className="border p-2">{ticket.status}</td>
                  <td className="border p-2">
                    {new Date(ticket.created_at).toLocaleString()}
                  </td>
                  <td className="border p-2">
                    {new Date(ticket.updated_at).toLocaleString()}
                  </td>

                  <td className="border p-2">{ticket.support_note}</td>
                  <td className="border p-2">{ticket.support_user_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4">No tickets found</p>
      )}
    </div>
  );
}
