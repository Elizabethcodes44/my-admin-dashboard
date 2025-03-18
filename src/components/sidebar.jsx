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

const menuItems = [
  { icons: <RiDashboard2Line size={30}/>, label: "Dashboard" },
  {
    icons: <LuLogs size={30}/>,
    label: "User Logs",
  },
  {
    icons: <TbTransactionPound size={30}/>,
    label: "Transactions",
  },
  {
    icons: <LuTicketsPlane size={30}/>,
    label: "Tickets",
  },
  {
    icons: <TbFileReport size={30}/>,
    label: "Reports",
  },
  {
    icons: <IoSettings size={30}/>,
    label: "Settings",
  },
  {
    icons: <BiLogOut size={30}/>,
    label: "Logout",
  },
];

export default function NavBar() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <nav className={`shadow-md h-screen ${open ? 'w-60' : 'w-16'} duration-500 bg-teal-950 p-2 flex flex-col `}>
        {/* header */}
        <div className="border px-3 py-2 h-20 flex justify-between items-center ">
          <img src={MdLogoDev} alt="dashboard-logo"className={`${open ? 'w-10' : 'w-0' } rounded-md`}/>
          <div>
          <CiMenuKebab size={34} className="cursor-pointer text-white" onClick={()=>setOpen(!open)} />
          </div>
        </div>
        <ul className="flex-1">
            {
                menuItems.map((item,index)=>{
                    return(
                        <li key = {index} className="px-3 py-2  hover:bg-emerald-800 rounded-md duration-300 cursor-pointer text-white flex gap-2 items-center my-3">
                            <div>{item.icons}</div>
                            <p className={`${!open && 'w-0 translate-x-24' } duration-500 overflow-hidden`}>{item.label}</p>

                        </li>
                    )
                })
            }
        </ul>
        <div className="px-3 py-2 hover:bg-orange-150 rounded-md duration-300 cursor-pointer text-white flex gap-2 items-center">
           <div> <TbHelpHexagonFilled size={30}/> </div>
            <p className={`${!open && 'w-0 translate-x-24' } duration-500 overflow-hidden`}>Help</p>
        </div>
      </nav>
    </>
  );
}
