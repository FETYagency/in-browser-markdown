import CreateBtn from "./ui/createBtn";
import Typo from "./ui/typography";
import document from "../assets/icon-document.svg";
import { Link } from "react-router-dom";
import ThemeToggler from "./ui/themeToggler";
import { useContext } from "react";
import drawerStateContext from "../services/providers/drawerStateHandlers";
import { useSelector } from "react-redux";
import { selectAllDocuments } from "../services/sotre/features/documents";
import { formatISO9075 } from "date-fns";

export default function Drawer({ drawerState }) {
  const { setDrawerState } = useContext(drawerStateContext);
  const selector = useSelector((state) => selectAllDocuments(state));
  let renderedList;
  if (selector.length > 0) {
    renderedList = selector.map((per) => {
      const createdAt = formatISO9075(per.createdAt, {
        representation: "date",
      });
      return (
        <li key={per.id}>
          <Link
            to={`/${per.id}`}
            onClick={() => setDrawerState("closed")}
            className="flex w-full items-center gap-[16px]"
          >
            <span>
              <img src={document} />
            </span>
            <span>
              <Typo
                text={createdAt}
                variant={"B(s)"}
                className="text-light-200"
              />
              <Typo text={per.name} variant={"H(m)"} className="text-white" />
            </span>
          </Link>
        </li>
      );
    });
  } else {
    renderedList = (
      <Typo
        text={"Create a document ."}
        variant={"B(s)"}
        className="mx-auto text-light-200"
      />
    );
  }
  return (
    <aside
      className={`flex h-full max-w-fit flex-col items-start overflow-hidden bg-dark-200 ${
        drawerState === "closed"
          ? " pointer-events-none w-0 p-0"
          : "pointer-events-auto w-full min-w-fit px-[24px] py-[27px] opacity-100"
      }`}
    >
      <Typo
        variant={"H(s)"}
        text={"MY DOCUMENT"}
        className="mb-[29px] text-light-200"
      />
      <CreateBtn />
      <ul className="mb-[24px] mt-[24px] flex grow flex-col gap-[26px] self-stretch overflow-y-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {renderedList}
      </ul>
      <ThemeToggler className="mt-auto" />
    </aside>
  );
}
