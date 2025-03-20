import {useTheme} from "../components/theme";
import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";
 export default function FloatingDarkModeToggle() {
    const {theme, toggleTheme} = useTheme();

    return(
        <button 
        onClick = {toggleTheme}
        className="fixed top-4 right-5 bg-gray-700 text-white p-3 rounded-full shadow-lg hovber:bg-gray-600 transition">
            {theme === "light" ? <MdOutlineDarkMode size={24} /> : <MdLightMode size={24} />}

        </button>
    )
 }