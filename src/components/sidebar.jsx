import { useState } from "react";
//icons
import { CiMenuKebab } from "react-icons/ci";
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
    path: "/userlogs"
  },
  {
    icons: <TbTransactionPound size={30} />,
    label: "Transactions",
    path: "/transactions"
  },
  {
    icons: <LuTicketsPlane size={30} />,
    label: "Tickets",
    path: "/tickets"
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

export default function NavBar() {
  const [open, setOpen] = useState(true);
  const { theme } = useTheme();
  return (
    <>
      <nav
        className={`shadow-md h-screen ${
          open ? "w-60" : "w-16"
        }  ${
          theme === "light" ? "bg-teal-950 text-white" : "bg-black text-white"} duration-500  p-2 flex flex-col `}
      >
        {/* header */}
        <div className=" px-3 py-2 h-20 flex justify-between items-center ">
          <MdLogoDev
            size={50}
            className={`text-white ${open ? "block" : "hidden"}`}
          />

          <div>
            <CiMenuKebab
              size={34}
              className={`cursor-pointer duration-500 ${
                !open && "rotate-90"
              } text-white`}
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>
        <ul className="flex-1">
          {menuItems.map((item, index) => {
            return (
              <li
                key={index}
                className="my-3"
              >
                 <Link to={item.path} className="flex items-center gap-2 px-3 py-2 hover:bg-emerald-800 rounded-md duration-300 cursor-pointer text-white">
               
                <div>{item.icons}</div>
                <p
                  className={`${
                    !open ? "width-0 translate-x-4" : "block"
                  } duration-500 overflow-hidden`}
                >
                  {item.label}
                </p>
                {!open && (
                  <p className="absolute left-16 shadow-md rounded-md w-0 p-0 border-md 0 text-white text-sm px-2 py-1 duration-300 overflow-hidden group-hover:w-auto opacity-0 group-hover:p-2 group-hover:opacity-200">
                    {item.label}
                  </p>
                )}
               </Link>
              </li>
            );
          })}
        </ul>
        <div className="px-3 py-2  hover:bg-emerald-800 rounded-md duration-300 cursor-pointer text-white flex gap-2 items-center my-3 relative group">
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
