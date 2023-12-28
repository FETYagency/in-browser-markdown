import { useDispatch } from "react-redux";
import deleteSvg from "../../assets/icon-delete.svg";
import { deleteDocument } from "../../services/sotre/features/documents";
import { useContext } from "react";
import { editorStateContext } from "../../services/providers/editorState";
import { useSubmit } from "react-router-dom";
export default function DeleteBtn() {
  const dispatch = useDispatch();
  const submit = useSubmit();
  const { docId } = useContext(editorStateContext);
  async function handleClick(e) {
    try {
      const unwrapper = await dispatch(deleteDocument({ docId })).unwrap();
      submit({ id: "" }, { method: "POST" });
    } catch (error) {}
  }
  return (
    <button
      onClick={handleClick}
      className="grid aspect-square w-[40px] place-items-center rounded-[4px]"
    >
      <img src={deleteSvg} />
    </button>
  );
}
