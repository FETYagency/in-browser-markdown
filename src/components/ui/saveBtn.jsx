import Typo from "./typography";
import save from "../../assets/icon-save.svg";
import { useDispatch } from "react-redux";
import { updateDocument } from "../../services/sotre/features/documents";
import { useContext, useState } from "react";
import { editorStateContext } from "../../services/providers/editorState";
import useScreenQuery from "../../services/hooks/useScreenQuery";

export default function SaveBtn() {
  let { api } = useScreenQuery("(width<768px)");
  const {
    isEdited: isDisabled,
    docId,
    name,
    markdown,
  } = useContext(editorStateContext);
  const dispatch = useDispatch();
  let [loader, setLoader] = useState("idle");
  async function handleClick() {
    try {
      setLoader("pending");
      const unwarpper = await dispatch(
        updateDocument({ docId, name, content: markdown }),
      ).unwrap();
      setLoader("success");
    } catch (e) {
      setLoader("Failed");
    } finally {
      setTimeout(() => {
        setLoader("idle");
      }, 2000);
    }
  }
  return (
    <button
      disabled={!isDisabled}
      className="flex aspect-square w-[40px] items-center justify-center gap-[8px] rounded-[4px] bg-orangeHot font-design text-white hover:bg-orangeDim disabled:cursor-not-allowed disabled:bg-light-200 md:aspect-auto md:w-auto md:px-[16px] md:py-[10px]"
      onClick={handleClick}
    >
      <span>{api && loader === "pending" ? "..." : <img src={save} />}</span>
      <Typo
        variant={"H(m)"}
        text={loader === "pending" ? "Saving Changes..." : "Save Changes"}
        className="hidden md:block"
      />
    </button>
  );
}
