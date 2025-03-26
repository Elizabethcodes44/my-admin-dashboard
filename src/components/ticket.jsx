import { useState,  } from "react";
import ticketsData from "../../src/jsonfiles/getTickets.json";
import { useTheme } from "../components/theme";
export default function Ticket() {
  const {theme} = useTheme()
  const [tickets, setTickets] = useState([]);
  const [ticketId, setTicketId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [status, setStatus] = useState("");

  const [loadingPick, setLoadingPick] = useState(false);
  const [loadingClose, setLoadingClose] = useState(false);

  
  const [closeMessage, setCloseMessage] = useState("");
//pagination

const [currentPage, setCurrentPage] = useState(1)
const recordsPerPage = 5;
const lastIndex = currentPage * recordsPerPage
const firstIndex = lastIndex -recordsPerPage;
const records = tickets.slice(firstIndex, lastIndex);
const npage = Math.ceil(tickets.length / recordsPerPage)
const numbers = [...Array(npage + 1).keys()].slice(1)
  //handle ticket fetching with button click

  const fetchTickets = () => {
    let filtered = ticketsData.data
     
       if (ticketId) {
        filtered = filtered.filter((ticket) =>
          ticket.ticket_id.toLowerCase().includes(ticketId.toLowerCase())
        )
     
  }
  if(status) {
    filtered = filtered.filter((ticket) =>
      ticket.status.toLowerCase().includes(status.toLowerCase())
    );
  }

    setTickets(filtered);
  };

  const clearTickets = () => {
    setTickets([]); //clears tickets
    setTicketId(""); // Optionally clear search fields
    setStatus(""); // Optionally clear search fields
    setSearchText(""); // Optionally clear search fields
  };

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

  

  const handlePick = (ticket) => {
    setLoadingPick((prev) => ({ ...prev, [ticket.id]: true }));;
    setTimeout(() => {
      setLoadingPick((prev) => ({ ...prev, [ticket.id]: false }));
      alert(`You have been successfully assigned to support the user ticket: ${ticket.ticket_id}`);
    }, 2000);
  };

 
  const handleCloseTicket = () => {
    setLoadingClose(true);
    setTimeout(() => {
      setLoadingClose(false);
      alert(`Ticket Closed: ${selectedTicket.ticket_id} - SupportNote: ${closeMessage}`);
      setSelectedTicket(null);
      setCloseMessage("");
    }, 2000);
  };

  

  return (
    <div className="p-6  mx-auto text-[10px]">
      {/* Search Inputs */}
      <div className="flex gap-4 mb-4 flex-col md:flex-row">
        <input
          type="text"
          placeholder="Enter Ticket ID"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          className="flex-1 p-2 rounded-md border shadow-sm"
        />
        <input
          type="text"
          placeholder="Enter Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="flex-1 p-2  rounded-md border shadow-sm"
        />
        <button
          onClick={fetchTickets}
          className="shadow text-gray-100 bg-gray-500 px-4 py-2 rounded hover:bg-gray-700"
        >
          Fetch Ticket
        </button>
        <button
  onClick={clearTickets}
  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
>clear ticket</button>
      </div>

      {/* Tickets Table */}
      {tickets.length > 0 && (
         <>
         <div className="overflow-x-auto max-w-full sm:max-w-[90%] md:max-w-[100%]">
      <table className="min-w-full  text-[10px] mt-6 shadow  text-center cursor-pointer   ">
        <thead>
          <tr className=" text-center">
          <th className="py-2 px-4  text-center shadow">Ticket ID</th>
            <th className="py-2 px-4 text-center shadow">Status</th>
            <th className="py-2 px-4 text-center shadow">Message</th>
            <th className="py-2 px-4 text-center shadow">Actions</th>
          </tr>
          </thead>
          <tbody>
        {records.map((ticket) => (
          <tr key={ticket.id} className="">
            <td className="shadow">{ticket.ticket_id}</td>
            <td className="py-2 shadow px-4">
            <span
                  className={`${
                    ticket.status === "closed" ? "text-red-500" : "text-green-500"
                  } shadow`}
                >
              {ticket.status.toUpperCase()}
              </span>
            </td>
            <td className="py-2 px-4 shadow">
             {ticket.message}
              
             </td>
             <td className="py-2 px-4 flex gap-3 shadow">
            <button
               onClick={() => handlePick(ticket)}
               className={`text-center px-4 py-2 rounded border border-bg-white ${
                 ticket.status === "closed"
                   ? "bg-gray-400 cursor-not-allowed"
                   : "bg-gray-500 text-white hover:bg-gray-700"
               }`}
               disabled={ticket.status === "closed"}
            >
              {loadingPick[ticket.id] ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white text-center text-center"></div>
              ) : (
                "Pick"
              )}
            </button>
            
            <button
                  onClick={() => setSelectedTicket(ticket)}
                  className={`text-center px-4 py-2 border border-bg-white rounded ${
                    ticket.status === "closed"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gray-950 text-white hover:bg-red-700"
                  }`}
                  disabled={ticket.status === "closed"}
                >
                  Close
                </button>
                </td>
             
              </tr>
             
          ))}
         
        </tbody>
      </table>
      </div>
      <nav className="mt-4 flex justify-center" >
        <ul className="flex flex-row space-x-2">
          <li >
          <button
                  onClick={prevPage}
                  className="px-3 py-1 border rounded-md hover:bg-gray-200"
                  disabled={currentPage === 1}
                >
                  Prev
                </button>

          </li>
          {
            numbers.map((n) =>(
              <li key={n}>
              <button
              onClick={() => changeCPage(n)}
              className={`px-3 py-1 border rounded-md hover:bg-gray-200 ${
                currentPage === n ? "bg-gray-500 text-white" : ""
              }`}
            >
              {n}
            </button>
          </li>
            ))
          }
           <li> <button
                  onClick={nextPage}
                  className="px-3 py-1 border rounded-md hover:bg-gray-200"
                  disabled={currentPage === npage}
                >
                  Next
                </button>

          </li>
        </ul>
      </nav>
      </>
    )}
  
     

  {selectedTicket && (
  <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center">
    <div className={`${theme === "light" ? "bg-white" : "bg-black"} p-6 rounded-md shadow w-1/3`}>
      <h3 className="font-bold">Close Ticket - {selectedTicket.ticket_id}</h3>

      <textarea
        value={closeMessage}
        onChange={(e) => setCloseMessage(e.target.value)}
        placeholder="Add a support note..."
        className="w-full p-2 border rounded-md mt-2"
      ></textarea>

      <div className="flex justify-end mt-2 gap-2">
        <button
          onClick={() => setSelectedTicket(null)}
          className={`${theme === "light" ? "bg-gray-300" : "bg-gray-800"}  px-4 py-2 rounded`}
        >
          Cancel
        </button>
        <button
          onClick={handleCloseTicket}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          {loadingClose ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  </div>
)}

      </div>

     
  );

  function prevPage() {
    if(currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
    
  }
  function changeCPage(id) {
    setCurrentPage(id)

  }
  function nextPage() {
    if(currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }

  }
}
