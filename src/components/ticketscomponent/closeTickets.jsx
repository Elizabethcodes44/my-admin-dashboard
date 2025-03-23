import {useState} from "react";
export default function CloseTickets() {
    const [ticketId, setTicketId] = useState("");
    const [supportNote, setSupportNote] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const closeTicket = () => {
        if(!ticketId || !supportNote) {
            setError("Please enter Ticket Id and a Support Note");
            return;
        }
        setLoading(true);
        setError("");
        setMessage("");
        console.log("Fetching tickets...");

        //Fetching the existing tickets to check if the ticket exists
        fetch("/admin/pickTicket.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to fetch tickets. Check file path.");
            }
            return res.json();
        })
        .then((result) => {
            console.log("Fetched JSON:", result);
            if (!result.data) {
                throw new Error("Invalid JSON structure: 'data' field missing.");
            }
            const ticket = result.data.find((t) => t.ticket_id === ticketId);
            if(!ticket) {
                throw new Error("Ticket not found.");
               
            }
            if (ticket.status === "closed") {
               throw new Error("This ticket is already closed.");
               
            }


            // Simulating ticket closure since we cannot modify JSON
            return Promise.resolve({
                json: () => Promise.resolve({ success: true, message: "Ticket closed successfully!" }),
            });
        })
           
           
        .then((res) => res.json())
           
        .then((result) => {
            if (result.success) {
                setMessage(`✅ ${result.message}`);
            } else {
                setError("❌ Failed to close the ticket.");
            }
        })
        .catch((err) => {
            console.error("Error:", err.message);
            setError(`❌ ${err.message}`);
        })
        .finally(() => setLoading(false));
    }
    return (
        <div>
            <h3>Close a Ticket</h3>
            <input 
            type = "text"
            value = {ticketId}
            onChange = {(e) => setTicketId(e.target.value)}
            placeholder="Enter Ticket ID"/>
            <textarea
            value = {supportNote}
            onChange = {(e) => setSupportNote(e.target.value)}/>
            <button onClick={closeTicket} disabled={loading}>
            {loading ? "Closing..." : "Close Ticket"}

            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}
        </div>
    )
}