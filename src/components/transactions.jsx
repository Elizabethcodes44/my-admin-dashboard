import { useState,} from "react";
export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //filter states
  const [userId, setUserId] = useState("");
  const [internalRefId, setInternalRefId] = useState("");
  const [txId, setTxId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  //Fetch all transactıons on button clıck (or wıth fılters)

  const fetchTransactions = () => {
    setLoading(true);
    setError("");
    // Build filter object
    let filters = {
      userId,
      date,
      type,
      status,
      internal_ref_id: internalRefId,
      amount,
      tx_id: txId,
    };

    //Remove empty filters
    Object.keys(filters).forEach((key) => {
      if (!filters[key]) delete filters[key];
    });

    fetch("/getUserTransactions.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters),
    })
      .then((response) => response.json())
      .then((results) => {
        if (results.success) {
          const filteredTransactions = results.data.filter((transaction) => {
            return (
              (!userId || transaction.user_id === userId) &&
              (!date ||
                new Date(transaction.transaction_date)
                  .toISOString()
                  .slice(0, 10) === date) &&
              (!type || transaction.transaction_type === type) &&
              (!status || transaction.status === status) &&
              (!internalRefId ||
                transaction.internal_ref_id === internalRefId) &&
              (!txId || transaction.tx_id === txId) &&
              (!amount || transaction.amount === amount)
            );
          });

          setTransactions(filteredTransactions);
        } else {
          setError("Failed to fetch transactions. Check filters.");
        }
      })
      .catch(() => setError("Error fetching transactions. Please try again."))
      .finally(() => setLoading(false));
  };
  return (
    <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">User Transactions</h2>

        <div className="grid shadow-lg rounded-md md:grid-cols-3 gap-6">
            <div className="px-4 py-2">
                <h3>Transaction Details</h3>
                <input type="text" value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="User ID" className="w-full border p-2 rounded mb-2"/>
                 <input
            type="text"
            value={internalRefId}
            onChange={(e) => setInternalRefId(e.target.value)}
            placeholder="Internal Ref ID"
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="text"
            value={txId}
            onChange={(e) => setTxId(e.target.value)}
            placeholder="Transaction ID"
            className="w-full border p-2 rounded mb-2"
          />
        </div>

        {/* Amount & Date Filters */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Amount & Date</h3>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
        </div>

        {/* Type & Status Filters */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Type & Status</h3>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border p-2 rounded mb-2"
          >
            <option value="">All Types</option>
            <option value="withdrawal">Withdrawal</option>
            <option value="deposit">Deposit</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border p-2 rounded mb-2"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={fetchTransactions}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch Transactions"}
        </button>
        <button
          onClick={() => {
            setUserId("");
            setInternalRefId("");
            setTxId("");
            setAmount("");
            setDate("");
            setType("");
            setStatus("");
            setTransactions([]);
          }}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Clear Filters
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Transactions Table */}
      {transactions.length > 0 ? (
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Asset</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">To Address</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Internal Ref ID</th>
                <th className="border p-2">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="text-center">
                  <td className="border p-2">{transaction.id}</td>
                  <td className="border p-2">{transaction.transaction_type}</td>
                  <td className="border p-2">{transaction.asset}</td>
                  <td className="border p-2">{transaction.amount}</td>
                  <td className="border p-2">
                    {new Date(transaction.transaction_date).toLocaleString()}
                  </td>
                  <td className="border p-2">{transaction.to_address}</td>
                  <td className="border p-2">{transaction.status}</td>
                  <td className="border p-2">{transaction.internal_ref_id}</td>
                  <td className="border p-2">{transaction.tx_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4">No transactions found</p>
      )}
    </div>
  );

   

 
}
