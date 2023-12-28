import DrawerToggler from "./ui/drawerToggler";
import logo from "../assets/logo.svg";
import Renamer from "./ui/renamer";
import SaveBtn from "./ui/saveBtn";
import DeleteBtn from "./ui/deleteBtn";
export default function Header() {
  return (
    <div className="flex gap-[24px] bg-dark-300 xl:gap-0">
      <DrawerToggler />
      <div className="flex grow items-center gap-[24px] pr-[8px] md:pr-[16px]">
        <div className="my-[16px] hidden items-center self-stretch border-r border-light-100 px-[29px] xl:flex">
          <img src={logo} />
        </div>
        <Renamer />
        <div className="ml-auto flex gap-[12px]">
          <DeleteBtn />
          <SaveBtn />
        </div>
      </div>
    </div>
  );
}
