import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import {useState} from "react"
import NavBar from './components/sidebar';
import Dashboard from './components/dashboard';
import Settings from './components/settings';
import CloseTickets from './components/ticketscomponent/closeTickets';
import GetTickets from './components/ticketscomponent/getTicktes';
import PickTickets from './components/ticketscomponent/pickTickets';
import Transactions from './components/transactions';
import ThemeProvider from "./components/theme";
import Reports from './components/reports';
import UserLogs from './components/users';
import FloatingDarkModeToggle from "./components/floatingdarkmodetoggle"
import { useTheme } from "./components/theme";


function App() {
  return(
    <ThemeProvider>
      <MainApp/>
    </ThemeProvider>
  );
}
 
function MainApp() {
  const {theme} = useTheme();
  const [open, setOpen] =useState(true);

  return (
    
    <>
  
    <Router>
    <div className='flex' >
    <NavBar open={open} setOpen={setOpen} /> 
    <div className={`flex-1 p-6 ${open ? "ml-60" : "ml-16"} transition-all duration-500 min-h-screen   ${
          theme === "light" ? "bg-orange-100 text-gray-600" : "bg-gray-800 text-gray-100"}`}>
      <Routes>
        
        <Route path = "/" element={<Dashboard/>}/>
        <Route path = "/getUserLogs" element={<UserLogs/>}/>
        <Route path = "/getUserTransactions" element={<Transactions/>}/>
        <Route path = "/getTickets" element={<GetTickets/>}/>
        <Route path = "/admin/pickTickets" element={<PickTickets/>}/>
        <Route path = "/admin/closeTickets" element={<CloseTickets/>}/>
        <Route path = "/reports" element={<Reports/>}/>
        <Route path = "/settings" element={<Settings/>}/>
       
      </Routes>
    </div>
  
    </div>
    <FloatingDarkModeToggle />
    </Router>
 
    </>
  )
}

export default App
