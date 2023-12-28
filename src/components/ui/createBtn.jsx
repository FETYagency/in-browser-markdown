import { useSubmit } from "react-router-dom";
import Typo from "./typography";
import { useContext, useRef, useState } from "react";
import { createDocument } from "../../services/sotre/features/documents";
import { useDispatch } from "react-redux";
import drawerStateContext from "../../services/providers/drawerStateHandlers";

export default function CreateBtn() {
  const { setDrawerState } = useContext(drawerStateContext);
  let [loader, setLoader] = useState("idle");
  const dispatch = useDispatch();
  const submit = useSubmit();
  async function handleClick() {
    try {
      setLoader("pending");
      const unwarpper = await dispatch(createDocument()).unwrap();
      setLoader("success");
      submit({ id: unwarpper.id }, { method: "POST" });
    } catch (e) {
      setLoader("Failed");
    } finally {
      setTimeout(() => {
        setLoader("idle");
      }, 2000);
      setDrawerState("closed");
    }
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      className=" rounded-[4px] bg-orangeHot px-[44px] py-[10px] font-design text-white hover:bg-orangeDim"
    >
      <Typo
        variant={"H(m)"}
        text={loader === "pending" ? "Creating..." : "+ New Document"}
        className="w-max"
      />
    </button>
  );
}
