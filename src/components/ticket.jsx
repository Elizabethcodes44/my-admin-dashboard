import { useState, useEffect } from "react";
import ticketsData from "../../src/jsonfiles/getTickets.json";

export default function Ticket() {
  const [tickets, setTickets] = useState([]);
  const [ticketId, setTicketId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [status, setStatus] = useState("");

  const [loadingPick, setLoadingPick] = useState(false);
  const [loadingClose, setLoadingClose] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  const [detailedTicket, setDetailedTicket] = useState(null);
  const [closeMessage, setCloseMessage] = useState("");

  useEffect(() => {
    setTickets(ticketsData.data);
  }, []);

  // Correctly structured handleSearch function
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase(); 
    setSearchText(value);

    if (!value) {
      setTickets(ticketsData.data);
    } else {
      const filtered = ticketsData.data.filter(
        (ticket) =>
          ticket.ticket_id.toLowerCase().includes(value) ||
          ticket.status.toLowerCase().includes(value)
      );
      setTickets(filtered);
    }
  };

  const fetchTickets = () => {
    if (!ticketId && !status) {
      setTickets(ticketsData.data);
      return;
    }

    const filtered = ticketsData.data.filter(
      (ticket) =>
        (!ticketId || ticket.ticket_id.toLowerCase().includes(ticketId.toLowerCase())) &&
        (!status || ticket.status.toLowerCase().includes(status.toLowerCase()))
    );

    setTickets(filtered);
  };

  const handlePick = (ticket) => {
    setLoadingPick(true);
    setTimeout(() => {
      setLoadingPick(false);
      alert(`You have been assigned to ticket ${ticket.ticket_id}`);
    }, 2000);
  };

  const handleCloseTicket = () => {
    setLoadingClose(true);
    setTimeout(() => {
      setLoadingClose(false);
      alert(`Ticket Closed: ${selectedTicket.ticket_id} - Message: ${closeMessage}`);
      setSelectedTicket(null);
      setCloseMessage("");
    }, 2000);
  };

  const handleSeeMore = (ticket) => {
    setDetailedTicket(ticket);
    setShowDetails(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Search Inputs */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Enter Ticket ID"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          className="flex-1 p-2 border rounded-md shadow-sm"
        />
        <input
          type="text"
          placeholder="Enter Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="flex-1 p-2 border rounded-md shadow-sm"
        />
        <button
          onClick={fetchTickets}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Fetch Ticket
        </button>
      </div>

      {/* Tickets Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-white shadow-md rounded-lg p-4">
            <p className="font-bold">{ticket.ticket_id}</p>
            <p className={`text-sm ${ticket.status === "closed" ? "text-red-500" : "text-green-500"}`}>
              {ticket.status.toUpperCase()}
            </p>
            <textarea
              value={ticket.message}
              readOnly
              className="w-full p-2 border rounded-md h-20"
            />
            <button
              onClick={() => handleSeeMore(ticket)}
              className="text-blue-500 mt-2 hover:underline"
            >
              See More...
            </button>
            <button
              onClick={() => handlePick(ticket)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full flex justify-center"
            >
              {loadingPick ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                "Pick Me"
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Close Ticket Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-2">Close Ticket</h2>
            <p className="text-gray-600">Ticket ID: {selectedTicket.ticket_id}</p>
            <textarea
              value={closeMessage}
              onChange={(e) => setCloseMessage(e.target.value)}
              placeholder="Add a closing message..."
              className="w-full p-2 border rounded-md mt-2"
            ></textarea>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setSelectedTicket(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleCloseTicket}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 flex justify-center"
              >
                {loadingClose ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  "Close Ticket"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* See More Modal */}
      {showDetails && detailedTicket && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-2">Ticket Details</h2>
            <p><strong>ID:</strong> {detailedTicket.ticket_id}</p>
            <p><strong>Status:</strong> {detailedTicket.status}</p>
            <p><strong>Message:</strong> {detailedTicket.message}</p>
            <button
              onClick={() => setShowDetails(false)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
