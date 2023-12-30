import { useDispatch } from "react-redux";
import { deleteDocument } from "../services/sotre/features/documents";
import { useContext, useState } from "react";
import { editorStateContext } from "../services/providers/editorState";
import { useNavigate } from "react-router-dom";

export default function Confirm({ docName }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [loader, setLoader] = useState("idle");
  const { docId } = useContext(editorStateContext);
  async function handleClick() {
    try {
      setLoader("pending");
      await dispatch(deleteDocument({ docId })).unwrap();
      setLoader("idle");
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="fixed inset-0 grid place-items-center bg-dark-100/50 dark:bg-white/50">
      <article className="grid w-full max-w-[343px] gap-[16px] rounded-[4px] bg-white p-[24px] dark:bg-dark-200">
        <h1 className="text-[20px] font-bold leading-normal text-dark-400 dark:text-white">
          Delete this document?
        </h1>
        <p className="text-[14px] leading-[24px] text-light-200 dark:text-light-300">
          Are you sure you want to delete the '{docName}' document and its
          contents? This action cannot be reversed.
        </p>
        <button
          type="button"
          onClick={handleClick}
          className="rounded-[4px] bg-orangeHot py-[11px] font-design text-[15px] font-normal leading-normal text-white"
        >
          {loader === "pending" ? `deleting document...` : "Confirm & Delete"}
        </button>
      </article>
    </div>
  );
}
