import { useContext } from "react";
import deleteSvg from "../../assets/icon-delete.svg";
import { editorStateContext } from "../../services/providers/editorState";
export default function DeleteBtn() {
  const { setConfirm } = useContext(editorStateContext);
  return (
    <button
      className="grid aspect-square w-[40px] place-items-center rounded-[4px]"
      onClick={() => setConfirm((prev) => !prev)}
    >
      <img src={deleteSvg} />
    </button>
  );
}
