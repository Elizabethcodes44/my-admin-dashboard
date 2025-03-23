
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
  { icons: <RiDashboard2Line size={30} />, label: "Dashboard",
  path: "/" },
  {
    icons: <LuLogs size={30} />,
    label: "User Logs",
    path: "/getUserLogs"
  },
  {
    icons: <TbTransactionPound size={30} />,
    label: "Transactions",
    path: "/getUserTransactions"
  },
  {
    icons: <LuTicketsPlane size={30} />,
    label: "Tickets",
    submenu: [
      { label: "Pick Tickets", path: "/admin/pickTickets" },
      { label: "Close Tickets", path: "/admin/closeTickets" },
      { label: "Get Tickets", path: "/getTickets" },
    ]
  },
  {
    icons: <TbFileReport size={30} />,
    label: "Reports",
    path: "/reports"
  },
  {
    icons: <IoSettings size={30} />,
    label: "Settings",
    path: "/settings"
  },
  {
    icons: <BiLogOut size={30} />,
    label: "Logout",
    path: "/logout"
  },
];

export default function NavBar({open, setOpen}) {
 
  const { theme } = useTheme();
  
  

  return (
    <>
      <nav
        className={`fixed shadow-md h-screen ${
          open ? "w-60" : "w-16"
        }  ${
          theme === "light" ? "bg-yellow-200 text-gray-600" : "bg-gray-900 text-gray-100"} duration-500  p-2 flex flex-col `}
      >
        {/* header */}
        <div className=" px-3 py-2 h-20 flex justify-between items-center ">
          <MdLogoDev
            size={50}
            className={` ${
          theme === "light" ? "text-orange-600" : "text-cyan-400"}  ${open ? "block" : "hidden"}`}
          />

          <div>
            <GiHamburgerMenu
              size={34}
              className={` ${
          theme === "light" ? "text-orange-600" : "text-cyan-400"} cursor-pointer duration-500 ${
                !open && "rotate-90"
              } `}
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>
        <ul className="flex-1">
          {menuItems.map((item, index) => (
              <li
                key={index}
                className="my-3 relative group"
              >
                {item.submenu ? (
                  <div className="relative">
                    <div className= {`${
          theme === "light" ? "hover:bg-orange-600 text-gray-600 " : "hover:bg-cyan-400 text-gray-100"} flex items-center gap-2 px-3 py-2  rounded-md duration-300 cursor-pointer ` } >

                      {item.icons}
                      <p className={`${
          theme === "light" ? " text-gray-600 " : " text-gray-100"} ${!open ? "width-0 translate-x-4" : "block"} duration-500 overflow-hidden text-gray-100`}>{item.label}</p>
                      {!open && (
          <p className="absolute left-16 shadow-md rounded-md w-0 p-0 text-white text-sm px-2 py-1 duration-300 overflow-hidden group-hover:w-auto opacity-0 group-hover:p-2 group-hover:opacity-100">
            {item.label}
          </p>
        )}
                </div>
                
                  <ul className={`${
          theme === "light" ? "hover:bg-yellow-200 text-gray-600 " : "hover:bg-cyan-400 text-gray-100"} absolute left-full top-0 ml-1  rounded-md shadow-md hidden group-hover:block w-48 `}>
                    {item.submenu.map((sub, subIndex) => (
                     <li key={subIndex}>
                     <Link
                       to={sub.path}
                       className={`${
          theme === "light" ? "bg-yellow-200 text-gray-600 hover:bg-orange-600 " : "bg-gray-900 text-gray-100 hover:bg-cyan-400"} block px-3 py-2 rounded-md duration-300 text-sm`}
                     >
                       {sub.label}
                     </Link>
                   </li>
                    ))}
                  </ul>
             
                </div>
                ) : (
                 <Link to={item.path} className={`flex items-center gap-2 px-3 py-2  rounded-md duration-300 cursor-pointer ${
          theme === "light" ? "hover:bg-orange-600 text-gray-600 " : "hover:bg-cyan-400 text-gray-100"}`}>
               
                {item.icons}
                <p
                  className={`${
                    !open ? "width-0 translate-x-4" : "block"
                  } duration-500 overflow-hidden`}
                > {item.label} </p>
                   </Link>
            )}
          </li>
        ))}
      </ul>
               
        <div className={` ${
          theme === "light" ? "hover:bg-orange-600 text-gray-600 " : "hover:bg-cyan-400 text-gray-100"}px-3 py-2  rounded-md duration-300 cursor-pointer  flex gap-2 items-center my-3 relative group` }>
          <div>
            {" "}
            <TbHelpHexagonFilled size={30} />{" "}
          </div>
          <p
                  className={`${
                    !open ? "width-0 translate-x-4" : "block"
                  } duration-500 overflow-hidden`}
                >
                 Help
                </p>
                {!open && (
                  <p className="absolute left-16 shadow-md rounded-md w-0 p-0 border-md 0 text-white text-sm px-2 py-1 duration-300 overflow-hidden group-hover:w-auto opacity-0 group-hover:p-2 group-hover:opacity-200">
                    Help
                  </p>
                )}
        </div>
      </nav>
    </>
  );
}
