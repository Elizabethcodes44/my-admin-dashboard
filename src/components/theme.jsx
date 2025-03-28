import {useState, createContext, useContext, useEffect} from 'react';
const themeContext = createContext();

export default function ThemeProvider({children}){
const [theme, setTheme] = useState('light'); //Default theme is light
const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
};
useEffect(() => {
    document.body.className = theme === 'light' ? 'bg-white  text-gray-800' : 'bg-gray-900 text-gray-100';
})
return(
    <themeContext.Provider value={{theme, toggleTheme}}>
        {children}
    </themeContext.Provider>
)
}
export function useTheme() {
    return useContext(themeContext);
}