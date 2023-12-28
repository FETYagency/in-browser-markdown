import menu from "../../assets/icon-menu.svg";
import close from "../../assets/icon-close.svg";
import { useContext } from "react";
import drawerStateContext from "../../services/providers/drawerStateHandlers";
export default function DrawerToggler() {
  const { drawerState, handleToggle } = useContext(drawerStateContext);
  return (
    <button
      onClick={handleToggle}
      className=" grid aspect-square w-[56px] place-items-center bg-dark-400 md:w-[72px]"
    >
      <img src={drawerState === "opened" ? close : menu} />
    </button>
  );
}
