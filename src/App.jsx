import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import {useState} from "react"
import NavBar from './components/sidebar';
import Dashboard from './components/dashboard';
import Settings from './components/settings';
import Tickets from './components/tickets';
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
    <div className={`flex-1 p-6 ${open ? "ml-60" : "ml-16"} transition-all duration-500 min-h-screen bg-amber-200  ${
          theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
      <Routes>
        
        <Route path = "/" element={<Dashboard/>}/>
        <Route path = "/getUserLogs" element={<UserLogs/>}/>
        <Route path = "/getUserTransactions" element={<Transactions/>}/>
        <Route path = "/getTickets" element={<Tickets/>}/>
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
