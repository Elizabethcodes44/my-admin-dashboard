import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, Legend
} from "recharts";
import ticketsData from "../../src/jsonfiles/getTickets.json";
import transactionsData from "../../src/jsonfiles/transactionsgraphdata.json";

//format the tıcket data
const processData = () => {
    const tickets = ticketsData.data;
    const transactions = transactionsData.data 

    //aggregate ticket counts by status
    const ticketStatusCounts = tickets.reduce((acc, ticket) => {
        acc[ticket.status] = (acc[ticket.status] || 0 ) + 1;
        return acc;
    }, {});


    //aggregate total transaction amount
    const transactionSummary = transactions.reduce((acc, transaction) => {
        acc.total += transaction.amount;
        return acc;
    }, {total: 0});

    //Group tıckets by date
    const ticketTrendCounts = tickets.reduce((acc, ticket) => {
        const date = ticket.created_at;
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    //convert status counts into pie chart format
    const pieData = Object.keys(ticketStatusCounts).map((key) => ({
        name: key.toUpperCase(),
        value: ticketStatusCounts[key],
      }));
    
      // Convert ticket trends into an array for the line chart
      const ticketTrendData = Object.keys(ticketTrendCounts).map(date => ({
        name: date,
        tickets: ticketTrendCounts[date]
      }));
    
      return { pieData, transactionSummary, ticketTrendData };
    };
    

export default function Dashboard () {
    const { pieData, transactionSummary, ticketTrendData } = processData();
    const COLORS = ["#36454F", "#FFBB28", "#FF0000"];
    return(
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
      {/* Ticket Status Pie Chart */}
      <div className=" p-4 shadow-md rounded-lg cursor-pointer">
        <h2 className="text-sm text-center font-bold mb-2">Ticket Status Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} label>
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Transaction Summary Bar Chart */}
      <div className=" p-4 shadow-md rounded-lg">
        <h2 className="text-sm text-center font-bold mb-2">Transaction Summary</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[{ name: "Total Transactions", amount: transactionSummary.total }]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Ticket Trend Line Chart */}
      <div className=" p-4 shadow-md rounded-lg">
        <h2 className="text-sm text-center font-bold mb-2">Ticket Trend Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ticketTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="tickets" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    )
}