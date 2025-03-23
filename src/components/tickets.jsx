import { useState } from "react";
export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //filter states
  const [ticketId, setTicketId] = useState("");
  const [status, setStatus] = useState("");
  const fetchTickets = () => {
    setLoading(true);
    setError("");
    // Build filter object
    let filters = {
      ticketId,

      status,
    };
    //Remove empty filters
    Object.keys(filters).forEach((key) => {
      if (!filters[key]) delete filters[key];
    });

    fetch("/getTickets.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters),
    })
      .then((response) => response.json())
      .then((results) => {
        if (results.success) {
          const filteredTickets = results.data.filter((ticket) => {
            return (
              (!ticketId || ticket.ticket_id === ticketId) &&
              (!status || ticket.status === status)
            );
          });
          setTickets(filteredTickets);
        } else {
          setError("Failed to fetch ticket. Check filters.");
        }
      })
      .catch(() => setError("Error fetching tickets. Please try again."))
      .finally(() => setLoading(false));
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Tickets</h2>

      <div className="grid shadow-lg rounded-md md:grid-cols-3 gap-6">
        <div className="px-4 py-2">
          <h3>Ticket Details</h3>
          <input
            type="text"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            placeholder="Ticket ID"
            className="w-full border p-2 rounded mb-2"
          />
        </div>

        {/* Type & Status Filters */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Status</h3>

          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border p-2 rounded mb-2"
          ></input>
        </div>
      </div>

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
                <th className="border p-2">ID</th>
                <th className="border p-2">UserId</th>
                <th className="border p-2">Message</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">TicketID</th>
                <th className="border p-2">Support Note</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="text-center">
                  <td className="border p-2">{ticket.id}</td>
                  <td className="border p-2">{ticket.user_id}</td>
                  <td className="border p-2">{ticket.message}</td>
                  <td className="border p-2">{ticket.status}</td>
                  <td className="border p-2">{ticket.email}</td>
                  <td className="border p-2">{ticket.ticket_id}</td>
                  <td className="border p-2">{ticket.support_note}</td>
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
