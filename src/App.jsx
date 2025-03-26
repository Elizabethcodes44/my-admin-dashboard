import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { useTheme } from "./components/theme";
import {useState} from "react"
import NavBar from './components/sidebar';
import Dashboard from './components/dashboard';
import Settings from './components/settings';
import Tickets from './components/ticket';

import Transactions from './components/transactions';
import ThemeProvider from "./components/theme";
import Reports from './components/reports';
import UserLogs from './components/userlogs';
import FloatingDarkModeToggle from "./components/floatingdarkmodetoggle";
import profileImage from "../src/assets/profile.avif"



function App() {
  return(
    <ThemeProvider>
      <MainApp/>
    </ThemeProvider>
  );
}
 
function MainApp() {
 
  const [open, setOpen] =useState(true);
  const {theme} =useTheme();
  

  return (
    
    <>
  
    <Router>
    <div className='flex h-screen bg-gray-100 dark:bg-gray-900 font-quickSand' >
    <NavBar open={open} setOpen={setOpen} /> 
    <div className={`flex-1 flex flex-col p-3  ${open ? "ml-1" : "ml-1"} transition-all duration-500 min-h-screen ${theme === "light" ? "bg-white text-gray-700" : "bg-slate-950 text-gray-100"} `}>
      {/* Top Bar with profile =*/}
      <div className={`flex items-center space-x-4 p-2   rounded-full shadow-md ${theme === "light" ? "bg-white text-gray-700" : "bg-black text-gray-100"} `}>
        <h2 className = "font-semibold text-sm ">Welcome Admin</h2>
        <div className="relative">
          <img src={profileImage} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 cursor-pointer " 
              />

                
             
        </div>
      </div>

      <div className="p-2 flex-1 overflow-y-auto">
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
  
    </div>
    <FloatingDarkModeToggle />
    </Router>
 
    </>
  )
}

export default App
