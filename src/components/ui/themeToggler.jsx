import { useEffect, useRef, useState } from "react";
import LightSvg from "../../assets/ligntSvg";
import DarkSvg from "../../assets/darkSvg";
import useMediaQuery from "../../services/hooks/useThemeQuery";

export default function ThemeToggler({ className = "" }) {
  const { toggleDark, toggleLight, api } = useMediaQuery(
    "(prefers-color-scheme:dark)",
  );
  const toggler = useRef(null);
  let [isChecked, setIsChecked] = useState(api);
  useEffect(() => {
    setIsChecked(api);
  }, [api]);
  useEffect(() => {
    if (!isChecked) {
      toggleLight();
    } else {
      toggleDark();
    }
  }, [isChecked, toggleDark, toggleLight]);
  return (
    <div
      className={"flex flex-row-reverse items-center gap-[12px] " + className}
    >
      <span
        className={`text-white dark:text-light-100`}
        onClick={() => setIsChecked(false)}
      >
        <LightSvg />
      </span>
      <label htmlFor="target" className="relative">
        <input
          ref={toggler}
          checked={isChecked}
          id="target"
          type="checkbox"
          onChange={() => setIsChecked((prev) => !prev)}
          className="pointer-events-none absolute h-[0px] w-[0px] opacity-0"
        />
        <div className="flex h-[24px] w-[48px] items-center rounded-[14px] bg-light-100 px-[6px]">
          <div className="flex h-[12px] w-full justify-end dark:justify-start">
            <div className="aspect-square h-full rounded-full bg-white"></div>
          </div>
        </div>
      </label>
      <span
        className={`text-light-100 dark:text-white`}
        onClick={() => setIsChecked(true)}
      >
        <DarkSvg />
      </span>
    </div>
  );
}
