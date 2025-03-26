
//icons
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLogoDev } from "react-icons/md";
import { RiDashboard2Line } from "react-icons/ri";
import { LuLogs } from "react-icons/lu";
import { TbTransactionPound } from "react-icons/tb";
import { LuTicketsPlane } from "react-icons/lu";
import { TbFileReport } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { TbHelpHexagonFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useTheme } from "./theme";

const menuItems = [
  { icons: <RiDashboard2Line size={20} />, label: "Dashboard",
  path: "/" },
  {
    icons: <LuLogs size={20} />,
    label: "User Logs",
    path: "/getUserLogs"
  },
  {
    icons: <TbTransactionPound size={20} />,
    label: "Transactions",
    path: "/getUserTransactions"
  },
  {
    icons: <LuTicketsPlane size={20} />,
    label: "Tickets",
    path: "/getTickets"
   
  },
 
  
  {
    icons: <BiLogOut size={20} />,
    label: "Logout",
    path: "/logout"
  },
];

export default function NavBar({open, setOpen}) {
 
  const { theme } = useTheme();
  
  

  return (
    <>
     {/* Mobile overlay */}
     {open && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
      <nav
         className={`fixed top-0 left-0 h-screen z-50 transition-all duration-500 ${
          open ? "w-50" : "w-16"
        } md:relative  backdrop-blur-md p-4 flex flex-col shadow-lg text-sm ${
          theme === "light"
            ? "bg-white text-gray-800"
            : "bg-gray-950 text-gray-100"
        }`} >
        {/* header */}
        <div className="flex items-center justify-between mb-8">
          <MdLogoDev
            size={40}
            className={` ${
          theme === "light" ? "text-gray-700" : "text-gray-100"}  ${open ? "block" : "hidden"} `}
          />

          
<GiHamburgerMenu
  size={20}
  className={`${
    theme === "light" ? "text-gray-700" : "text-gray-100"
  } cursor-pointer duration-500 `}  // Always visible, but optional hidden class for larger screens
  onClick={() => setOpen(!open)}
/>
          
        </div>
        <ul className="flex-1">
          {menuItems.map((item, index) => (
              <li
                key={index}
                className="my-3 relative group"
              >
                 <Link
              to={item.path}
              className={`flex items-center gap-2 p-2 rounded-md  transition-all duration-200 ${
                theme === "light" ? "text-gray-600 hover:bg-gray-200" : "text-gray-100 hover:bg-black"
              }`}
            >
              {item.icons}
              <span className={`${!open ? "hidden" : "block"} transition-all duration-200`}>

                {item.label}
              </span>
              
            </Link>
             {/* Hover label when menu is closed */}
             {!open && (
                  <span className={`absolute left-full top-1/2 transform -translate-y-1/2 ml-2 whitespace-nowrap shadow-md rounded-md  text-white text-sm px-3 py-1 opacity-0 transition-all duration-300 group-hover:opacity-100 ${
                theme === "light" ? "text-gray-800 bg-gray-600" : "text-gray-100 bg-black"
              }`}>
                     {item.label}
                    </span>
   
                )}
          
          </li>
        ))}
      </ul>
      
               
               
        <div className={` ${
          theme === "light" ? "hover:bg-gray-200 text-gray-600 " : "hover:bg-black text-gray-100"}px-3 py-2  rounded-md duration-300 cursor-pointer  flex gap-2 items-center my-3 relative group` }>
          <div>
            {" "}
            <TbHelpHexagonFilled size={20} />{" "}
          </div>
         
  <span
    className={`${
      !open ? "width-0 translate-x-4" : "block"
    } duration-500 overflow-hidden`}
  > <Link to="/chatbot">
    Help
    </Link>
  </span>


                {!open && (
                  <span className="absolute left-16 shadow-md rounded-md w-0 p-0 border-md 0 text-white text-sm px-2 py-1 duration-300 overflow-hidden bg-gray-800 group-hover:w-auto opacity-0 group-hover:p-2 group-hover:opacity-200 ">
                    Help
                  </span>
                )}
        </div>
      </nav>
    </>
  );
}
