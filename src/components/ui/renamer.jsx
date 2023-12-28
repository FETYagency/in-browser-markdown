import { useContext, useState } from "react";
import document from "../../assets/icon-document.svg";
import Typo from "./typography";
import { editorStateContext } from "../../services/providers/editorState";
import { useSelector } from "react-redux";
import { loaderStateSelector } from "../../services/sotre/features/documents";
import drawerStateContext from "../../services/providers/drawerStateHandlers";
export default function Renamer({ onInputHandler, state }) {
  const { name, setName } = useContext(editorStateContext);
  const { setDrawerState } = useContext(drawerStateContext);
  function handlerInput(e) {
    setName(e.target.value);
    setDrawerState("closed");
  }
  return (
    <div className="flex items-center gap-[16px] font-design">
      <span className="shrink-0">
        <img src={document} />
      </span>
      <form className="relative max-w-[100px] md:max-w-[200px]">
        <label htmlFor="renamer" className="hidden text-light-200 md:block">
          <Typo variant={"B(s)"} text={"Document Name"} />
        </label>
        <input
          type="text"
          id="renamer"
          value={name}
          onKeyDown={(e) => {
            if (e.code.toLocaleLowerCase() === "enter") e.preventDefault();
          }}
          onInput={handlerInput}
          className="peer absolute bottom-0 block w-full bg-transparent text-[15px] font-normal leading-normal text-white opacity-0 outline-none focus:opacity-100"
        />
        <span className="block min-h-[18px] overflow-hidden text-ellipsis text-[15px] font-normal leading-normal text-white opacity-100 peer-focus:opacity-0">
          {name}
        </span>
        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all peer-focus:w-full"></div>
      </form>
    </div>
  );
}
