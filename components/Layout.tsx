import { useState } from "react";
import Link from "next/link";
import SideBar from "./SideBar";

function Layout({ children }: { children: React.ReactNode }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  return (
    <div>
      <nav className="text-txt-base bg-base flex justify-between">
        <button
          className="ml-4"
          onClick={() => setIsSideBarOpen((prev) => !prev)}
        >
          Menu
        </button>
        <button className="btn-low text-sm mr-4">Log Out</button>
      </nav>
      <SideBar
        isDisplaying={isSideBarOpen}
        closeMenu={() => setIsSideBarOpen(false)}
      ></SideBar>
      {children}
    </div>
  );
}

export default Layout;
