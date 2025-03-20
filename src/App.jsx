import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import NavBar from './components/sidebar';
import Dashboard from './components/dashboard';
import Settings from './components/settings';
import Tickets from './components/tickets';
import Transactions from './components/transactions';

import Reports from './components/reports';
import UserLogs from './components/users';


function App() {
 

  return (
    
    <>
    <Router>
    <div className='flex'>
    <NavBar/>
    <div className="flex-1 p-6  min-h-screen bg-amber-200">
      <Routes>
        
        <Route path = "/" element={<Dashboard/>}/>
        <Route path = "/userlogs" element={<UserLogs/>}/>
        <Route path = "/transactions" element={<Transactions/>}/>
        <Route path = "/tickets" element={<Tickets/>}/>
        <Route path = "/reports" element={<Reports/>}/>
        <Route path = "/settings" element={<Settings/>}/>
       
      </Routes>
    </div>
  
    </div>
    </Router>
    </>
  )
}

export default App
