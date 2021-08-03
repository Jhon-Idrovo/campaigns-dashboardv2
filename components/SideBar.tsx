import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, MouseEventHandler, useEffect } from "react";

function SideBar({
  isDisplaying,
  closeMenu,
}: {
  isDisplaying: boolean;
  closeMenu: MouseEventHandler;
}) {
  const barElements = [
    { t: "Clients", href: "/panel/clients" },
    { t: "Campaigns", href: "/panel/campaigns" },
    { t: "Affiliates", href: "/panel/affiliates" },
    { t: "My Stats", href: "/panel/stats" },
    { t: "Expenses", href: "/panel/expenses" },
  ];
  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      console.log(e.target.id, isDisplaying);
      e.target.id !== "menu" && isDisplaying
        ? closeMenu(e as unknown as MouseEvent)
        : null;
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDisplaying]);
  const router = useRouter();
  return (
    <div
      id="menu"
      className={`fixed left-0 bottom-0 top-0 bg-primary ${
        isDisplaying ? "" : "transform transition-transform -translate-x-full"
      }`}
    >
      <ul className="pl-4">
        <li className="w-full">
          <button className=" text-right w-full px-2" onClick={closeMenu}>
            x
          </button>
        </li>
        {barElements.map(({ t, href }) => (
          <li
            className={`rounded-md rounded-r-none py-1 px-2 ${
              router.pathname.includes(href) ? "bg-base text-txt-base" : ""
            }`}
          >
            <button
              onClick={(event) => {
                closeMenu(event);
                router.push(href);
              }}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
