import { prependOnceListener } from "process";
import { useLocalStorage } from "react-use";
import "../styles/main.css";
import Button from "./Button";
const Layout: React.FC = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  const toggleTheme = () =>
    theme === "dark" ? setTheme("light") : setTheme("dark");

  return (
    <div className={`${theme} overflow-hidden`}>
      <div className="absolute top-0 right-0 mr-4 mt-4">
        <Button onClick={toggleTheme}>{theme}</Button>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
