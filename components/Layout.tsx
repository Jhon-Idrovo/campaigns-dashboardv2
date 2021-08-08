import { useState } from "react";
import SideBar from "./SideBar";
import LoginNeeded from "./LoginNeeded";

function Layout({ children }: { children: React.ReactNode }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const [isLoged, setIsLoged] = useState(
    Boolean(window !== "undefined" && localStorage.getItem("ss"))
  );
  function handleLogOut() {
    window !== "undefined" &&
      localStorage.removeItem("ss") &&
      localStorage.removeItem("rr");
    setIsLoged(false);
  }
  return (
    <div>
      <nav className="text-txt-base bg-base flex justify-between">
        <button
          className="ml-4"
          onClick={() => setIsSideBarOpen((prev) => !prev)}
        >
          Menu
        </button>
        <button className="btn-low text-sm mr-4" onClick={handleLogOut}>
          Log Out
        </button>
      </nav>
      <SideBar
        isDisplaying={isSideBarOpen}
        closeMenu={() => setIsSideBarOpen(false)}
      ></SideBar>
      {isLoged ? children : <LoginNeeded></LoginNeeded>}
    </div>
  );
}

export default Layout;
