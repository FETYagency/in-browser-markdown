import Header from "../components/header";
import Typo from "../components/ui/typography";
import showPreview from "../assets/icon-show-preview.svg";
import hidePreview from "../assets/icon-hide-preview.svg";
import { useContext, useEffect, useRef, useState } from "react";
import useScreenQuery from "../services/hooks/useScreenQuery";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { editorStateContext } from "../services/providers/editorState";
import {
  loaderStateSelector,
  selectDocumentById,
} from "../services/sotre/features/documents";
import drawerStateContext from "../services/providers/drawerStateHandlers";

export default function Editor() {
  const { setDrawerState, drawerState } = useContext(drawerStateContext);
  let { docId } = useParams();
  let selector = useSelector((state) => selectDocumentById(state, docId));
  let loaderState = useSelector((state) => loaderStateSelector(state));
  let [markdown, setMarkdown] = useState("");
  let [name, setName] = useState("");
  let [preveiwState, setPreviewState] = useState("closed");
  let { api } = useScreenQuery("(width<768px)");
  let content;
  if (api && preveiwState === "opened") {
    content = (
      <div className="flex h-full flex-col items-stretch overflow-hidden">
        <div className="flex items-center justify-between bg-light-500 pl-[16px] text-light-200 dark:bg-dark-200 dark:text-light-300">
          <Typo variant={"H(s)"} text={"PREVIEW"} />
          <button
            onClick={() => {
              setPreviewState("closed");
            }}
            className="grid aspect-square w-[40px] place-items-center rounded-[4px]"
          >
            <img src={hidePreview} />
          </button>
        </div>
        <div className="preview grow overflow-y-scroll px-[20px] py-[16px]">
          <Markdown>{markdown}</Markdown>
        </div>
      </div>
    );
  } else if (api && preveiwState === "closed") {
    content = (
      <div className="flex h-full flex-col items-stretch">
        <div className="flex items-center justify-between bg-light-500 pl-[16px] text-light-200 dark:bg-dark-200 dark:text-light-300">
          <Typo variant={"H(s)"} text={"MARKDOWN"} />
          <button
            onClick={() => {
              setPreviewState("opened");
            }}
            className="grid aspect-square w-[40px] place-items-center rounded-[4px]"
          >
            <img src={showPreview} />
          </button>
        </div>
        <div className="grow px-[20px]">
          <textarea
            value={markdown}
            onInput={(e) => setMarkdown(e.target.value)}
            className="h-full w-full resize-none bg-transparent p-[16px] font-designMono text-[14px] font-normal leading-[24px] text-dark-400 outline-none dark:text-light-300"
          ></textarea>
        </div>
      </div>
    );
  }
  if (!api && preveiwState === "opened") {
    content = (
      <div className="flex h-full flex-col items-stretch overflow-hidden">
        <div className="flex items-center justify-between bg-light-500 pl-[16px] text-light-200 dark:bg-dark-200 dark:text-light-300">
          <Typo variant={"H(s)"} text={"PREVIEW"} />
          <button
            onClick={() => {
              setPreviewState("closed");
            }}
            className="grid aspect-square w-[40px] place-items-center rounded-[4px]"
          >
            <img src={hidePreview} />
          </button>
        </div>
        <div className="grow overflow-y-scroll">
          <div className="preview mx-auto max-w-[672px] px-[48px] py-[22px]">
            <Markdown>{markdown}</Markdown>
          </div>
        </div>
      </div>
    );
  } else if (!api && preveiwState === "closed") {
    content = (
      <div className="flex h-full overflow-hidden">
        <div className="flex shrink-0  grow basis-[50%] flex-col items-stretch border-r border-light-100">
          <div className="flex items-center justify-between bg-light-500 pl-[16px] text-light-200 dark:bg-dark-200 dark:text-light-300">
            <Typo variant={"H(s)"} text={"MARKDOWN"} />
            <div className="aspect-square w-[40px]"></div>
          </div>
          <div className="grow">
            <textarea
              value={markdown}
              onInput={(e) => setMarkdown(e.target.value)}
              className="h-full w-full resize-none bg-transparent p-[16px] font-designMono text-[14px] font-normal leading-[24px] text-dark-400 outline-none dark:text-light-300"
            ></textarea>
          </div>
        </div>

        <div className="flex h-full shrink-0 grow basis-[50%] flex-col items-stretch overflow-hidden">
          <div className="flex items-center justify-between bg-light-500 pl-[16px] text-light-200 dark:bg-dark-200 dark:text-light-300">
            <Typo variant={"H(s)"} text={"PREVIEW"} />
            <button
              onClick={() => {
                setPreviewState("opened");
              }}
              className="grid aspect-square w-[40px] place-items-center rounded-[4px]"
            >
              <img src={showPreview} />
            </button>
          </div>
          <div className="grow overflow-y-scroll">
            <div className="preview max-w-[100%] px-[24px] py-[22px]">
              <Markdown>{markdown}</Markdown>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const isEdited =
    String(selector?.content).trim() !== markdown.trim() ||
    String(selector?.name).trim() !== name.trim();
  useEffect(() => {
    if (isEdited && drawerState === "opened") {
      setDrawerState("closed");
    }
  }, [isEdited]);
  useEffect(() => {
    if (loaderState === "success") {
      setMarkdown(selector.content);
      setName(selector.name);
    }
  }, [loaderState, selector]);
  return (
    <section className="flex max-h-screen min-w-[375px] flex-col items-stretch overflow-hidden md:w-screen">
      <editorStateContext.Provider
        value={{ isEdited, docId, name, setName, markdown }}
      >
        <Header />
      </editorStateContext.Provider>
      <section className="grow overflow-hidden bg-white dark:bg-dark-100">
        {api && content}
        {!api && content}
      </section>
    </section>
  );
}
