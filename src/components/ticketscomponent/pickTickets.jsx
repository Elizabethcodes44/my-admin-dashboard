import {useState, useEffect} from "react";
export default function PickTickets() {
    const [ticketId, setTicketId] = useState("");
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    
   
    const pickTicket = () => {
        if (!ticketId) {
            setError("Please enter a Ticket ID");
            return;
        }
        setLoading(true);
        setError("");
        setMessage("");
        fetch("/admin/pickTicket.json", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify ({ticket_id: ticketId}),
        })
        .then((res) => res.json())
        .then((result) => {
            if (result.success && result.data ) {
                //finding ticket in the data array
               const ticket =result.data.find((t) => t.ticket_id === ticketId);
               if (ticket) {
                setMessage(`Ticket Found: ${ticket.message}`)
               } else {
                setError("Ticket not found");
               }
            } else {
                setError("Error retrieving ticket.");
            }
            })
            .catch(() => setError("Error picking ticket."))
            .finally(() => setLoading(false));
        }
    
    return(
        <div>
            <h3>Pick a Ticket</h3>
            <input type ="text" value = {ticketId}
            onChange = {(e) => setTicketId(e.target.value)}
            placeholder ="Enter  ticket ID"/>
            <button onClick = {pickTicket} disabled= {loading}>
                {loading ? "Loading...." : "Pick Ticket"}

            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
        </div>
    )
}